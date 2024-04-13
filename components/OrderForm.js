import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createOrder, updateMainOrder } from '../controllers/orderApi';
import getOrderTypes from '../controllers/orderTypeApi';

const inititalState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  orderTypeId: -1,
};

function OrderForm({ orderObj }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState({ ...inititalState });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (orderObj.id) setFormInput(orderObj);
    getOrderTypes().then(setTypes);
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert orderTypeId to a number if it's not empty
    const parsedValue = name === 'orderTypeId' ? Number(value) : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateMainOrder(orderObj.id, formInput).then(() => router.push(`/order/${orderObj.id}`));
    } else {
      createOrder(formInput)?.then((order) => router.push(`/order/${order.id}`));
    }
  };

  return (
    <div className="orderform-container">
      <Form onSubmit={handleSubmit} className="orderForm">
        <h2 className="text-white mt-5">{orderObj.id ? 'Update' : 'Create'} Order</h2>
        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formInput.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formInput.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {types ? (
          <Form.Group>
            <Form.Select
              aria-label="Type"
              name="orderTypeId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.orderTypeId}
              required
            >
              <option value="">Select Order Type</option>
              {types.map((type) => (

                <option key={type.id} value={type.id}>{type.type}</option>

              ))}

            </Form.Select>
          </Form.Group>
        ) : null}

        <Form.Group className="mb-3">

          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Button id="createformbtn" className="addPostBtn m-2" variant="outline-secondary" type="submit">
          {orderObj.id ? 'Update' : 'Add Order'}
        </Button>
      </Form>
    </div>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    orderTypeId: PropTypes.number,
  }),
};
OrderForm.defaultProps = {
  orderObj: inititalState,
};
export default OrderForm;
