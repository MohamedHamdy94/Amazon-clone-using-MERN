import React, { useEffect, useReducer } from 'react'
import Product from '../components/Product'
// import data from '../data'
import axios from 'axios'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }

    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }

    
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false }

    default: return state
  }
}
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    error: '',
    loading: true
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const reslut = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: reslut.data.products })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    };
    fetchData()
  }, [])
  return (
    <div>
      <h1>
        <Helmet>
          <title>Amazon</title>
        </Helmet>
        Featured product
      </h1>
      <div className='products'>
        {
          loading ? (<LoadingBox />)
            : error ? (<MessageBox variant='danger' error={error}>{error}</MessageBox>)
              : (
                <Row>
                  {products.map(product => (
                    <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              )}
      </div></div>
  )
}

export default HomeScreen