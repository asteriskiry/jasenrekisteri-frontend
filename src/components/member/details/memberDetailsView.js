import React from 'react';

import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

Moment.locale('fi');

const memberDetailsView = ({
    firstName,
    lastName,
    utuAccount,
    email,
    hometown,
    tyyMember,
    tiviaMember,
    role,
    accessRights,
    membershipStarts,
    membershipEnds,
    accountCreated,
    roleSwitchCase,
    message,
    success,
    handleRemove,
    memberID,
}) => (
    <div className="container">
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <Table striped hover>
            <tbody>
                <tr>
                    <th>Etunimi</th>
                    <td>{firstName}</td>
                </tr>
                <tr>
                    <th>Sukunimi</th>
                    <td>{lastName}</td>
                </tr>
                <tr>
                    <th>UTU-tunnus</th>
                    <td>{utuAccount}</td>
                </tr>
                <tr>
                    <th>Sähköpostiosoite</th>
                    <td>{email}</td>
                </tr>
                <tr>
                    <th>Kotikunta</th>
                    <td>{hometown}</td>
                </tr>
                <tr>
                    <th>TYY-jäsenyys</th>
                    <td>
                        {tyyMember ? (
                            <p>
                                Kyllä{' '}
                                <FontAwesomeIcon icon="check" color="green" />
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
                        {tiviaMember ? (
                            <p>
                                Kyllä{' '}
                                <FontAwesomeIcon icon="check" color="green" />
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
                    <td>{roleSwitchCase(role)}</td>
                </tr>
                <tr>
                    <th>Kulkuoikeudet</th>
                    <td>{accessRights ? '24/7' : 'Ma-Su 07:00-21:00'}</td>
                </tr>
                <tr>
                    <th>Jäsenyys alkanut</th>
                    <td>
                        {membershipStarts
                            ? Moment(membershipStarts).format('D.M.YYYY')
                            : 'Jäsenyyttä ei vielä hyväksytty'}
                    </td>
                </tr>
                <tr>
                    <th>Jäsenyys päättyy</th>
                    <td>
                        {membershipEnds
                            ? Moment(membershipEnds).format('D.M.YYYY')
                            : 'Jäsenyyttä ei vielä hyväksytty'}
                    </td>
                </tr>
                <tr>
                    <th>Tunnus luotu</th>
                    <td>{Moment(accountCreated).format('D.M.YYYY')}</td>
                </tr>
            </tbody>
        </Table>
        <Link
            className="btn btn-success success"
            to={`/profile/update/${memberID}`}
        >
            Päivitä tietoja
        </Link>
        <Button variant="danger" onClick={handleRemove}>
            Poista {firstName} {lastName}
        </Button>
        <Link className="btn btn-secondary secondary float-right" to="/admin">
            Takaisin
        </Link>
    </div>
);

export default memberDetailsView;
