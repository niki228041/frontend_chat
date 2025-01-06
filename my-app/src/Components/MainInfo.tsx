import React, { useState } from 'react'
import "../index.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import inst from '../img/icons8-instagram.svg'
import linked from '../img/icons8-linkedin.svg'
import git from '../img/icons8-github.svg'

const MainInfo =()=> {

    function openInNewTab(url:string) {
        window.open(url, "_blank");
    }

  return (
    <div className="w-full flex-row place-content-between 2xl:px-96 pt-16" >
        <div className=' mx-10 xl:mx-40 grid 2xl:grid-cols-2 rounded-l'>
            Asdasd
        </div>
    </div>
  )
}


export default MainInfo
