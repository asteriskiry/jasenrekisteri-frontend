import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import { getCookie } from '../../../utils/cookies';

Moment.locale('fi');

const ProfileView = ({ user, roleSwitchCase }) => (
    <div className="container">
        <Table striped hover>
            <tbody>
                <tr>
                    <th>Etunimi</th>
                    <td>{user.firstName}</td>
                </tr>
                <tr>
                    <th>Sukunimi</th>
                    <td>{user.lastName}</td>
                </tr>
                <tr>
                    <th>UTU-tunnus</th>
                    <td>{user.utuAccount}</td>
                </tr>
                <tr>
                    <th>Sähköpostiosoite</th>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <th>Kotikunta</th>
                    <td>{user.hometown}</td>
                </tr>
                <tr>
                    <th>TYY-jäsenyys</th>
                    <td>
                        {user.tyyMember ? (
                            <p>
                                Kyllä <FontAwesomeIcon icon="check" color="green" />
                            </p>
                        ) : (
                            <p>
                                Ei <FontAwesomeIcon icon="times" color="red" />
                            </p>
                        )}
                    </td>
                </tr>
                <tr>
                    <th>TIVIA-jäsenyys</th>
                    <td>
                        {user.tiviaMember ? (
                            <p>
                                Kyllä <FontAwesomeIcon icon="check" color="green" />
                            </p>
                        ) : (
                            <p>
                                Ei <FontAwesomeIcon icon="times" color="red" />
                            </p>
                        )}
                    </td>
                </tr>
                <tr>
                    <th>Rooli</th>
                    <td>{roleSwitchCase(user)}</td>
                </tr>
                <tr>
                    <th>Kulkuoikeudet</th>
                    <td>
                        {user.accessRights ? '24/7' : 'Ma-Su 07:00 - 21:00'}
                    </td>
                </tr>
                <tr>
                    <th>Jäsenyys alkanut</th>
                    <td>
                        {user.membershipStarts
                            ? user.membershipStarts
                            : 'Jäsenyyttä ei vielä hyväksytty'}
                    </td>
                </tr>
                <tr>
                    <th>Jäsenyys päättyy</th>
                    <td>
                        {user.membershipEnds
                            ? user.membershipEnds
                            : 'Jäsenyyttä ei vielä hyväksytty'}
                    </td>
                </tr>
                <tr>
                    <th>Tunnus luotu</th>
                    <td>{Moment(user.accountCreated).format('d.M.YYYY')}</td>
                </tr>
            </tbody>
        </Table>
        <Link
            className="btn btn-success success"
            to={`/member/update/${getCookie('id')}`}
        >
            Päivitä tietoja
        </Link>
    </div>
);

export default ProfileView;
