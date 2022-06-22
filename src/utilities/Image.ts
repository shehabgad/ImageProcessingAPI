import fs2 from 'fs';
import path from 'path';
import sharp from 'sharp';

const imageExists = async (
  directory: string,
  fileName: string
): Promise<boolean> => {
  const location = path.resolve('assets', `${directory}/${fileName}.jpg`);
  if (fs2.existsSync(location))
    return true;
  else return false;
};
const resizeImageAndSave = async (
  fileName: string,
  widthStr: string,
  heightStr: string
): Promise<[boolean, string]> => {
  try {
    const width = +widthStr;
    const height = +heightStr;
    const location = path.resolve('assets', `images/${fileName}.jpg`);
    const image = await sharp(location);
    const resizedImage = await image.resize(width, height);
    const location2 = path.resolve(
      'assets',
      `cachedImages/${fileName}_${width}_${height}.jpg`
    );
    await resizedImage.toFile(location2);
    return [true, 'success'];
  } catch (err) {
    const errStr = (err as Error).message;
    return [false, errStr];
  }
};
export default {
  imageExists,
  resizeImageAndSave,
};
