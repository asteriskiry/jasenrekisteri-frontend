import React from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

Moment.locale('fi');

const memberDetailsView = ({
    message,
    member,
    success,
    handleRemove,
    roleSwitchCase,
}) => (
    <div className="container">
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <Table striped hover>
            <tbody>
                <tr>
                    <th>Etunimi</th>
                    <td>{member.firstName}</td>
                </tr>
                <tr>
                    <th>Sukunimi</th>
                    <td>{member.lastName}</td>
                </tr>
                <tr>
                    <th>UTU-tunnus</th>
                    <td>{member.utuAccount}</td>
                </tr>
                <tr>
                    <th>Sähköpostiosoite</th>
                    <td>{member.email}</td>
                </tr>
                <tr>
                    <th>Kotikunta</th>
                    <td>{member.hometown}</td>
                </tr>
                <tr>
                    <th>TYY-jäsenyys</th>
                    <td>
                        {member.tyyMember ? (
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
                        {member.tiviaMember ? (
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
                    <td>{roleSwitchCase(member)}</td>
                </tr>
                <tr>
                    <th>Kulkuoikeudet</th>
                    <td>
                        {member.accessRights ? '24/7' : 'Ma-Su 07:00-21:00'}
                    </td>
                </tr>
                <tr>
                    <th>Jäsenyys alkanut</th>
                    <td>
                        {member.membershipStarts
                            ? Moment(member.membershipStarts).format('d.M.YYYY')
                            : 'Jäsenyyttä ei vielä hyväksytty'}
                    </td>
                </tr>
                <tr>
                    <th>Jäsenyys päättyy</th>
                    <td>
                        {member.membershipEnds
                            ? Moment(member.membershipEnds).format('d.M.YYYY')
                            : 'Jäsenyyttä ei vielä hyväksytty'}
                    </td>
                </tr>
                <tr>
                    <th>Tunnus luotu</th>
                    <td>{Moment(member.accountCreated).format('d.M.YYYY')}</td>
                </tr>
            </tbody>
        </Table>
        <Link
            className="btn btn-success success"
            to={`/profile/update/${member._id}`}
        >
            Päivitä tietoja
        </Link>
        <Button variant="danger" onClick={handleRemove}>
            Poista {member.firstName} {member.lastName}
        </Button>
    </div>
);

export default memberDetailsView;
