import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
