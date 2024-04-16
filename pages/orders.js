import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getAllOrders } from '../controllers/orderApi';
import OrderCard from '../components/OrderCard';

function Home() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const getTheOrders = () => {
    getAllOrders()?.then(setOrders);
  };

  useEffect(() => {
    getTheOrders();
  }, [user]);

  return (
    <div>
      <h1>Hello Staff Member: {user.fbUser.displayName}! </h1>
      <div className="card-container">
        {orders.map((order) => (
          <OrderCard key={order.id} orderObj={order} onUpdate={getTheOrders} />
        ))}

      </div>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
