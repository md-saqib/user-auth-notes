import React from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import Notes from './Notes'

const NavBar = (props) => {
    const {userLoggedIn, handleAuth} = props
    return (
        <>
        <nav className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-dark bg-dark" id="navbar-main">
            <div className="container px-lg-0">
                <div className="navbar-brand mr-lg-5" href="index.html">
                    <h3 className="text-white">User Auth</h3>
                </div>
                <button className="navbar-toggler pr-0" type="button" data-toggle="collapse" data-target="#navbar-main-collapse" aria-controls="navbar-main-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-main-collapse">          
                <ul className="navbar-nav align-items-lg-center ml-lg-auto">       
                    <li className="nav-item d-lg-none d-xl-block">
                    <div className="nav-link"><Link className="text-white" to="/">Home</Link></div>
                    </li>

                    {userLoggedIn ? (
                        <li className="nav-item d-lg-none d-xl-block">
                            <div className="nav-link"><Link className="text-white" to="/my-notes">My Notes</Link></div>
                        </li>
                    ): (
                        <>
                        </>
                    )
                    }


                    {userLoggedIn ? (
                        <>  
                            <li className="nav-item d-lg-none d-xl-block">
                                <div className="nav-link"><Link className="text-white" to="/account">Account</Link></div>
                            </li>
                            <li className="nav-item d-lg-none d-xl-block">
                                <div className="nav-link" >
                                    <Link className="text-white" onClick={() => {
                                    localStorage.removeItem('token')
                                    alert('Successfully Logged out')
                                    handleAuth()
                                    props.history.push('/')
                                }}>Logout</Link>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>  
                            <li className="nav-item d-lg-none d-xl-block">
                                <div className="nav-link"><Link className="text-white" to="/register">Register</Link></div>
                            </li>
                            <li className="nav-item d-lg-none d-xl-block">
                                <div className="nav-link"><Link className="text-white" to="/login">Login</Link></div>
                            </li>
                        </>
                    )}      
                </ul>
                </div>
            </div>
        </nav>


        <Route path="/" component={Home} exact={true} />
        <Route path="/register" component={Register} />
        <Route path="/login" render={(props) => {
            return <Login 
                        {...props}
                        handleAuth={handleAuth}
                    />
        }} />
        <Route path="/account" component={Account} exact={true} />
        <Route path="/my-notes" component={Notes} exact={true} />
        </>
    )
}

export default withRouter(NavBar)