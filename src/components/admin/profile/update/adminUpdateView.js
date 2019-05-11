import React from 'react';
import { getCookie } from '../../../../utils/cookies';
import Alert from 'react-bootstrap/Alert';

const AdminUpdateView = ({profile, handleUpdateAdmin, success, message}) => (
    <div className='container profile-update'>
        {(message) ? <Alert variant={(!success) ? 'danger' : 'success'}>{message}</Alert> : null }
        <form onSubmit={handleUpdateAdmin}>
            <div>
                <label>Etunimi</label>
                <input type="text" name="firstName" defaultValue={profile.username} className="fields" />
            </div>
            <div>
                <label>Sähköpostiosoite</label>
                <input type="email" name="email" defaultValue={profile.email} className="fields" />
            </div>
            <div>
                <label>Role</label>
                {(getCookie('role') === 'Admin')
                        ?
                        <select name="role" className="dropdown" defaultValue={profile.role}>
                            <option value="Admin">Admin</option>
                        </select>
                        :
                        <input type="text" name="role" readOnly value={profile.role} />
                }
            </div>
            <div>
                <label>Salasana</label>
                <input type="password" name="password" placeholder="Salasana" />
            </div>
            <div>
                <button className='btn success'>Päivitä</button>
            </div>
        </form>
    </div>
);

export default AdminUpdateView;
