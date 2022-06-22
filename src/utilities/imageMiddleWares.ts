import express from 'express';
import path from 'path';
import Image from '../utilities/Image';
const validReq = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const fileName = req.query.fileName as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  if (fileName === undefined || width === undefined || height === undefined) {
    res
      .status(400)
      .send(
        'please provide the required queries in this form fileName, width, height'
      );
    return;
  } else if (fileName === '' || width === '' || height === '') {
    res.status(400).send('dont send empty paramters');
    return;
  }
  try {
    parseInt(width);
    parseInt(height);
  } catch (err) {
    res.status(400).send('height and width must be numbers');
    return;
  }
  next();
};
const imageExist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const fileName = req.query.fileName as string;
  const result = await Image.imageExists('images', fileName);
  if (result == false) {
    res.status(404).send('image not found');
    return;
  }
  next();
};

const cachedImageExist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const fileName = req.query.fileName as string;
  const width = req.query.width;
  const height = req.query.height;
  const result = await Image.imageExists(
    'cachedImages',
    `${fileName}_${width}_${height}`
  );
  if (result == true) {
    const location = path.resolve(
      'assets',
      `cachedImages/${fileName}_${width}_${height}.jpg`
    );
    res.status(200).sendFile(location);
    return;
  }
  next();
};

const imageMiddleWare = [validReq, imageExist, cachedImageExist];

export default imageMiddleWare;
