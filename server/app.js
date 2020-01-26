import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import { port } from '../db/config/config';

// Initialize Express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes
app.use(router);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
