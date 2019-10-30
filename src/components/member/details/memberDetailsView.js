import React from 'react';

import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import { getCookie } from '../../../utils/cookies';

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

const MemberDetailsView = ({
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
    accepted,
    roleSwitchCase,
}) => (
    <div className="container">
        <Table striped hover>
            <tbody>
                <tr>
                    <th>Etunimi</th>
                    <td style={{textTransform: "capitalize"}}>{firstName}</td>
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
                    <td>{accessRights ? '24/7' : 'Ma-Su 07:00 - 21:00'}</td>
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
            </tbody>
        </Table>
        <div>
            {membershipEnds && new Date(membershipEnds) <= currentDate ? (
                <p>
                    <FontAwesomeIcon icon="exclamation-triangle" color="red" />{' '}
                    Jäsenyytesi on päättynyt. Maksa jäsenmaksusi.
                </p>
            ) : null}
        </div>
        <Link
            className="btn btn-success success"
            to={`/member/update/${getCookie('id')}`}
        >
            Päivitä tietoja
        </Link>
    </div>
);

export default MemberDetailsView;
