import React from 'react';

import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

const ExportCSVButton = props => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={handleClick}>
                Vie CSV:nä
            </button>
        </div>
    );
};

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
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                <Link className="firstName" to={`/member/details/${row._id}`}>
                    {row.firstName}
                </Link>
            </div>
        ),
    },
    {
        dataField: 'lastName',
        text: 'Sukunimi',
        sort: true,
    },
    {
        dataField: 'utuAccount',
        text: 'UTU-tunnus',
        sort: true,
    },
    {
        dataField: 'email',
        text: 'Email',
        sort: true,
    },
    {
        dataField: 'hometown',
        text: 'Kotikunta',
        sort: true,
    },
    {
        dataField: 'tyyMember',
        text: 'TYY',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
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
        formatter: (cell, row, rowIndex, extraData) => (
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
        formatter: roleSwitchCase,
    },
    {
        dataField: 'accessRights',
        text: '24/7 kulkuoikeudet',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
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
        text: 'Jäsenyys alkanut',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
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
        text: 'Jäsenyys päättyy',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                {row.membershipEnds ? (
                    Moment(row.membershipEnds).format('D.M.YYYY')
                ) : (
                    <FontAwesomeIcon icon="times" color="red" />
                )}
            </div>
        ),
    },
    {
        dataField: 'accepted',
        text: 'Hyväksytty',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
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

const defaultSorted = [
    {
        dataField: 'firstName',
        order: 'desc',
    },
];

const MemberListView = props => {
    if (props.list === undefined) {
        return null;
    }

    if (props.list.length === 0) {
        return <div className="members-none">Jäseniä ei löytynyt.</div>;
    }

    return (
        <ToolkitProvider
            bootstrap4
            keyField="id"
            data={props.list}
            columns={columns}
            defaultSorted={defaultSorted}
            search
        >
            {props => (
                <div className="container-fluid">
                    <SearchBar {...props.searchProps} placeholder="Haku" />
                    <Link
                        className="addNew float-right btn btn-success"
                        to="/admin/new"
                    >
                        Lisää uusi jäsen
                    </Link>
                    <hr />
                    <BootstrapTable {...props.baseProps} />
                    <ExportCSVButton {...props.csvProps}>
                        Exporttaa CSV
                    </ExportCSVButton>
                </div>
            )}
        </ToolkitProvider>
    );
};

export default MemberListView;
