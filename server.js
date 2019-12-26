import express from 'express';
import proxy from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
app.use(cors());

const targets = {
  communityService: 'http://community_service:8081',
  userService: 'http://user_service:8080',
  imageService: 'http://image_service:8082',
};

// community service
app.use('/user/:uuid/suggested-follows', proxy({ target: targets.communityService }));
app.use('/user/:uuid/posts', proxy({ target: targets.communityService }));
app.use('/user/:uuid/new-posts', proxy({ target: targets.communityService }));
app.use('/user/:uuid/follow-posts', proxy({ target: targets.communityService }));
app.use('/user/:uuid/follows', proxy({ target: targets.communityService }));
app.use('/user/:uuid/suggested-follows', proxy({ target: targets.communityService }));
app.use('/post', proxy({ target: targets.communityService }));
app.use('/reply', proxy({ target: targets.communityService }));

// image service
app.use('/image', proxy({ target: targets.imageService }));
app.use('/image/:link', proxy({ target: targets.imageService }));
app.use('/album', proxy({ target: targets.imageService }));
app.use('/album/:link', proxy({ target: targets.imageService }));
app.use('/album/:link/image', proxy({ target: targets.imageService }));
app.use('/user/:uuid/image', proxy({ target: targets.imageService }));

// user service
app.use('/session', proxy({ target: targets.userService }));
app.use('/user', proxy({ target: targets.userService }));

app.listen(8000);
