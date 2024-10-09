import { Request, Response } from 'express';
import { CatsController } from '../controllers/cats.controller';
import fetch from 'node-fetch';

// Mocks la función fetch para las pruebas
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('CatsController', () => {
    const mockRequest = (params = {}, query = {}) => ({
        params,
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

    it('debería obtener todas las razas de gatos', async () => {
        const res = mockResponse();
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
            new Response(JSON.stringify([{ name: 'Persian' }, { name: 'Siamese' }])),
        );

        await CatsController.getBreeds(mockRequest(), res);

        expect(res.json).toHaveBeenCalledWith([{ name: 'Persian' }, { name: 'Siamese' }]);
        expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/breeds', {
            headers: {
                'x-api-key': process.env.CAT_API_KEY || '',
            },
        });
    });

    it('debería obtener una raza de gato por ID', async () => {
        const res = mockResponse();
        const breedId = 'abc123';
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
            new Response(JSON.stringify({ id: breedId, name: 'Persian' })),
        );

        await CatsController.getBreedById(mockRequest({ breed_id: breedId }), res);

        expect(res.json).toHaveBeenCalledWith({ id: breedId, name: 'Persian' });
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/breeds/${breedId}`, {
            headers: {
                'x-api-key': process.env.CAT_API_KEY || '',
            },
        });
    });

    it('debería buscar razas de gatos', async () => {
        const res = mockResponse();
        const query = 'q=air';
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
            new Response(JSON.stringify([{ name: 'q=air' }])),
        );

        await CatsController.searchBreeds(mockRequest({ q: query }), res);

        expect(res.json).toHaveBeenCalledWith([{ name: 'q=air' }]);
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/breeds/search?${query}`, {
            headers: {
                'x-api-key': process.env.CAT_API_KEY || '',
            },
        });
    });
});
