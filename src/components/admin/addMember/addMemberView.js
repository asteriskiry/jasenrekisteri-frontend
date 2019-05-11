import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AddMemberView = (props) => (
    <div className='new'>
        {(props.message) ? <Alert variant={(!props.success) ? 'danger' : 'success'}>{props.message}</Alert> : null }
        <form onSubmit={props.handleAddMember}>
            <div>
                <label>Etunimi</label>
                <input type="text" name="firstName" className="fields" />
            </div>
            <div>
                <span className='required'>Kaikki kentät ovat pakollisia.</span>
                <button className="btn success">Tallenna</button>
            </div>
        </form>
    </div>
);

export default AddMemberView;
