import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Home
                </Typography>
            </Toolbar>
        </AppBar>
    );
}