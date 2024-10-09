// tests/__mocks__/cats.service.ts
export class CatsService {
    static async getBreeds() {
        return [{ id: 'beng', name: 'Bengal' }];
    }

    static async getBreedById(breedId: string) {
        return { id: 'beng', name: 'Bengal' };
    }

    static async searchBreeds(query: string) {
        return [{ id: 'beng', name: 'Bengal' }];
    }
}
