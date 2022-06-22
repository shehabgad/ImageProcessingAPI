import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
describe('Testing endpoint responses', () => {
  it('visit endpoint api/images?fileName=santamonica&width=800&height=750 to resize this image', async () => {
    const response = await request.get(
      'api/images?fileName=santamonica&width=800&height=749'
    );
    expect(response.status).toBe(200);
  });
});
