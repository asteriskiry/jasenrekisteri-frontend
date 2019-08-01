import React, { Component } from 'react';

import asteriskilogo from '../../assets/asteriski-logo.png';

import './preloaderComponent.css';

class PreloaderComponent extends Component {
    render() {
        if (this.props.size === 'small') {
            return (
                <img
                    alt="Asteriski preloader"
                    className="mx-auto d-block preloaderSmall"
                    src={asteriskilogo}
                />
            );
        } else {
            return (
                <img
                    alt="Asteriski preloader"
                    className="mx-auto d-block preloader"
                    src={asteriskilogo}
                />
            );
        }
    }
}

export default PreloaderComponent;
