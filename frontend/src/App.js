import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from 'react-router-bootstrap'
import ProductScreen from './screens/ProductScreen';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';


import PlaceOrder from './screens/PlaceOrder';
import OrderScreen from './screens/OrderScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')


  }

  return (
    <BrowserRouter >
      <div className="d-flex flex-column sit-container">
        <header className="App-header">
          <ToastContainer position='top-center' limit={1}/>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer
                className="App-link"
                to="/">
                <Navbar.Brand>amazon</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </ Badge>)}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer className="nav_link" to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link className='dropdown-item' onClick={signoutHandler} to='#signout'>Sign Out</Link>
                  </NavDropdown>) : (
                  <Link className='nav-link' to='/signin'>Sign In</Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/api/products/slug/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />

              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen/>} />
              <Route path="/placeorder" element={<PlaceOrder/>} />


            </Routes>
          </Container>
        </main>
      </div>
      <footer>
        <div className='text-center'>All right reserved</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
