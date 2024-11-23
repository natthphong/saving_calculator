// components/Navbar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Navbar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Investment App
                </Typography>
                <Button
                    color="inherit"
                    startIcon={<SavingsIcon />}
                    onClick={() => handleNavigation('/')}
                >
                    Calculator Saving
                </Button>
                <Button
                    color="inherit"
                    startIcon={<TrendingUpIcon />}
                    onClick={() => handleNavigation('/dca')}
                >
                    DCA Investment
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
