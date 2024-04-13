import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const deleteOrderItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/items/${orderId}/remove/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const addItemToOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/addItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/allItems`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getTheItemsInTheOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orderItems/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  addItemToOrder, deleteOrderItem, getAllItems, getTheItemsInTheOrder,
};
