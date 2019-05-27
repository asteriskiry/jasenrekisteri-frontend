import React from 'react';

import { Link } from 'react-router-dom';
import MainComponent from './commons/main/mainComponent';

const styles = {
    fontSize: '5rem',
    fontWeight: '600',
    marginBottom: '30px',
};

const Notfound = () => (
    <MainComponent>
        <div className="text-center">
            <h1 style={styles}>404</h1>
            <Link to="/" className="btn btn-success">
                Etusivulle
            </Link>
        </div>
    </MainComponent>
);

export default Notfound;
