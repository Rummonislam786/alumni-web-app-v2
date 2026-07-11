import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '16bd190326bf3a8941f49ed0db0a6c58';

export class JWTMiddleware {
  public static verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    console.log('header header:', req.headers);
    console.log('Authorization header:', authHeader);
    const bearerToken =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7).trim()
        : typeof authHeader === 'string'
          ? authHeader.trim()
          : undefined;
    console.log('Extracted token:', bearerToken);
    const token = bearerToken || req.query?.token || req.body?.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jsonwebtoken.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
}
