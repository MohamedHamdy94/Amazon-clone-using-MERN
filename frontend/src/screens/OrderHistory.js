import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../store';
import OrderScreen from './OrderScreen';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, order: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    error: '',
    loading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/orders/mine', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>OrderHistory</title>
      </Helmet>
      <h1>OrderHistory</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" error={error}>
          {error}
        </MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((order)=>(
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0,10)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
