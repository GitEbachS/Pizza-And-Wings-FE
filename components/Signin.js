import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '10px',
        margin: '50px auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1>Hi there!</h1>
      <div className="logoWrap">
        <div>
          <Image
            src="https://images.freeimages.com/image/previews/f72/delicious-pizza-flat-design-5692710.png"
            alt="Delicious Pizza Logo"
            width={300}
            height={300}
          />
        </div>
        <div>
          <h1 className="logoName">PIZZ<span className="smallLogo">A</span></h1>
          <h1 className="logoName"><span className="smallLogo">A</span>ND</h1>
          <h1 className="logoName">WIN<span className="smallLogo">GS</span></h1>
        </div>
      </div>
      <Button id="signin" type="button" size="sm" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
