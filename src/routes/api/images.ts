import express from 'express';
import imageMiddleware from '../../utilities/imageMiddleWares';
import Image from '../../utilities/Image';
import path from 'path';
const images = express.Router();

images.get(
  '/',
  imageMiddleware,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const fileName = req.query.fileName as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const result = await Image.resizeImageAndSave(fileName, width, height);
    if (result[0] == true) {
      const location = path.resolve(
        'assets',
        `cachedImages/${fileName}_${width}_${height}.jpg`
      );
      res.status(200).sendFile(location);
    } else {
      res.status(400).send(result[1]);
    }
  }
);

export default images;
