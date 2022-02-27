import express from 'express';
import proxy from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.enable('trust proxy');

const targets = {
  communityService: `http://${process.env.TARGET_COMMUNITY_SERVICE}`,
  userService: `http://${process.env.TARGET_USER_SERVICE}`,
  imageService: `http://${process.env.TARGET_IMAGE_SERVICE}`,
  ui: `http://${process.env.TARGET_UI}`,
};

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.hostname}${req.originalUrl}`);
    next();
});

// community service
app.use('/user/:username/suggested-follows', proxy({ target: targets.communityService }));
app.use('/user/:username/posts', proxy({ target: targets.communityService }));
app.use('/user/:username/like', proxy({ target: targets.communityService }));
app.use('/user/:username/new-posts', proxy({ target: targets.communityService }));
app.use('/user/:username/follow-posts', proxy({ target: targets.communityService }));
app.use('/user/:username/follows', proxy({ target: targets.communityService }));
app.use('/user/:username/followers', proxy({ target: targets.communityService }));
app.use('/user/:username/suggested-follows', proxy({ target: targets.communityService }));
app.use('/post/:uuid/like', proxy({ target: targets.communityService }));
app.use('/post/:uuid', proxy({ target: targets.communityService }));
app.use('/post', proxy({ target: targets.communityService }));
app.use('/share', proxy({ target: targets.communityService }));
app.use('/reply', proxy({ target: targets.communityService }));
app.use('/follow/:uuid', proxy({ target: targets.communityService }));

// image service
app.use('/image', proxy({ target: targets.imageService }));
app.use('/image/:uuid', proxy({ target: targets.imageService }));
app.use('/album', proxy({ target: targets.imageService }));
app.use('/album/:uuid', proxy({ target: targets.imageService }));
app.use('/album/:uuid/image', proxy({ target: targets.imageService }));
app.use('/user/:username/image', proxy({ target: targets.imageService }));
app.use('/user/:username/album', proxy({ target: targets.imageService }));

// user service
app.use('/session', proxy({ target: targets.userService }));
app.use('/user', proxy({ target: targets.userService }));

// ui
app.use('/', proxy({ target: targets.ui }));

app.listen(8000);
