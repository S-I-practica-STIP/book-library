import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/books/new" element={<AddBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;