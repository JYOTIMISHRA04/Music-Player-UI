import React from 'react'
import '../App.css';
import { Box } from '@mui/material';


const Logo = () => {
    return (
        <Box className="logo" style={{}}>
            <img
                alt="Logo"
                src='/images/spotify.svg'
                style={{ height: '40px' }}
            />
        </Box>

    )
}

export default Logo;



