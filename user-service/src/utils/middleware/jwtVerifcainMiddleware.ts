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

export const jwtMiddleware = (requiredRole?:string)=>{
return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('inside the jwt middleware');
    const token = req.cookies.access_token || (req.headers.authorization?.split(' ')[1] || '');
    // console.log(token,'token verification for user service')
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
        if (requiredRole && req.user.role !== requiredRole) {
            res.status(403).json({ message: 'Access denied' });
            return
        }
        next();
    } catch (error) {
        res.status(403).json({ message: 'failed to authenticate token' });
    }
}
}