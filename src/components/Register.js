import React, {useState} from 'react'
import axios from 'axios'

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: username,
            email: email,
            password: password
        }

        // Validation pass

        axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    alert('successfully created an account')
                    props.history.push('/login')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUsername(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    return (

        <div className="container mt-7 d-flex align-items-center">
            <div className="col">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <div className="mb-5 text-center">
                        <h6 className="h3">Register with us</h6>
                        <p className="text-muted mb-0">Create a new acccount to continue.</p>
                        </div>
                        <span className="clearfix"></span>
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-control-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={handleChange} name="username" placeholder="name@example.com" required />
                        </div>
                        <div className="form-group mb-4">
                            <label className="form-control-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange} name="email" placeholder="name@example.com" required />
                        </div>
                        <div className="form-group mb-4">
                            <label className="form-control-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleChange} name="password" placeholder="Password" />
                        </div>
                        <div className="mt-4">
                            <input type="submit" value="Sign up" className="btn btn-block btn-primary" />
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Register