import { createContext , useContext , useState, useEffect } from "react";
import axios from "axios"

const AuthContext = createContext()

export function AuthProvider({ children }){

  const [ user, setUser ] = useState(null)
  const [ accessToken, setAccessToken ] = useState(null)


    function logout() {
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={ { user, setUser, accessToken , setAccessToken , logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  return context
  // we are getting these user, setUser , accessToken, setAccessToken whenever we call useAuthContext
}

