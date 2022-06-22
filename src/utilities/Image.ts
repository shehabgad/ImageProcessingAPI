import { promises as fs } from 'fs'
import sharp from 'sharp';

let imageExists = async (directory: string, fileName: string): Promise<boolean> => {
  try {
    const myFile = await fs.readFile(`assets/${directory}/${fileName}.jpg`);
  }
  catch (err) {
    return false;
  }
  return true;
}
imageExists("images", "palmtunnel2")

let resizeImageAndSave = async (fileName: string, width: number, height: number): Promise<[boolean, string]> => {
  try {
    const image = await sharp(`assets/images/${fileName}.jpg`)
    const resizedImage = await image.resize({
      width: width,
      height: height

    })
    await resizedImage.toFile(`assets/cachedImages/${fileName}_${width}_${height}.jpg`)
    return [true, "success"]
  }
  catch (err) {
    const errStr = (err as Error).message
    return [false, errStr]
  }
}
resizeImageAndSave("santamonica", 520, 15).then((data) => console.log(data))
export default {
  imageExists,
  resizeImageAndSave
}