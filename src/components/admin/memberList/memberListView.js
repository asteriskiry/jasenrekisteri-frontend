import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import SimpleTable from '../../commons/table/simpleTable';
import { exportToCsv } from '../../commons/table/csvExport';
import { getCookie } from '../../../utils/cookies';
import './memberList.css';

const ExportCSVButton = (props) => {
    return (
        <div>
            <button className="btn btn-success" onClick={props.onExport}>
                Vie CSV:nä
            </button>
        </div>
    );
};

function membershipEndsFormatter(cell, row) {
    const currentDate = new Date();
    if (row.membershipEnds) {
        if (new Date(row.membershipEnds) <= currentDate) {
            return (
                <div>
                    {Moment(row.membershipEnds).format('D.M.YYYY')}{' '}
                    <FontAwesomeIcon icon="exclamation-triangle" color="red" />
                </div>
            );
        } else {
            return <div>{Moment(row.membershipEnds).format('D.M.YYYY')}</div>;
        }
    } else {
        return (
            <div>
                <FontAwesomeIcon icon="times" color="red" />
            </div>
        );
    }
}

function roleSwitchCase(cell, row) {
    switch (row.role.toLowerCase()) {
        case 'admin':
            return 'Admin';
        case 'board':
            return 'Hallitus';
        case 'functionary':
            return 'Toimihenkilö';
        case 'member':
            return 'Jäsen';
        default:
            return 'Jäsen';
    }
}

const columns = [
    {
        dataField: 'firstName',
        text: 'Etunimi',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        style: { textTransform: 'capitalize' },
    },
    {
        dataField: 'lastName',
        text: 'Sukunimi',
        sort: true,
        align: 'center',
        headerAlign: 'center',
    },
    {
        dataField: 'utuAccount',
        text: 'UTU',
        sort: true,
        align: 'center',
        headerAlign: 'center',
    },
    {
        dataField: 'email',
        text: 'Email',
        sort: true,
        headerStyle: {
            width: '250px',
        },
        align: 'center',
        headerAlign: 'center',
    },
    {
        dataField: 'hometown',
        text: 'Kotikunta',
        sort: true,
        align: 'center',
        headerAlign: 'center',
    },
    {
        dataField: 'tyyMember',
        text: 'TYY',
        sort: true,
        headerStyle: {
            width: '70px',
        },
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => (
            <div>
                {row.tyyMember ? (
                    <p>
                        <FontAwesomeIcon icon="check" color="green" />
                    </p>
                ) : (
                    <p>
                        <FontAwesomeIcon icon="times" color="red" />
                    </p>
                )}
            </div>
        ),
    },
    {
        dataField: 'tiviaMember',
        text: 'TIVIA',
        sort: true,
        headerStyle: {
            width: '80px',
        },
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => (
            <div>
                {row.tiviaMember ? (
                    <p>
                        <FontAwesomeIcon icon="check" color="green" />
                    </p>
                ) : (
                    <p>
                        <FontAwesomeIcon icon="times" color="red" />
                    </p>
                )}
            </div>
        ),
    },
    {
        dataField: 'role',
        text: 'Rooli',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        formatter: roleSwitchCase,
    },
    {
        dataField: 'accessRights',
        text: 'Varasto',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerStyle: {
            width: '100px',
        },
        formatter: (cell, row) => (
            <div>
                {row.accessRights ? (
                    <p>
                        <FontAwesomeIcon icon="check" color="green" />
                    </p>
                ) : (
                    <p>
                        <FontAwesomeIcon icon="times" color="red" />
                    </p>
                )}
            </div>
        ),
    },
    {
        dataField: 'membershipStarts',
        text: 'Alkanut',
        sort: true,
        headerStyle: {
            width: '100px',
        },
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => (
            <div>
                {row.membershipStarts ? (
                    Moment(row.membershipStarts).format('D.M.YYYY')
                ) : (
                    <FontAwesomeIcon icon="times" color="red" />
                )}
            </div>
        ),
    },
    {
        dataField: 'membershipEnds',
        text: 'Päättyy',
        sort: true,
        headerStyle: {
            width: '100px',
        },
        align: 'center',
        headerAlign: 'center',
        formatter: membershipEndsFormatter,
    },
    {
        dataField: 'accepted',
        text: 'Jäsen',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerStyle: {
            width: '90px',
        },
        formatter: (cell, row) => (
            <div>
                {row.accepted ? (
                    <p>
                        <FontAwesomeIcon icon="check" color="green" />
                    </p>
                ) : (
                    <p>
                        <FontAwesomeIcon icon="times" color="red" />
                    </p>
                )}
            </div>
        ),
    },
];

const defaultSort = {
    dataField: 'firstName',
    order: 'desc',
};

const MemberListView = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    if (props.list === undefined) {
        return null;
    }

    if (props.list.length === 0) {
        return <div className="members-none">Jäseniä ei löytynyt.</div>;
    }

    const rowEvents = {
        onClick: (row) => {
            props.handleClick(row);
        },
    };

    const handleExport = () => {
        exportToCsv('jasenet.csv', columns, props.list);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Haku"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col">
                    {getCookie('role').toLowerCase() === 'admin' ? (
                        <Link
                            className="addNew float-right btn btn-success"
                            to="/admin/new"
                        >
                            Lisää jäsen
                        </Link>
                    ) : null}
                </div>
            </div>
            <hr />
            <div className="memberlist">
                <SimpleTable
                    keyField="email"
                    data={props.list}
                    columns={columns}
                    defaultSort={defaultSort}
                    searchQuery={searchQuery}
                    rowEvents={rowEvents}
                    className="memberlistTable"
                />
            </div>
            <div className="row">
                <div className="col">
                    <div className="csvButton">
                        <ExportCSVButton onExport={handleExport} />
                    </div>
                </div>
                <div className="col">
                    <div className="membercount float-right">
                        <p>Jäseniä yhteensä {props.list.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberListView;
