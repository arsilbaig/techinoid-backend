const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');

app.get('/download/:id/', async (req, res) => {


  await db.jobApply.findOne(
    { where: { id: req.params.id } }
    ).then(function(data){
      console.log(data);
      const file = `${__dirname}/controllers/uploads/`+ data.resume;
      res.download(file);
    });
  
});




app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');
const contactRoutes = require('./routes/contactRoutes');
const jobApplyRoutes = require('./routes/jobApplyRoutes');
const connectRoutes = require('./routes/connectRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/', authRoutes);
app.use('/', blogRoutes);
app.use('/', portfolioRoutes);
app.use('/', jobPostRoutes);
app.use('/', contactRoutes);
app.use('/', jobApplyRoutes);
app.use('/', connectRoutes);
app.use('/', dashboardRoutes);

db.sequelize.sync().then(() => {
  const port =  3050;
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
