import React, { Component } from 'react';

import { Link } from 'react-router-dom';

let styles = {
    marginTop: '30px',
};

class MemberNotFoundComponent extends Component {
    render() {
        return (
            <div className="container text-center">
                <h1>Jäsentietoja ei löytynyt</h1>
                <Link to="/" className="btn btn-success" style={styles}>
                    Takaisin
                </Link>
            </div>
        );
    }
}

export default MemberNotFoundComponent;
