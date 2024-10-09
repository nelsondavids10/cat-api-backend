// tests/__mocks__/images.service.ts
export class ImagesService {
    static async getImagesByBreedId(breedId: string) {
      return [
        { id: 'image1', url: 'https://cdn2.thecatapi.com/images/image1.jpg' },
      ];
    }
  }
  