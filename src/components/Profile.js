import { Avatar } from '@mui/material';
import React from 'react';
import '../App.css';


const profile = () => {
    return (
        <Avatar
            alt="Profile Picture"
            src="/images/profile.png"
            style={{ background: '#151515' }}
        />
    )
}

export default profile