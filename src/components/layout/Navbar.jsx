import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated,user } = useSelector((state) => state.auth);

    
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Social Connect
        </Typography>
 

        {
            isAuthenticated ? (
                <>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Hello {user.name}!
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
                </>
            ) : (
                <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
                </>
            )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
