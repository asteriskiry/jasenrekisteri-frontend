import React from 'react';

import { Button } from 'react-bootstrap';

const PayButtons = ({ handleClick }) => (
    <div className="container">
        <Button variant="success" value="1" onClick={handleClick}>
            1 vuosi
        </Button>
        <Button variant="success" value="5" onClick={handleClick}>
            5 vuotta
        </Button>
    </div>
);

export default PayButtons;
