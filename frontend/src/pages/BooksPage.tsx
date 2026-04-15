import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Alert } from '@mui/material';
import api from '../api/axios';
import type { Book } from '../types/index';

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
              <Card>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography color="text.secondary">Рік: {book.year}</Typography>
                  <Typography color="text.secondary">Автор ID: {book.authorId}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}