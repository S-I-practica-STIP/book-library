import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Typography, TextField, Button, MenuItem, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Author } from '../types/index';
import api from '../api/axios';

const schema = z.object({
  title: z.string().min(1, 'Назва не може бути порожньою'),
  authorId: z.number({ invalid_type_error: 'Оберіть автора' }).min(1, 'Оберіть автора'),
  year: z.number({ invalid_type_error: 'Введіть рік' })
    .min(1000, 'Рік виглядає некоректно')
    .max(new Date().getFullYear(), 'Рік не може бути в майбутньому'),
});

type FormData = z.infer<typeof schema>;

export default function AddBookPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    api.get('/authors').then(res => setAuthors(res.data));
  }, []);

  const onSubmit = (data: FormData) => {
    api.post('/books', data)
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      })
      .catch(() => setError('Не вдалось додати книгу'));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Додати книгу</Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>Книгу додано! Переходимо...</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Назва книги"
          fullWidth
          sx={{ mb: 2 }}
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          select
          label="Автор"
          fullWidth
          sx={{ mb: 2 }}
          defaultValue=""
          {...register('authorId', { valueAsNumber: true })}
          error={!!errors.authorId}
          helperText={errors.authorId?.message}
        >
          {authors.map(author => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Рік видання"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          {...register('year', { valueAsNumber: true })}
          error={!!errors.year}
          helperText={errors.year?.message}
        />
        <Button type="submit" variant="contained" fullWidth size="large">
          Додати книгу
        </Button>
      </Box>
    </Container>
  );
}