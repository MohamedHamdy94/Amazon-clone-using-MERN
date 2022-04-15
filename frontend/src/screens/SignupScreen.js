import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Store } from '../store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

function SignupScreen() {
    const { search } = useLocation();
    const navigate = useNavigate();

    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CofirmPassword, setCofirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state
    const submitHandler = async (e) => {
        if(password !==CofirmPassword){
            toast.error("password not match");
            return ;
        }
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,
                isAdmin:false
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || "/")
        } catch (err) {
            toast.error(getError(err))
        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])
    return (
        <Container className='small-container'>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className='"my-3'>Sign Up</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control  required onChange={(e) => setName(e.target.value)} />
                </Form.Group>


                <Form.Group className='mb-3' controlId='emial'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3' controlId='cofirmPassword'>
                    <Form.Label>Cofirm Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setCofirmPassword(e.target.value)} />
                </Form.Group>

            

                <div className='mb-3'>
                    <Button type='submit'>Sign UP</Button>
                </div>

                <div className='mb-3'>
                    Already have an account ?{''}
                    <Link to={`/sigin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </Form>

        </Container>
    )
}

export default SignupScreen ;