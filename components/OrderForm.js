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
  orderTypeId: '',
  status: true,
};

function OrderForm({ orderObj }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState({ ...inititalState });
  const [type, setType] = useState({});

  useEffect(() => {
    if (orderObj.id) setFormInput(orderObj);
    getOrderTypes().then(setType);
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateMainOrder(formInput).then(() => router.push(`/order/${orderObj.id}`));
    } else {
      const payload = formInput;
      createOrder(payload).then(() => router.push(`/order/${orderObj.id}`));
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
        {type ? (
          <Form.Group>
            <Form.Select
              aria-label="Type"
              name="type"
              onChange={handleChange}
              className="mb-3"
              value={formInput.type}
              required
            >
              <option value="">Select Order Type</option>
              <option>Walk-In</option>
              <option>Phone</option>
            </Form.Select>
          </Form.Group>
        ) : ''}

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
    dateClosed: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    orderTypeId: PropTypes.number,
    status: PropTypes.bool,
  }),
};
OrderForm.defaultProps = {
  orderObj: inititalState,
};
export default OrderForm;
