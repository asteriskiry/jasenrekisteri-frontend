import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap';

class PayForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            membershipLength: this.props.membershipLength,
        };
    }
    render() {
        return(
    <div className="container">
        <Form onSubmit={this.props.handleClick}>
            <Form.Group>
                <Form.Check
                    custom
                    inline
                    name="membershipLength"
                    label="1 vuosi"
                    type="radio"
                    value="1"
                    onChange={this.props.handleInputChange}
                    checked={this.state.membershipLength === 1}
                />
                <Form.Check
                    custom
                    inline
                    name="membershipLength"
                    label="5 vuotta"
                    type="radio"
                    value="5"
                    onChange={this.props.handleInputChange}
                    checked={this.state.membershipLength === 5}
                />
            </Form.Group>
            <Button type="submit" variant="success">
                Maksa
            </Button>
        </Form>
    </div>

        );
    }
}

export default PayForm;
