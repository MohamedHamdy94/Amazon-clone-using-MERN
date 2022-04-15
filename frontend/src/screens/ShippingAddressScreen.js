import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../store';

export default function ShippingAddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {userInfo,cart: { shippingAddress } } = state
    const [fullname, setFullname] = useState(shippingAddress.fullname || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setcity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullname, address, city, postalCode, country
            }
        });
        localStorage.setItem('shippingAddress', JSON.stringify(
            { fullname, address, city, postalCode, country })
        );
        navigate('/payment');
    }
    useEffect(()=>{
        if(!userInfo){
navigate('/signin?redirect=/shipping')
        }
    }
    ,[userInfo,navigate]);
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='container small-container'>
                <h1 className='my-3'> </h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId='fullname'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e) => setcity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='city'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='city'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <div className='mb-3'>
                        <Button variant='primary' type='submit'> Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

