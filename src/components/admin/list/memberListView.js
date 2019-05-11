import React from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

const ExportCSVButton = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Vie CSV</button>
        </div>
    );
};

const columns = [{
    dataField: 'firstName',
    text: 'Etunimi',
    sort: true
}, {
    dataField: 'lastName',
    text: 'Sukunimi',
    sort: true
}, {
    dataField: 'utuAccount',
    text: 'UTU-tunnus',
    sort: true
}, {
    dataField: 'email',
    text: 'Email',
    sort: true
}, {
    dataField: 'hometown',
    text: 'Kotikunta',
    sort: true
}, {
    dataField: 'tyyMember',
    text: 'TYY',
    sort: true
}, {
    dataField: 'tiviaMember',
    text: 'TIVIA',
    sort: true
}, {
    dataField: 'role',
    text: 'Rooli',
    sort: true
}, {
    dataField: 'accessRights',
    text: 'Kulkuoikeudet',
    sort: true
}, {
    dataField: 'accountCreated',
    text: 'Tunnus luotu',
    sort: true
}, {
    text: 'Muokkaa',
    formatter: (cell, row, rowIndex, extraData) => (
        <div>
            <Link className='name uppercase' to={`/member/details/${row._id}`}>Muokkaa</Link>
        </div>
    ),
}];

const defaultSorted = [{
    dataField: 'firstName',
    order: 'desc'
}];

const MemberListView = (props) => {
    if (props.list === undefined) {
        return null;
    }

    if (!props.list.success && props.list.hasOwnProperty('success')) {
        return <div>{props.list.message}</div>
    }

    if (props.list.length === 0) {
        return <div className='members-none'>Jäseniä ei löytynyt.</div>
    }

    return (
        <ToolkitProvider
            bootstrap4
            keyField="id"
            data={ props.list }
            columns={ columns }
            defaultSorted={ defaultSorted }
            search
        >
            {
                props => (
                    <div className='container-fluid'>
                        <SearchBar { ...props.searchProps } placeholder="Haku" />
                        <hr />
                        <BootstrapTable
                            { ...props.baseProps }
                        />
                        <ExportCSVButton { ...props.csvProps }>Exporttaa CSV</ExportCSVButton>
                    </div>
                )
            }
        </ToolkitProvider>
    );
};

export default MemberListView;
