import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    _id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('inside the jwt middleware');
    const token = req.cookies.access_token || (req.headers.authorization?.split(' ')[1] || '');
    
    if (!token) {
        res.status(401).json({ message: 'no token found' });
        return;
    }

    try {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }

        const decoded = jwt.verify(token, secretKey) as UserPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'failed to authenticate token' });
    }
};