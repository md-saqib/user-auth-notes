import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Account = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            console.log(result)
            setUser(result) 
        })
        .catch((err) => {
            alert(err.message)
        })
    }, [])

    return (
        <div className="container text-center mt-5">
            <h2>User Account</h2>
            <h4>Email - {user.email}</h4>
            <h4>Username - {user.username}</h4>
        </div>
    )
}

export default Account