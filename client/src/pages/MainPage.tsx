import React, { createContext, useState } from 'react'
import Header from '../components/Header/Header';

type MainPageType = {
  openDropdown: boolean,
  setOpenDropDown?: any
}

const defaultMainPageContextValue: MainPageType = {
  openDropdown: false,
  setOpenDropDown: () => {}
}

export const MainPageContext = createContext<MainPageType>(defaultMainPageContextValue);

const MainPage:React.FC = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!isOffcanvasOpen);
    setOpenDropDown(false)
  };

  const mainPageContextValue: MainPageType = {
    openDropdown,
    setOpenDropDown
  };

  return (
    <MainPageContext.Provider value={mainPageContextValue}>
      <Header toggleOffcanvas={toggleOffcanvas} />
    </MainPageContext.Provider>
  )
}

export default MainPage
