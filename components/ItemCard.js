/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { deleteOrderItem } from '../controllers/itemApi';
import { getSingleOrder } from '../controllers/orderApi';

function ItemCard({ itemObj, orderId, onUpdate }) {
  const [order, setOrder] = useState({});

  const checkClosedOrder = () => {
    getSingleOrder(orderId).then(setOrder);
  };

  const deleteThisItem = () => {
    if (window.confirm(`Delete ${itemObj.name}?`)) {
      deleteOrderItem(orderId, itemObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    checkClosedOrder();
  }, [order]);
  return (

    <div key={itemObj.id}>

      <Card className="itemCard orderItem" style={{ width: '16rem', margin: '25px' }}>
        <Card.Img style={{ width: '14rem', margin: '10px' }} variant="top" src={itemObj.image} alt={itemObj.name} />
        <h4 className="card-text bold">{itemObj.name}</h4>
        <h5 className="card-text bold">${itemObj.orderPrice}</h5>
        {order.status === true && (
        <div>
          <Button variant="outline-warning" size="sm" onClick={deleteThisItem} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
        )}

      </Card>
    </div>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    orderPrice: PropTypes.number,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
