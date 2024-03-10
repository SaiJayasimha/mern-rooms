// Loginscreen.js
import React, { useState } from 'react';
import axios from "axios";
import Error from '../components/Error';
import Loader from '../components/Loader';

function Loginscreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Changed to null

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error on each login attempt

        try {
            const response = await axios.post('/api/users/login', {
                email,
                password
            });

            localStorage.setItem('currentUser', JSON.stringify(response.data));
            window.location.href = '/home';
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid credentials'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleLogin}>
                            <div className="divider d-flex align-items-center my-4">
                                <center><p className="text-center fw-bold mx-3 mb-0"><b>SignIn</b></p></center>
                            </div>
                            {error && <Error message={error} />} {/* Display error message */}
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={loading}>
                                    {loading ? <Loader /> : 'Login'}
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="register/" className="link-danger">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Loginscreen;
