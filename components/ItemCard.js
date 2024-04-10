/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { deleteOrderItem } from '../controllers/itemApi';
import { getSingleOrder } from '../controllers/orderApi';

function ItemCard({ itemObj, orderObj, onUpdate }) {
  const [itemBtn, setItemBtn] = useState('');

  const isItemAdded = () => {
    getSingleOrder(orderObj.id)?.then((order) => {
      order.items.forEach((item) => {
        if (item.id === itemObj.id) {
          setItemBtn('Remove');
        }
        setItemBtn('Add Item');
      });
    });
  };

  const addItemToOrder = () => {
    getSingleOrder(orderObj.id)?.then((order) => {
      const payload = {
        orderId: order.id, itemId: itemObj.id,
      };
      addItemToOrder(payload).then(() => onUpdate());
    });
  };

  const deleteThisItem = () => {
    if (window.confirm(`Delete ${itemObj.id}?`)) {
      deleteOrderItem(orderObj.id, itemObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    isItemAdded();
  }, [itemObj, orderObj]);

  return (

    <div key={itemObj.id}>
      <h4 className="card-text bold">{itemObj.name}</h4>
      <Card className="catCard" style={{ width: '16rem', margin: '25px' }}>
        <h5 className="card-text bold">{itemObj.orderPrice}</h5>
        {/* <Card.Img variant="top" src={ItemObj.image} alt={ItemObj.name} /> */}
        <div>
          <Button variant="outline-success" size="sm" onClick={addItemToOrder} className="deleteBtn m-2">
            {itemBtn}
          </Button>
          <Button variant="outline-warning" size="sm" onClick={deleteThisItem} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card>
    </div>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    orderPrice: PropTypes.number,
    order: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      fullName: PropTypes.string,
      dateClosed: PropTypes.string,
      email: PropTypes.string,
      Phone: PropTypes.string,
      orderTypeId: PropTypes.number,
      orderType: PropTypes.string,
      status: PropTypes.bool,
      itemTotal: PropTypes.number,
      tip: PropTypes.number,
      paymentTypeId: PropTypes.number,
      paymentType: PropTypes.string,
      totalWithTip: PropTypes.number,
    })),
  }).isRequired,
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    dateClosed: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    orderTypeId: PropTypes.number,
    orderType: PropTypes.string,
    status: PropTypes.bool,
    itemTotal: PropTypes.number,
    tip: PropTypes.number,
    paymentTypeId: PropTypes.number,
    paymentType: PropTypes.string,
    totalWithTip: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
