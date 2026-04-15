import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Alert } from '@mui/material';
import type { Author } from '../types/index';
import api from '../api/axios';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/authors')
      .then(res => setAuthors(res.data))
      .catch(() => setError('Не вдалось завантажити авторів'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Автори</Typography>
      {authors.length === 0 ? (
        <Alert severity="info">Авторів поки немає.</Alert>
      ) : (
        <Grid container spacing={2}>
          {authors.map(author => (
            <Grid item xs={12} sm={6} md={4} key={author.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{author.name}</Typography>
                  <Typography color="text.secondary">Рік народження: {author.birthYear}</Typography>
                  {author.bio && (
                    <Typography variant="body2" sx={{ mt: 1 }}>{author.bio}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}