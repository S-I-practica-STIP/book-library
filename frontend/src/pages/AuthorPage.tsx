import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Button, Box, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Author } from '../types/index';
import api from '../api/axios';

export default function AuthorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/authors/${id}`)
      .then(res => setAuthor(res.data))
      .catch(() => setError('Автора не знайдено'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
  if (!author) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/authors')}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Typography variant="h3" gutterBottom>{author.name}</Typography>
      <Typography color="text.secondary" gutterBottom>
        Рік народження: {author.birthYear}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>Біографія</Typography>
      {author.bio ? (
        <Typography variant="body1" sx={{ lineHeight: 2, whiteSpace: 'pre-wrap' }}>
          {author.bio}
        </Typography>
      ) : (
        <Alert severity="info">Біографія ще не додана</Alert>
      )}
    </Container>
  );
}