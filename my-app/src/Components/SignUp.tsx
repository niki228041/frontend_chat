import { useDispatch } from "react-redux";
import "../index.css"
import { useNavigate } from "react-router-dom";
import { postRegistration } from "../slices/userSlice";
import { IRegistration } from "./userTypes";


const SignUp =()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister=(data:React.FormEvent<HTMLFormElement>)=>{
      data.preventDefault();
      var curentData = new FormData(data.currentTarget);
      
      var email = curentData?.get("email")?.toString()!;
      var password = curentData?.get("password")?.toString()!;
      var username = curentData?.get("username")?.toString()!;
  
      var regRequest:IRegistration = {email:email,password:password,username:username};
      console.log(regRequest);
      dispatch(postRegistration(regRequest));
      //navigate("/");
    }


    return (
        
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3" >
            <div className=' mx-10 xl:mx-40 rounded-l'>
                <div className="  flex justify-center ">
                    <div className=" px-10">
                        <form onSubmit={handleRegister}>
                        <div className=" text-white">SignUp</div>
                        <div className="mt-3">
                            
                            <input  id='username' name='username' className="py-3 rounded-sm bg-black text-sm px-5 text-white outline-0" placeholder="Email" />
                        </div>
    
                        <div className="mt-3">
                            <input  id='password' name='password' className="py-3 rounded-sm bg-black text-sm px-5 text-white outline-0" placeholder="Password" />
                        </div>
    
                        <button className="mt-3 flex justify-center bg-gray-600 p-2 rounded-sm text-sm hover:bg-gray-500 w-full active:bg-gray-800 active:p-3 transition-all">
                            <span className="text-white">Ready</span>
                        </button>
                        <div className="flex justify-center mt-3">
                            <button className="text-white text-sm hover:underline" onClick={()=>{navigate("/login")}}>Log In</button>
                        </div>
                        
                        </form>
                        {/* <div>
                            <button onClick={()=>handleGetUser({username:"aaa",password:"aaa"})} className=" bg-gray-500">GetUser</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
      )
}


export default SignUp
