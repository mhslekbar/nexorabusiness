import React, { useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import { State } from './redux/store';
import MainPage from './pages/MainPage';
import AdminRoutes from './routes/AdminRoutes';
import FrontEndRoute from './routes/FrontEndRoute';

const App:React.FC = () => {
  const { userData } = useSelector((state: State) => state.login)

  useEffect(() => {
    localStorage.setItem("lang", localStorage.getItem("lang") ?? "fr")
    switch(localStorage.getItem("lang")) {
      case "ar": 
        document.body.dir = "rtl";
        localStorage.setItem("dir", "rtl")
      break;
      case "fr": 
        document.body.dir = "ltr";
        localStorage.setItem("dir", "ltr")  
      break;
      default:
        document.body.dir = "ltr";
        localStorage.setItem("dir", "ltr")  
    }
  }, [])

  if(userData._id) {
    return <Router>
      <MainPage />      
      <div className='w-full min-h-[90vh] mx-auto px-4 py-6'>
        {userData?.user && <AdminRoutes />}
      </div>
    </Router>
  } else {
    return <FrontEndRoute />
  }

}

export default App
