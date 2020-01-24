import express from 'express';
import router from './routes';

// Initialize Express
const app = express();

const PORT = process.env.PORT || 4000;

// Routes
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
