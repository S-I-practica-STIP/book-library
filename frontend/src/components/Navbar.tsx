import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Бібліотека книг
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Книги
          </Button>
          <Button color="inherit" component={Link} to="/authors">
            Автори
          </Button>
          <Button color="inherit" component={Link} to="/books/new">
            Додати книгу
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}