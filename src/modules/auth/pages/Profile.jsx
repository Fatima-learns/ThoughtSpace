import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import useApi from '../../../shared/useApi'

const Profile = () => {

  const authContext = useAuthContext()
  const api = useApi()

  async function fetchProfile() {

    const response = await api.get("/auth/me")
    authContext.setUser(response.data.data.user)

  }

    useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      <main>
        <h1> Profile </h1>
        <p> Name: {authContext.user}</p>
        <p> Email: {authContext.email}</p>
      </main>
    </div>
  )
}

export default Profile