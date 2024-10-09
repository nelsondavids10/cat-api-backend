import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('UserService', () => {
    it('debería crear un nuevo usuario', async () => {
        const userData = {
            name: 'Nelson David Santacruz',
            identification: '1085283453',
            email: 'nelsondavids10@gmail.com',
            age: 30,            
            username: 'nelsondavids10',
            password: '123456',
        };

        const newUser = await UserService.createUser(userData);
        const userInDb = await UserModel.findById(newUser._id);

        expect(userInDb).toBeTruthy();
        expect(userInDb?.name).toBe(userData.name);
    });

    it('debería validar un usuario existente con la contraseña correcta', async () => {
        const username = 'nelsondavids10';
        const password = '123456';

        const user = await UserService.validateUser(username, password);
        expect(user).toBeTruthy();
        expect(user?.username).toBe(username);
    });

    it('no debería validar un usuario con la contraseña incorrecta', async () => {
        const username = 'nelsondavids10';
        const password = '010101';

        const user = await UserService.validateUser(username, password);
        expect(user).toBeNull();
    });
});
