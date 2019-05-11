import React from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { getCookie } from '../../../utils/cookies';

const memberDetailsView = ({ message, member, success, handleRemove }) => (
    <div className='profile'>
        {(message) ? <Alert variant={(!success) ? 'danger' : 'success'}>{message}</Alert> : null }
        <table className='table'>
            <tbody>
                <tr>
                    <th>Etunimi</th><td className='uppercase'>{member.firstName}</td>
                </tr>
                <tr>
                    <th>Sukunimi</th><td className='uppercase'>{member.lastName}</td>
                </tr>
                <tr>
                    <th>UTU-tunnus</th><td className='uppercase'>{member.utuAccount}</td>
                </tr>
                <tr>
                    <th>Sähköpostiosoite</th><td className=''>{member.email}</td>
                </tr>
                <tr>
                    <th>Kotikunta</th><td className='uppercase'>{member.hometown}</td>
                </tr>
                <tr>
                    <th>TYY-jäsenyys</th><td className='uppercase'>{member.tyyMember.toString()}</td>
                </tr>
                <tr>
                    <th>TIVIA-jäsenyys</th><td className='uppercase'>{member.tiviaMember.toString()}</td>
                </tr>
            </tbody>
        </table>
        <Link className='btn btn-success success' to={`/member/update/${getCookie('id')}`}>Päivitä tietoja</Link>
        <Button
          variant="danger"
          onClick={handleRemove}
        >
            Poista {member.firstName} {member.lastName}
        </Button>
    </div>
);

export default memberDetailsView;
