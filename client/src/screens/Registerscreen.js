// Registerscreen.js
import React, { useState } from 'react';
import axios from 'axios';
import Success from '../components/Success';
import Error from '../components/Error';
import Loader from '../components/Loader';

function Registerscreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            };
            try {
                setLoading(true);
                const result = await axios.post('/api/users/register', user).data;
                setLoading(false);
                setSuccess(true);

                setName('');
                setEmail('');
                setPassword('');
                setCpassword('');
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(true);
            }
        } else {
            alert('Passwords not matched');
        }
    }

    return (
        <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    {error && <Error message="Registration failed" />}
                                    {success && <Success message="Registration successful" />}
                                    <form>
                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3cg" className="form-control form-control-lg" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cg" className="form-control form-control-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cdg" className="form-control form-control-lg" placeholder="Repeat your password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                                        </div>
                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                            <label className="form-check-label" htmlFor="form2Example3g">
                                                I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={register} disabled={loading}>
                                                {loading ? <Loader /> : 'Register'}
                                            </button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Registerscreen;
