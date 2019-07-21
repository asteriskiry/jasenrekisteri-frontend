import React from 'react';

const MemberPayView = () => (
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
    </div>
);

export default MemberPayView;
