const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/routes')

dotenv.config();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:5000`));
  })
  .catch(err => console.error(err));
