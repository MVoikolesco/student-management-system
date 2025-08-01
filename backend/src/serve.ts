import app from './app';

const port = parseInt(process.env.PORT || '3000', 10);

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em 0.0.0.0:${port}`);
});
