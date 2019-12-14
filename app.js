import express from 'express';
import proxy from 'http-proxy-middleware';

const app = express();

// app.use('/user/:uuid/suggested-follows', proxy({ target: 'localhost:8081' }));
app.use('/session', proxy({ target: 'http://localhost:8080' }));
app.listen(3000);
