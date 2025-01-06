import React, { useState } from 'react'
import "../../index.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SparkPoint from '../../img/SparkPoint.svg'

import logo from "../../img/logo.svg"

const Header =()=> {
  var [openMenu,setOpenMenu] = useState(false);
  const handleOpenMenu=()=>
  {
    setOpenMenu(!openMenu);
  }


  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const routeChange = (path:string) =>{ 
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
    navigate(path);
  }


  return (
    <div className="w-full  py-5   " >
      <div className=' flex justify-center '>
            <div>
              <img className='h-8' src={SparkPoint} />
            </div>
      </div>
    </div>
  )
}


export default Header
