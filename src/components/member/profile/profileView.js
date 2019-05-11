import React from 'react';
import { Link } from 'react-router-dom';

import { getCookie } from '../../../utils/cookies';

const ProfileView = ({ user }) => (
    <div className='container'>
        <table className='table'>
            <tbody>
                <tr>
                    <th>Etunimi</th><td className='uppercase'>{user.firstName}</td>
                </tr>
                <tr>
                    <th>Sukunimi</th><td className='uppercase'>{user.lastName}</td>
                </tr>
                <tr>
                    <th>UTU-tunnus</th><td className='uppercase'>{user.utuAccount}</td>
                </tr>
                <tr>
                    <th>Sähköpostiosoite</th><td className=''>{user.email}</td>
                </tr>
                <tr>
                    <th>Kotikunta</th><td className='uppercase'>{user.hometown}</td>
                </tr>
                <tr>
                    <th>TYY-jäsenyys</th><td className='uppercase'>{user.tyyMember.toString()}</td>
                </tr>
                <tr>
                    <th>TIVIA-jäsenyys</th><td className='uppercase'>{user.tiviaMember.toString()}</td>
                </tr>
            </tbody>
        </table>
        <Link className='btn btn-success success' to={`/member/update/${getCookie('id')}`}>Päivitä tietoja</Link>
    </div>
);

export default ProfileView;
