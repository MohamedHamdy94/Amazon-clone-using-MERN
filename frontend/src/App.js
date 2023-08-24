import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import Badge from "react-bootstrap/esm/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignUpScreen from "./screens/SignupScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import Footer from "./components/Footer";
import { getError } from "./utils";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(cart.cartItems);
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/products/categories");
        console.log(data);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  console.log(categories);

  return (
    <BrowserRouter>
    
          <ToastContainer position="bottom-center" limit={1} />
          <header>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>amazona</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto w-100 justify-content-end">
                    <Link to="/cart" className="nav-link">
                      cart
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id="basic-nav-dropdown"
                      >

                        <Link
                          className="dropdown-item"
                          to="#signout"
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <Link className="nav-link" to="/signin">
                        Sign In
                      </Link>
                    )}

                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/shipping" element={<ShippingAddressScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <OrderScreen />
                    </ProtectedRoute>
                  }
                />
                <Route path={`/`} element={<HomeScreen />} />
              </Routes>
            </Container>
          </main>
          {/* <footer className="text-center">all reight reserved</footer> */}
          <Footer className="mt-5" />
    </BrowserRouter>
  );
}

export default App;
