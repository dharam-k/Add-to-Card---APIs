import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

function verifyToken(req: Request, res: Response, next: NextFunction): any {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.email = decoded; 
    next();
  } catch (err) {
    res.status(403).send('Invalid token');
  }
}

export default verifyToken;
