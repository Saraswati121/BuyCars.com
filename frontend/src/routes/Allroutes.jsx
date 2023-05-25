import React from 'react'
import { Routes, Route } from "react-router-dom"
import {Signup} from '../components/Signup'
import {Login} from '../components/Login'
import { Home } from '../components/Home'

export const Allroutes = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  )
}
