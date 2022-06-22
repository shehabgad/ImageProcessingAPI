import express from 'express';
const images = express.Router();

const validReq = (req: express.Request, res: express.Response, next: Function): void => {

  next()
}

images.get('/', (req, res) => {

  res.send('images Working');
});

export default images;
