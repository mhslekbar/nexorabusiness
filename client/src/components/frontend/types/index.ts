import { createContext } from "react"

export interface ShowFrontEndInterface {
  HomePageRef: any,
  showImage: boolean, setShowImage: (showImage: boolean) => void,
}

export const DefaultShowFrontEndInterface: ShowFrontEndInterface = {
  HomePageRef: null,
  showImage: false, setShowImage: () => {},
}

export const ShowFrontEndContext = createContext<ShowFrontEndInterface | any>(DefaultShowFrontEndInterface)
