import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import { getCookie } from '../../../utils/cookies';

Moment.locale('fi');

const currentDate = new Date();

const MemberPayView = ({ handlePayment, createBanks, banks }) => (
    <div className="container">
        <h3>Jäsenmaksun maksaminen</h3>
        <p>
            Valitse haluamasi jäsenyyden pituus painamalla nappia. Napin
            painamisen jälkeen mahdolliset maksunvälittäjät tulevat näkyviin.
            Painamalla halutun maksunvälittäjän logoa sinut ohjataan
            maksunvälittäjän sivustolle suorittamaan maksusi.
        </p>
        <h4>Hinnasto</h4>
        <ul>
            <li>1 vuosi: 5 €</li>
            <li>5 vuotta: 20 €</li>
        </ul>
        <Button variant="success" value="1" onClick={handlePayment}>
            1 vuosi
        </Button>
        <Button variant="success" value="5" onClick={handlePayment}>
            5 vuotta
        </Button>
        {banks !== null && createBanks(banks)}
    </div>
);

export default MemberPayView;
