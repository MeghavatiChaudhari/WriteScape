// import React from 'react'
// import { useEffect, useState } from 'react'
// import {useDispatch} from 'react-redux'
// import './App.css'
// import authService from './appwrite/auth'
// import { login,logout } from './store/authSlice'
// import {Footer,Header} from './components'
// import { Outlet } from 'react-router-dom'

// function App() {
//    const [loading,setLoading]=useState(true);
//    const dispatch=useDispatch()
  
 

//    useEffect(()=>{
//       authService.getCurrentUser()
//       .then((userData)=>{
//         if(userData){
//           dispatch(login({userData}))
//         }else{
//           dispatch(logout())
//         }
//       })
//       .finally(()=>setLoading(false))
//    },[])

//    return !loading ? (
//     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//       <div className='w-full block'>
//         <Header/>
       
//         <main>
//         TODO:  <Outlet />
//         </main>
//         <Footer/>
//       </div>
//     </div>
//    ) : null
  
//   // return (
//   //   <>
//   //     <h1>hey</h1>
//   //   </>
//   // )
// }

// export default App

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();

   useEffect(() => {
      authService.getCurrentUser()
         .then((userData) => {
            if (userData) {
               dispatch(login({ userData }));
            } else {
               dispatch(logout());
            }
         })
         .finally(() => setLoading(false));
   }, []);

   return !loading ? (
      <div className='max-h flex flex-wrap content-between bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'>
         <div className='w-full block'>
            <Header />
            <main>
               <Outlet />
            </main>
            <Footer />
         </div>
      </div>
   ) : null;
}

export default App;

