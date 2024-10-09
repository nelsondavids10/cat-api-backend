import fetch from 'node-fetch';

export class CatsService {
  private static readonly API_URL = 'https://api.thecatapi.com/v1';
  private static readonly API_KEY = process.env.CAT_API_KEY || '';

  static async getBreeds(): Promise<any> {
    const response = await fetch(`${this.API_URL}/breeds`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener las razas de gatos');
    }
    return response.json();
  }

  static async getBreedById(breedId: string): Promise<any> {
    const response = await fetch(`${this.API_URL}/breeds/${breedId}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Error al obtener la raza con id ${breedId}`);
    }
    return response.json();
  }

  static async searchBreeds(query: string): Promise<any> {    
    const response = await fetch(`${this.API_URL}/breeds/search?${query}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Error al buscar razas con la consulta ${query}`);
    }
    return response.json();
  }
}
