import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getPaymentTypes from '../controllers/paymentTypeApi';
import { updatePaymentOrder } from '../controllers/orderApi';

const inititalState = {
  tip: 0,
  paymentTypeId: -1,
};

function CloseForm({ orderObj }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState({ ...inititalState });
  const [paymentTypes, setPaymentTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePaymentOrder({ ...formInput, orderId: orderObj.id }).then(() => router.push(`/order/${orderObj.id}`));
  };
  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
  }, [orderObj]);

  return (
    <div className="closeform-container">
      <Form onSubmit={handleSubmit} className="orderForm">
        <h2 className="text-white mt-5">Payment to Submit for Your Order</h2>

        {paymentTypes ? (
          <Form.Group>
            <Form.Select
              aria-label="Payment Type"
              name="paymentTypeId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.paymentTypeId}
              required
            >
              <option value="">Select Payment Type</option>
              {paymentTypes.map((paymentType) => (

                <option key={paymentType.id} value={paymentType.id}>{paymentType.type}</option>

              ))}
            </Form.Select>
          </Form.Group>
        ) : null}

        <Form.Group className="mb-3">
          <Form.Label>Tip Amount:</Form.Label>
          <Form.Control
            type="number"
            name="tip"
            value={formInput.tip}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />
        <Button id="closeformbtn" className="addPostBtn m-2" variant="outline-secondary" type="submit">
          Close Order
        </Button>
      </Form>
    </div>
  );
}

CloseForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    tip: PropTypes.number,
    paymentTypeId: PropTypes.number,
  }).isRequired,
};

export default CloseForm;
