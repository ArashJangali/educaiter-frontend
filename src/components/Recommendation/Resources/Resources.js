import React, {useContext, useEffect} from 'react'
import axios from "../../Api/axiosInstance"
import UserContext from '../../../contexts/UserContext'

export default function Resources() {
    const {user, setUser} = useContext(UserContext)
    const {token, setToken} = useContext(UserContext)
    const userId = user?._id

    useEffect(() => {
         axios.get(`/recommendation/resources/${userId}`, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
          })
          .then(res => {

          })
    })
    

  return (
    <div>Resources</div>
  )
}
