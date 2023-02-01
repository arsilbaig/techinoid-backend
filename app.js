const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');

app.use(bodyParser.text({ limit: '16mb' }))
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
app.use('/', authRoutes);
app.use('/', blogRoutes);
app.use('/', portfolioRoutes);


db.sequelize.sync().then(() => {
  const port =  3001;
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
