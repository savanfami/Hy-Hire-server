import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';

interface jwtPayload{
    payload:string
}

    

declare global {
    namespace Express {
        interface Request {
            userData?: string;
        }
    }
}

export const jwtForgetPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token=req.body.token
    if (!token) {
        res.status(401).json({ message: 'no token found' });
        return;
    }

    try {
        const secretKey = process.env.FORGOT_PASSWORD_SECRET;
        if (!secretKey) {
            throw new Error('FORGOT_PASSWORD_SECRET is not defined');
        }
        const decoded = jwt.verify(token, secretKey) as jwtPayload
        req.userData = decoded.payload; 
        next();  
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(403).json({ message: 'Password reset link has expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).json({ message: 'Invalid password reset link' });
        } else {
            res.status(500).json({ message: 'An error occurred while verifying the reset link' });
        }
    }
}