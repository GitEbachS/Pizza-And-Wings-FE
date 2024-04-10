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
  fetch(`${endpoint}order/addItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
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
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  addItemToOrder, deleteOrderItem, getAllItems,
};
