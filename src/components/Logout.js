import React from 'react';
import { Button } from 'react-bootstrap';
import { googleLogout } from '@react-oauth/google';


export default function Logout({ setUser }) {
    const handleLogout = () => {
        googleLogout()
        setUser(null);
        console.log("Logged out successfully.");
    }
    
    return (
        <div>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
    );
}
