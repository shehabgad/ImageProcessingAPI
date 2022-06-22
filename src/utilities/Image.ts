import { promises as fs } from 'fs'
import path from 'path';
import sharp from 'sharp';

let imageExists = async (directory: string, fileName: string): Promise<boolean> => {
  try {
    const location = path.resolve("assets", `${directory}/${fileName}.jpg`)
    const myFile = await fs.readFile(location);
  }
  catch (err) {
    return false;
  }
  return true;
}
let resizeImageAndSave = async (fileName: string, widthStr: string, heightStr: string): Promise<[boolean, string]> => {
  try {
    let width = +widthStr
    let height = +heightStr
    const location = path.resolve("assets", `images/${fileName}.jpg`)
    const image = await sharp(location)
    const resizedImage = await image.resize(width, height)
    const location2 = path.resolve("assets", `cachedImages/${fileName}_${width}_${height}.jpg`)
    await resizedImage.toFile(location2)
    return [true, "success"]
  }
  catch (err) {
    const errStr = (err as Error).message
    return [false, errStr]
  }
}
export default {
  imageExists,
  resizeImageAndSave,
}