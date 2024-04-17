/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { getSingleOrder } from '../../controllers/orderApi';
import ItemCard from '../../components/ItemCard';
import { getAllItems } from '../../controllers/itemApi';
import AllItemsCard from '../../components/AllItemsCard';

export default function ViewOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});
  const [allItems, setAllItems] = useState([]);

  const getOrderDetails = () => {
    getSingleOrder(id)?.then(setOrder);
  };

  const getAllTheItems = () => {
    getAllItems().then((items) => {
      setAllItems(items);
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, [order]);

  useEffect(() => {
    if (order.status === true) {
      getAllTheItems();
    }
  }, [order]);

  return (
    <>
      <div className="orderBox">
        <div>
          <h2 className="orderTitle">Order#{order.id}</h2>
          <h4>Customer Name: {order.fullName}</h4>
          <h4>Customer Email: {order.email}</h4>
          <h4>Customer Phone: {order.phone}</h4>
          <h4>Order Type: {order.orderType}</h4>
          <h4>Payment Type: {order.paymentType || '0'}</h4>
          <h4>Order Status: {order.status ? 'Open' : 'Closed'}</h4>
          <h4>Order Tip: {order.tip || '0'}</h4>
          <h4>Total Before Tip: {order.itemTotal}</h4>
          <h4>Order Total With Tip: {order.totalWithTip || '0'}</h4>
          <h4>{order.dateClosed ? `Date Closed: ${order.dateClosed}` : ''}</h4>
        </div>
        <div>
          <Image
            className="pizzaImg"
            src="https://as2.ftcdn.net/v2/jpg/02/12/07/03/1000_F_212070387_TuRO0lvnoEvDVEVuachJ1KwigmWDeTEx.jpg"
            alt="Delicious Pizza Logo"
            width={400}
            height={350}
          />
        </div>

        {order.items !== null && (
        <>
          <h3 className="orderTitle menuCenter">Items Added:</h3>
          <div className="d-flex flex-wrap item-container">
            {order.items?.map((item) => (
              <ItemCard key={item.id} orderId={order.id} itemObj={item} onUpdate={getOrderDetails} />
            ))}
          </div>
        </>
        )}

      </div>

      {order.status === true && (
      <>
        <div className="menuBox">
          <h2 className="menuCenter">Menu Items</h2>
          <div className="d-flex flex-wrap item-container">
            {allItems.map((item) => (
              <AllItemsCard key={item.id} orderId={order.id} itemObj={item} onUpdate={getOrderDetails} />
            ))}
          </div>
        </div>
      </>
      )}

      {order.status === true && (
      <div>
        <Link href={`/order/close/${order.id}`} passHref>
          <div className="buttonWrap">
            <Button id="checkoutBtn" className="viewBtn m-2">Checkout</Button>
          </div>
        </Link>
      </div>
      )}

    </>
  );
}
