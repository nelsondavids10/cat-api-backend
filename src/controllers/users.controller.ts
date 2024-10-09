import { Request, Response } from 'express';
import UserService from '../services/user.service';

export class UsersController {
    static async login(req: Request, res: Response) {
        const { username, password } = req.body;        
        try {
            const user = await UserService.validateUser(username, password);
            if (user) {
                res.json(user);
            } else {                
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } catch (error) {            
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }

    static async register(req: Request, res: Response) {
        const { name, identification, email, age, username, password } = req.body;
        try {
            const newUser = await UserService.createUser({
                name,
                identification,
                email,
                age,
                username,
                password,
            });
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof Error) {                                
                res.status(500).json({ message: `Error al registrar usuario: ` + error.message });                
            } else {
                res.status(500).json({ message: `Error al registrar usuario` });
            }            
        }
    }
}
