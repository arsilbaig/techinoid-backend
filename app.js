const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');

app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
app.use('/', authRoutes);
app.use('/', blogRoutes);
app.use('/', portfolioRoutes);


db.sequelize.sync().then(() => {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
