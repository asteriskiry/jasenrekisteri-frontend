import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import asteriskilogo from '../../assets/asteriski-logo.png';
import '../../assets/rotating-logo.css';

import './mainComponent.css';

class MainComponent extends Component {

    componentDidMount(){
        document.title = 'Jäsenrekisteri';
    }

    render() {
        return (
            <div className='container-fluid auth'>
                <div className="d-flex justify-content-center">
                    <div className="jumbotron smalljumbo">
                        <Link to='/'><img alt="Asteriski logo" className="mx-auto d-block rotating-logo" src={asteriskilogo} /></Link>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainComponent;
