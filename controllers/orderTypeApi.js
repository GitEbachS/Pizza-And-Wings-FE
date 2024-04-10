import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;


const getOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orderTypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { getOrderTypes }
