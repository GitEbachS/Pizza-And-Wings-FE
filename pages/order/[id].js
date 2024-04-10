/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../controllers/orderApi';
import ItemCard from '../../components/ItemCard';
import { getAllItems } from '../../controllers/itemApi';

export default function ViewOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [isClosed, setIsClosed] = useState(false);

  const getOrderDetails = () => {
    getSingleOrder(id)?.then(setOrder);
  };

  const getAllTheItems = () => {
    getAllItems().then((items) => {
      setAllItems(items);
      if (!order.status) {
        setIsClosed(true);
      }
    });
  };

  useEffect(() => {
    getOrderDetails();
    getAllTheItems();
  }, [order]);

  return (
    <>
      <div>
        <h2 className="orderTitle">Order#{order.id}</h2>
        <h4>Customer Name: {order.fullName}</h4>
        <h4>Customer Email: {order.email}</h4>
        <h4>Customer Phone: {order.phone}</h4>
        <h4>Order Type: {order.orderType}</h4>
        <h4>Payment Type: {order.paymentType}</h4>
        <h4>Order Status: {order.status ? 'Open' : 'Closed'}</h4>
        <h4>Order Tip: {order.tip}</h4>
        <h4>Total Before Tip: {order.itemTotal}</h4>
        <h4>Order Total With Tip: {order.totalWithTip}</h4>
        <h4>Date Closed: {order.dateClosed}</h4>
      </div>

      <h3 className="orderTitle">List of Products:</h3>

      <div>
        {order.items?.map((item) => (
          <ItemCard key={item.id} orderObj={order} onUpdate={getOrderDetails} />
        ))}
      </div>
      {isClosed ? '' : (
        allItems.map((item) => (
          <ItemCard key={item.id} orderObj={order} onUpdate={getOrderDetails} />
        ))
      )}
    </>
  );
}
