import React, { useEffect, useReducer, useState } from "react";
// import { Link } from "react-router-dom";
// import data from '../data';
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ControlledCarousel from "../components/ControlledCarousel";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    // const fetchData = async () => {
    // axios.get("/api/products").then((res) => {
    //   dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    // }).catch((err=>{console.log(err)}));
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();

    // results();
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <ControlledCarousel />
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="container-fluid">
        <Row>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            products.map((product) => {
              return (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product products={product}></Product>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;
