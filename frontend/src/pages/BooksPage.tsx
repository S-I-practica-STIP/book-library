import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Grid, CircularProgress, Alert, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Book } from '../types/index';
import api from '../api/axios';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data))
      .catch(() => setError('Не вдалось завантажити книги'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm('Видалити книгу?')) return;
    api.delete(`/books/${id}`)
      .then(() => setBooks(books.filter(b => b.id !== id)))
      .catch(() => alert('Не вдалось видалити книгу'));
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Книги</Typography>
      {books.length === 0 ? (
        <Alert severity="info">Книг поки немає. Додайте першу!</Alert>
      ) : (
        <Grid container spacing={2}>
          {books.map(book => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography color="text.secondary">Рік: {book.year}</Typography>
                  <Typography color="text.secondary">Автор ID: {book.authorId}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="error" onClick={() => handleDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}