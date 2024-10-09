import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Interfaz para el usuario
export interface IUser extends Document {
    name: string;
    identification: string;
    email: string;
    age: number;    
    username: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definición del esquema de usuario
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    identification: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },    
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password); 
};

// Exportamos el modelo
const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
