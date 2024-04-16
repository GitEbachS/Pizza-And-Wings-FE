import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

function Home() {
  return (
    <div className="closeform-container">
      <div className="logoWrap">
        <div>
          <Image
            src="https://images.freeimages.com/image/previews/f72/delicious-pizza-flat-design-5692710.png"
            alt="Delicious Pizza Logo"
            width={300} // Set the width of the image
            height={300}
          />
        </div>
        <div>
          <h1 className="logoName">PIZZ<span className="smallLogo">A</span></h1>
          <h1 className="logoName"><span className="smallLogo">A</span>ND</h1>
          <h1 className="logoName">WIN<span className="smallLogo">GS</span></h1>
        </div>
      </div>

      <div className="buttonWrap buttonBox">
        <Link passHref href="/order/new">
          <Button className="indexBtn">Create Order</Button>
        </Link>
        <Link passHref href="/orders">
          <Button className="indexBtn">View Orders</Button>
        </Link>
        <Link passHref href="/revenue">
          <Button className="indexBtn">Revenue</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
