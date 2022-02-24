const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const http = require('http');
const express = require('express');
const index = require('./src/routers/index');

const app = express();

// compressing api response
app.use(compression());

// logger
app.use(morgan('dev'));

// cors enable
app.options('*', cors());
app.use(cors({ origin: 'http://localhost:5000' }));

// security config
app.use(helmet());

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connection with client setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// all the api routers
app.use('/api', index);

// port initialized
const PORT = process.env.PORT || 5000;

// index setup
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
