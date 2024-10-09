import { Request, Response } from 'express';
import { ImagesController } from '../controllers/images.controller';
import fetch from 'node-fetch';

// Mocks la función fetch para las pruebas
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('ImagesController', () => {
    const mockRequest = (query = {}) => ({
        query,
    } as Request);

    const mockResponse = () => {
        const res: Partial<Response> = {};
        res.json = jest.fn().mockReturnValue(res);
        return res as Response;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería obtener imágenes por ID de raza', async () => {
        const res = mockResponse();
        const breedId = 'abc123';
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
            new Response(JSON.stringify([{ id: 'img1', url: 'http://example.com/cat.jpg' }])),
        );

        await ImagesController.getImagesByBreedId(mockRequest({ breed_id: breedId }), res);

        expect(res.json).toHaveBeenCalledWith([{ id: 'img1', url: 'http://example.com/cat.jpg' }]);
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
            headers: {
                'x-api-key': process.env.CAT_API_KEY || '',
            },
        });
    });
});
