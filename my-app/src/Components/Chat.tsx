import { useDispatch } from "react-redux";
import "../index.css"
import { useNavigate } from "react-router-dom";
import { get_user, login, postRegistration } from "../slices/userSlice";
import { ILogin, IRegistration } from "./userTypes";
import send from '../img/send.png'
import { useState } from "react";

const Chat =()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isListOpen,setIsListOpen] = useState(false);
      

  return (
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3" >
        
        <div className=''>
            <div className="flex justify-center ">
                <div className=" ">
                    <form >

                    <div className="mt-3">
                        <span className=" text-white italic hover:underline cursor-pointer overflow-hidden " onClick={()=>setIsListOpen(!isListOpen)}>Choose user to chat with</span>
                        <div className={`text-white text-sm transition-all ease-in-out duration-200  ${isListOpen ? "max-h-0 scale-y-0" : "max-h-96 scale-y-100"}`}>
                            <div>
                                <div className="hover:underline cursor-pointer" onClick={()=>{}}>* dav@gmail.com</div>
                                <div className="hover:underline cursor-pointer" onClick={()=>{}}>* dav@gmail.com</div>
                                <div className="hover:underline cursor-pointer" onClick={()=>{}}>* dav@gmail.com</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex   ">
                        <input  id='password'  name='password' className="p-2 py-3 rounded-sm bg-black text-sm px-6 text-white outline-0" placeholder="Type" />
                        <button className=" flex justify-center bg-gray-600 p-3  rounded-sm text-sm hover:bg-gray-500 w-full active:bg-gray-800 active:p-3 transition-all">
                            <img className="h-5" src={send}></img>
                        </button>
                    </div>

                    
                    <div className="flex justify-center mt-3">
                        <button className="text-white text-sm hover:underline" onClick={()=>{navigate("/signUp")}}>
                        </button>
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


export default Chat
