import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from '../pages/FirstPage';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const FrontEndRoute:React.FC = () => {
  return (<Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
  )
}

export default FrontEndRoute