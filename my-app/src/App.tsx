import { Route,Router,Routes,BrowserRouter,Outlet, Link} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import MainInfo from './Components/MainInfo';
import logo from './img/logo.svg'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {refreshAccessToken, UserState} from './slices/userSlice'
import { useEffect, useLayoutEffect } from 'react';
import { axiosInstance } from './slices/userSlice';
import './index.css'
import Chat from './Components/Chat';

const App=()=>{
  const dispatch = useDispatch();
  const { accessToken, loading, error, isAuth } = useSelector((state:UserState) => state.user);

  useEffect(() => {
    if (!accessToken) {
      console.log("trying to refresh the token")
      dispatch(refreshAccessToken()); // Відправляємо запит на оновлення токену, якщо він відсутній
    }
  }, [accessToken, dispatch]);



    return(
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/*' element={<>
              
              <div className='flex flex-col bg-kinda_gray' style={{minHeight:"100vh"}}>
                <Header/>
                {loading ? <div className='loader h-10 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3'></div> : <Outlet/>}
                <Footer/>
              </div>
              
            </>}>
            

            <Route path='main' element={<MainInfo/>}>

            </Route>

            <Route path='chat' element={<Chat/>}>

            </Route>

            <Route path="signUp" element={<><SignUp/></>}>
            </Route>

            <Route path="login" element={<><Login/></>}>
            </Route>
            
            <Route path="models" element={<></>}>
            </Route>
            </Route>
            
        
        </Routes>
        
      </BrowserRouter>
    </>
    )
};

export default App;