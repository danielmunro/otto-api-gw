import express from 'express';
import proxy from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const targets = {
  communityService: `http://${process.env.TARGET_COMMUNITY_SERVICE}`,
  userService: `http://${process.env.TARGET_USER_SERVICE}`,
  imageService: `http://${process.env.TARGET_IMAGE_SERVICE}`,
};

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

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
