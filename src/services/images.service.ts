import fetch from 'node-fetch';

export class ImagesService {
  static async getImagesByBreedId(breedId: string) {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
        headers: {
          'x-api-key': process.env.CAT_API_KEY || ''
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
