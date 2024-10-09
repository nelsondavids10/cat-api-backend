import { Request, Response } from 'express';
import { CatsService } from '../services/cats.service';

export class CatsController {
  static async getBreeds(req: Request, res: Response) {
    try {
      const data = await CatsService.getBreeds();
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido al obtener las razas de gatos' });
      }
    }
  }

  static async getBreedById(req: Request, res: Response) {
    const breedId = req.params.breed_id;
    try {      
      const data = await CatsService.getBreedById(breedId);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: `Error desconocido al obtener la raza con id ${breedId}` });
      }
    }
  }

  static async searchBreeds(req: Request, res: Response) {        
    const query = req.params.q as string;
    try {      
      const data = await CatsService.searchBreeds(query);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: `Error desconocido al buscar razas con la consulta ${query}` });
      }
    }
  }
}
