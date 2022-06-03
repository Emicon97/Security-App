import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access denied')
    const payload = jwt.verify(token,process.env.TOKEN_SECRET||'tokenPass') as IPayload
    req.userId = payload._id;
    next()
}