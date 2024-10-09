import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';

class UserService {
    // Obtener todos los usuarios
    public async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find();
    }

    public async getUserById(userId: string): Promise<IUser | null> {
        return await UserModel.findById(userId);
    }

    public async createUser(userData: Partial<IUser>): Promise<IUser> {
        if (!userData.password) {
            throw new Error('La contraseña es obligatoria');
        }
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new UserModel({
            ...userData,
            password: hashedPassword, 
        });
        try {
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(userId, userData, { new: true });
    }

    public async deleteUser(userId: string): Promise<IUser | null> {
        return await UserModel.findByIdAndDelete(userId);
    }

    public async findUserByUsername(username: string): Promise<IUser | null> {
        return await UserModel.findOne({ username });
    }

    public async validateUser(username: string, password: string): Promise<IUser | null> {
        const user = await this.findUserByUsername(username);
        if (user && (await user.comparePassword(password))) {
            return user;
        }
        return null;
    }
}

export default new UserService();
