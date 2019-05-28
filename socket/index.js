const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'/src')));

app.listen(8124, () => console.log('listening'));