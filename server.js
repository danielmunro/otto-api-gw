import express from 'express';
import proxy from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
app.use(cors());

const targets = {
  communityService: 'http://localhost:8081',
  userService: 'http://localhost:8080'
};

app.use('/user/:uuid/suggested-follows', proxy({ target: targets.communityService }));
app.use('/user/:uuid/posts', proxy({ target: targets.communityService }));
app.use('/user/:uuid/follow-posts', proxy({ target: targets.communityService }));
app.use('/user/:uuid/follows', proxy({ target: targets.communityService }));
app.use('/user/:uuid/suggested-follows', proxy({ target: targets.communityService }));
app.use('/post', proxy({ target: targets.communityService }));
app.use('/reply', proxy({ target: targets.communityService }));

app.use('/session', proxy({ target: targets.userService }));
app.use('/user', proxy({ target: targets.userService }));

app.listen(8000);
