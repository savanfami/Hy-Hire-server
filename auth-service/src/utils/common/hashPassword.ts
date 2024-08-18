import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await genSalt(10); 

        const hashedPassword = await hash(password, salt);

        return hashedPassword;
    } catch (error) {
        throw new Error('Error occurred while hashing password');
    }
};