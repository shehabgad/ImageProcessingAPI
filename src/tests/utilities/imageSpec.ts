import Image from '../../utilities/Image';

describe('Image utility functions test', () => {
  it('image exists in images directory', async () => {
    const result = await Image.imageExists('images', 'santamonica');

    expect(result).toBeTruthy();
  });
  it('resized image exists in cachedImages directory', async () => {
    const result = await Image.imageExists(
      'cachedImages',
      'santamonica_800_750'
    );

    expect(result).toBeTruthy();
  });
  it('resize image then return true if image is resized and saved successfully', async () => {
    const result = await Image.resizeImageAndSave('santamonica', '900', '800');
    expect(result).toBeTruthy();
  });
});
