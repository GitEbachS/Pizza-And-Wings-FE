import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
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
    <div>
      <h1>Revenue for Total Order Sales</h1>
      <h3>{rev.totalItemTotal}</h3>

      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>

    </div>

  );
}

export default ViewRevenue;
