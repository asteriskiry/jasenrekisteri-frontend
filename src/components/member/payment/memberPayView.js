import React from 'react';
import moment from 'moment';

const MemberPayView = membershipEnds => (
    <div className="container">
        <h3>Jäsenmaksun maksaminen</h3>
        <p>
            Valitse haluamasi jäsenyyden pituus ja paina Maksa-nappia. Tämän
            jälkeen mahdolliset maksutavat tulevat näkyviin. Painamalla halutun
            maksunvälittäjän logoa sinut ohjataan maksunvälittäjän sivustolle
            suorittamaan maksusi.
        </p>
        <p>
            Onnistuneen maksun jälkeen sinut ohjataan takaisin jäsenrekisteriin
            jossa saat vahvistuksen onnistuneesta maksusta. Voit tarkistaa, että
            jäsenyytesi päättymispäivä on päivittynyt Tiedot-sivulta.
        </p>
        <p>
            Jäsenmaksu on mahdollista maksaa myös käteisenä Asteriskin
            hallituksen jäsenelle.
        </p>
        <p>
            Nykyinen jäsenyytesi päättymispäivä on{' '}
            <b>{moment(membershipEnds.membershipEnds).format('D.M.YYYY')}</b>.
        </p>
        <h4>Hinnasto</h4>
        <ul>
            <li>1 vuosi: 5 €</li>
            <li>5 vuotta: 20 €</li>
        </ul>
    </div>
);

export default MemberPayView;
