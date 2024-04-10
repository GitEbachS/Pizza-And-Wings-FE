/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteOrder } from '../controllers/orderApi';

function OrderCard({ orderObj, onUpdate }) {
  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${orderObj.id}?`)) {
      deleteOrder(orderObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card-style" style={{ width: '38rem' }}>
      <Card.Body>
        <Card.Title className="orderTitle">Order#{orderObj.id}</Card.Title>
        <h4>Customer Name: {orderObj.fullName}</h4>
        <h4>Customer Email: {orderObj.email}</h4>
        <h4>Customer Phone: {orderObj.phone}</h4>
        <h4>Order Type: {orderObj.orderType}</h4>
        <h4>Order Status: {orderObj.status ? 'Open' : 'Closed'}</h4>
        <div className="wrapper">
          <Link href={`/order/${orderObj.id}`} passHref>
            <div>
              <Button id="viewbtn" className="viewBtn m-2">VIEW</Button>
            </div>
          </Link>
          <Button variant="outline-warning" size="sm" onClick={deleteThisOrder} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    dateClosed: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    orderTypeId: PropTypes.number,
    orderType: PropTypes.string,
    status: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
