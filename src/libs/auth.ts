import { APIGatewayProxyEvent } from "aws-lambda"
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./constants";


export const authenticateUser = (event: Omit<APIGatewayProxyEvent, 'body'>): boolean => {
    const token = event.headers.Authorization;
    if (!token) return false;

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (err) {
        return false;
    }
} 