import React from 'react';

import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import asteriskilogo from '../../assets/asteriski-logo.svg';
import './memberCardView.css';

Moment.locale('fi');

const MemberCardView = ({
    firstName,
    lastName,
    role,
    accessRights,
    membershipStarts,
    membershipEnds,
    roleSwitchCase,
    membershipValid,
}) => (
    <div className="container">
        {membershipValid ? (
            <Card>
                <Card.Img
                    variant="top"
                    src={asteriskilogo}
                    className="rotatingLogo"
                />
                <Card.Body>
                    <Card.Title>
                        Jäsenyys voimassa{' '}
                        <FontAwesomeIcon icon="check" color="green" />
                    </Card.Title>

                    <Card.Text>
                        <p style={{ textTransform: 'capitalize' }}>
                            {firstName} {lastName} <br />
                            {Moment(membershipStarts).format('D.M.YYYY') +
                                ' - ' +
                                Moment(membershipEnds).format('D.M.YYYY')}{' '}
                            <br />
                            <small>{roleSwitchCase(role)}</small>
                            <br />
                            <small>{accessRights ? '24/7' : null}</small>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        ) : (
            <FontAwesomeIcon icon="times" color="red" />
        )}
    </div>
);

export default MemberCardView;
