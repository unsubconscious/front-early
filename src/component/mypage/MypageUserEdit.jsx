import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AdminFlagContext } from '../../flag/Flag.jsx';

const MypageUserEdit = () => {
    const [cookies] = useCookies(['jwtToken']);
    const { user,setUser,userId,setUserId,shopId,setShopid } = useContext(AdminFlagContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const token = cookies.jwtToken;
        try {
            await axios.post('http://localhost:8080/api/api/change-password', {
                password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Password changed successfully');
        } catch (error) {
            console.log(error);
            setMessage('Error changing password');
        }
    };

    return(
        <div className="container mt-5">
        <Card>
            <Card.Body>
                <Card.Title>비밀번호 변경</Card.Title>
                <form onSubmit={handlePasswordChange}>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="newPassword" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </form>
                {message && <p className="mt-3">{message}</p>}
            </Card.Body>
        </Card>
        </div>
    );
}

export default MypageUserEdit;