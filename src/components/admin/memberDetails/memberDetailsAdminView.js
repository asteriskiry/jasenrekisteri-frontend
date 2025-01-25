import React from 'react';

import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import { getCookie } from '../../../utils/cookies';
import './memberDetailsAdminView.css';

Moment.locale('fi');

const currentDate = new Date();

function membershipEndsFormatter(membershipEnds, currentDate) {
    if (membershipEnds) {
        if (new Date(membershipEnds) <= currentDate) {
            return (
                <div>
                    {Moment(membershipEnds).format('D.M.YYYY')}{' '}
                    <FontAwesomeIcon icon="exclamation-triangle" color="red" />
                </div>
            );
        } else {
            return <div>{Moment(membershipEnds).format('D.M.YYYY')}</div>;
        }
    } else {
        return (
            <div>
                <FontAwesomeIcon icon="times" color="red" />
            </div>
        );
    }
}

const MemberDetailsAdminView = ({
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
    accepted,
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
                    <td style={{ textTransform: 'capitalize' }}>{firstName}</td>
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
                    <td>{accessRights ? 'Varasto/roskikset' : 'Vain toimisto'}</td>
                </tr>
                <tr>
                    <th>Jäsenyys hyväksytty</th>
                    <td>
                        {accepted ? (
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
                        {membershipEndsFormatter(membershipEnds, currentDate)}
                    </td>
                </tr>
                <tr>
                    <th>Tunnus luotu</th>
                    <td>{Moment(accountCreated).format('D.M.YYYY')}</td>
                </tr>
            </tbody>
        </Table>
        {getCookie('role').toLowerCase() === 'admin' ? (
            <>
                <Link
                    className="btn btn-success success"
                    to={`/profile/update/${memberID}`}
                >
                    Päivitä tietoja
                </Link>
                <Button variant="danger" onClick={handleRemove} style={{ textTransform: "capitalize" }}>
                    Poista {firstName} {lastName}
                </Button>
            </>
        ) : null}
        <Link className="btn btn-secondary secondary backbutton" to="/admin">
            Takaisin
        </Link>
    </div>
);

export default MemberDetailsAdminView;
