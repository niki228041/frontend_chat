//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import { GetAccessToken, SetAccessToken } from "../api/jwtDecodeToken";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const baseURL ='http://127.0.0.1:8000';
axios.defaults.withCredentials = true;


export interface UserState{
    user:any;
    loading:boolean;
    accessToken:string;
    error:string|null;
    isAuth:boolean;
    message:string|null;
    allUsers:any;
}


// :UserState 
const initialState:UserState= {
    user:{},
    accessToken:"",
    loading:false,
    error:"",
    isAuth:false,
    message:"",
    allUsers:[]
};

// axiosInstance інстанс
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});



axiosInstance.interceptors.response.use(
    (response) => response, // Pass successful responses
    async (error) => {
      const originalRequest = error.config;
        
        console.log(error.response?.status)

      if (error.response?.status == 401) {
        originalRequest._retry = true; // Prevent infinite loops
  
        try {
          // Dispatch the refresh token thunk
          const resultAction = await axios.post(baseURL+"/api/token/refresh/");
  
          // Check if the token refresh succeeded
          if (resultAction) {
            console.log(resultAction)
            const newAccessToken = resultAction.data.access; // Adjust if your payload differs
            SetAccessToken(resultAction.data.access)

  
            // Update headers with the new token
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
            // Retry the original request
            return axiosInstance(originalRequest);
          } else {
            // If token refresh failed, reject the promise
            return Promise.reject(resultAction || 'Token refresh failed');
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
  
      // Reject other errors
      return Promise.reject(error);
    }
  );
  




export const login:any = createAsyncThunk('/login/',async(dateFromFrontend, { rejectWithValue })=>{
    try{
        const response = await axiosInstance.post(baseURL + '/login/' ,dateFromFrontend, { withCredentials: true });
        return response.data;
    }catch(err:any){
        return rejectWithValue(err.response?.data?.detail || 'Login failed');
    }
})


export const refreshAccessToken:any = createAsyncThunk('/api/token/refresh/', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${baseURL}/api/token/refresh/`, { withCredentials: true }); // No payload; cookies handle refresh token
        return response.data; // Return new access token
    } catch (err:any) {
        return rejectWithValue(err.response?.data?.detail || 'Failed to refresh token');
    }
});

export const postRegistration:any = createAsyncThunk('/signup/',async(dateFromFrontend:any)=>{
    try{
        const response = await axiosInstance.post(baseURL + '/signup/',dateFromFrontend, { withCredentials: true });
        return response.data;
    }catch(err:any){
        return err.message;
    }
})




export const get_user:any = createAsyncThunk('/get_user/', async (dateFromFrontend: any, { getState, rejectWithValue }) => {
    const state = getState() as { user: UserState }; // Get current state
    // const accessToken = state.user.accessToken;
    const accessToken = GetAccessToken();
    
    // thunkAPI.dispatch(setMessage(response.data.message));
    try {
      const response = await axiosInstance.post(baseURL + '/get_user/', dateFromFrontend, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      });
      return response.data
    } catch (error: any) {
    }
  });



export const AuthUser:any = createAsyncThunk('',(token:string)=>{
    var decodedToken = "";
    if(token != "")
    {
        // decodedToken = parseJwt(token) as any;
    }
    try{
        return decodedToken;
    }catch(err:any){
        return err.message;
    }
});



const userSlice = createSlice(
{
    name:'user',
    initialState,
    reducers:
    {
        // incremented(state)
        // {
        //     //можна міняти стейт без копіювання  (state...)=не потрібно
        //     state.value++;
        // },
        // amountAdded(state,action: PayloadAction<number>){
        //     state.value += action.payload;
        // }
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        
    },
    extraReducers(builder){
        builder
            .addCase(login.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.loading = false;
                state.accessToken = action.payload.access;
                state.user = action.payload.user;

                console.log(action)

                state.isAuth = true;
            })
            .addCase(login.rejected,(state,action)=>{
                state.loading = false;
            })
            .addCase(postRegistration.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(postRegistration.fulfilled,(state,action)=>{
                state.loading = false;
                state.accessToken = action.payload.access;
                state.user = action.payload.user;

                state.isAuth = true;
            })
            .addCase(postRegistration.rejected,(state,action)=>{
                state.loading = false;
            })
            .addCase(refreshAccessToken.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(refreshAccessToken.fulfilled,(state,action)=>{
                state.loading = false;
                
                console.log(action.payload.access);
                SetAccessToken(action.payload.access)
                state.accessToken = action.payload.access;

            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                console.log(action.payload);
                state.loading = false;
            })
            .addCase(AuthUser.fulfilled,(state,action)=>{
                if(action.payload == "")
                {
                    state.isAuth = false;
                }
                else
                {
                    state.isAuth = true;
                }
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(get_user.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(get_user.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isAuth = true;
                state.loading = false;
                console.log("get_user.fulfilled");
            })
            .addCase(get_user.rejected, (state, action) => {
              state.error = action.payload as string;
              console.log("get_user.rejected");

              console.log(action.payload);

              state.accessToken = "";
            })
    }
});






// export const {login,registration} = userSlice.actions;
export default userSlice.reducer;