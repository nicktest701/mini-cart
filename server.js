const express = require('express');
const path = require('path');
const productRoute = require('./routes/productRoute');
const supplierRoute = require('./routes/supplierRoute');
const customerRoute = require('./routes/customerRoute');
const cartRoute = require('./routes/cartRoute');
const userRoute = require('./routes/userRoute');

const cors = require('cors');

///
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(express.static(path.resolve(__dirname, 'public')));

//routes
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/supplier', supplierRoute);
app.use('/customer', customerRoute);
app.use('/cart', cartRoute);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//error handlers
app.use((req, res, next) => {
  next(new Error('Not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(port, () => console.log(`app listening on port ${port}!`));
