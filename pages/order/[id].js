/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleOrder } from '../../controllers/orderApi';
import ItemCard from '../../components/ItemCard';
import { getAllItems } from '../../controllers/itemApi';
import AllItemsCard from '../../components/AllItemsCard';

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
      if (order.status === false) {
        setIsClosed(true);
      }
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  useEffect(() => {
    if (order.status === false) {
      getAllTheItems();
      setIsClosed(true);
    }
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
        <Link href={`/order/close/${order.id}`} passHref>
          <div>
            <Button id="viewbtn" className="viewBtn m-2">Checkout</Button>
          </div>
        </Link>
      </div>

      <h3 className="orderTitle">List of Items:</h3>

      <div>
        {order.items?.map((item) => (
          <ItemCard key={item.id} orderId={order.id} itemObj={item} onUpdate={getOrderDetails} />
        ))}
      </div>
      {isClosed ? '' : (
        allItems.map((item) => (
          <AllItemsCard key={item.id} orderId={order.id} itemObj={item} onUpdate={getOrderDetails} />
        ))
      )}
    </>
  );
}
