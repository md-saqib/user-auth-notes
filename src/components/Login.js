import React, {useState} from 'react'
import axios from 'axios'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: email,
            password: password
        }
        
        axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')) { // Object.keys(result).includes('errors')
                    alert(result.errors)
                } else {
                    alert('successfully logged in')
                    localStorage.setItem('token', result.token)
                    props.history.push('/')
                    props.handleAuth()
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const handleChange = (e) => {
        if(e.target.name === 'email') {
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
                        <h6 className="h3">Login</h6>
                        <p className="text-muted mb-0">Sign in to your account to continue.</p>
                        </div>
                        <span className="clearfix"></span>
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-control-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange} name="email" placeholder="name@example.com" required />
                        </div>
                        <div className="form-group mb-4">
                            <label className="form-control-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleChange} name="password" placeholder="Password" />
                        </div>
                        <div className="mt-4">
                            <input type="submit" value="Sign in" className="btn btn-block btn-primary" />
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login