/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchOrders } from '../../controllers/orderApi';
import OrderCard from '../../components/OrderCard';

export default function Search() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllOrders = () => {
    searchOrders(searchInput).then(setFilteredOrders);
  };

  useEffect(() => {
    searchAllOrders();
    return () => {
      setFilteredOrders([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="card-container">
        {filteredOrders.map((order) => <OrderCard key={order.id} orderObj={order} onUpdate={searchAllOrders} />)}
      </div>
    </>
  );
}
