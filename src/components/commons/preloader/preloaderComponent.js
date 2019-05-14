import React, { Component } from 'react';

import asteriskilogo from '../../assets/asteriski-logo.png';
import '../../assets/rotating-logo.css';

import './preloaderComponent.css';

class PreloaderComponent extends Component {
    render() {
        return (
            <img
                alt="Asteriski preloader"
                className="mx-auto d-block preloader"
                src={asteriskilogo}
            />
        );
    }
}

export default PreloaderComponent;
