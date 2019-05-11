import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../../utils/cookies';

const AdminProfileView = ({ profile }) => (
    <div className='profile'>
        <h1>adminprofile</h1>
        <table className='table'>
            <tbody>
                <tr>
                    <th>Etunimi</th><td className='uppercase'>{profile.firstName}</td>
                </tr>
                <tr>
                    <th>Sukunimi</th><td className='uppercase'>{profile.lastName}</td>
                </tr>
                <tr>
                    <th>UTU-tunnus</th><td className='uppercase'>{profile.utuAccount}</td>
                </tr>
                <tr>
                    <th>Sähköpostiosoite</th><td className=''>{profile.email}</td>
                </tr>
                <tr>
                    <th>Kotikunta</th><td className='uppercase'>{profile.hometown}</td>
                </tr>
                <tr>
                    <th>TYY-jäsenyys</th><td className='uppercase'>{profile.tyyMember.toString()}</td>
                </tr>
                <tr>
                    <th>TIVIA-jäsenyys</th><td className='uppercase'>{profile.tiviaMember.toString()}</td>
                </tr>
            </tbody>
        </table>
        <Link className='btn btn-success success' to={`/employee/update/${getCookie('id')}`}>Päivitä tietoja</Link>
    </div>
);

export default AdminProfileView;
