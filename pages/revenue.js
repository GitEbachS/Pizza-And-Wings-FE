import { useEffect, useState } from 'react';
import { getRevenue } from '../controllers/orderApi';

function ViewRevenue() {
  const [rev, setRev] = useState({});

  const getTheRev = () => {
    getRevenue().then(setRev);
  };

  useEffect(() => {
    getTheRev();
  }, []);

  return (
    <div className="rev-container">
      <div>
        <h1>Revenue for Total Order Sales</h1>
      </div>

      <div className="revBox">
        <h3>{rev.totalItemTotal}</h3>
      </div>

    </div>

  );
}

export default ViewRevenue;
