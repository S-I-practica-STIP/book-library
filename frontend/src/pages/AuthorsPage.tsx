import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardActions, Grid, CircularProgress, Alert, IconButton, TextField, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Author } from '../types/index';
import api from '../api/axios';

const schema = z.object({
  name: z.string().min(1, 'Імʼя не може бути порожнім'),
  bio: z.string().optional(),
  birthYear: z.number({ invalid_type_error: 'Введіть рік' })
    .min(1000, 'Рік виглядає некоректно')
    .max(new Date().getFullYear(), 'Рік не може бути в майбутньому'),
});

type FormData = z.infer<typeof schema>;

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    api.get('/authors')
      .then(res => setAuthors(res.data))
      .catch(() => setError('Не вдалось завантажити авторів'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // щоб не відкривалась сторінка автора при кліку на видалення
    if (!window.confirm('Видалити автора?')) return;
    api.delete(`/authors/${id}`)
      .then(() => setAuthors(authors.filter(a => a.id !== id)))
      .catch(() => alert('Не вдалось видалити автора'));
  };

  const onSubmit = (data: FormData) => {
    api.post('/authors', data)
      .then(res => {
        setAuthors([...authors, res.data]);
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => setError('Не вдалось додати автора'));
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Автори</Typography>

      {/* Форма додавання */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Додати автора</Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>Автора додано!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Імʼя автора"
              fullWidth
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Рік народження"
              type="number"
              fullWidth
              {...register('birthYear', { valueAsNumber: true })}
              error={!!errors.birthYear}
              helperText={errors.birthYear?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Біографія"
              fullWidth
              multiline
              rows={4}
              {...register('bio')}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Додати автора
        </Button>
      </Box>

      {/* Список авторів */}
      {authors.length === 0 ? (
        <Alert severity="info">Авторів поки немає.</Alert>
      ) : (
        <Grid container spacing={2}>
          {authors.map(author => (
            <Grid item xs={12} sm={6} md={4} key={author.id}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => navigate(`/authors/${author.id}`)}
              >
                <CardContent>
                  <Typography variant="h6">{author.name}</Typography>
                  <Typography color="text.secondary">Рік народження: {author.birthYear}</Typography>
                  {author.bio && (
                    <Typography variant="body2" sx={{ mt: 1 }} noWrap>{author.bio}</Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton color="error" onClick={(e) => handleDelete(e, author.id)}>
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