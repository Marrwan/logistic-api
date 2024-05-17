import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken";
import { UnauthorizedError, ValidationError } from "./error/error.middleware";
import { decodeAccessToken } from "../utils/tokens.utils";

export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.header("authorization")
        token = token?.split(" ")[1]

        // Check if a token is present in the request
        if (!token) {
            throw new UnauthorizedError('Unauthorized: No token provided');
        }

        // Verify the token
        let decoded = await decodeAccessToken(token);


        if (!decoded) {
            throw new UnauthorizedError('Unauthorized: Please Login');
        }



        // If the token is valid, add the decoded user data to the request for further use
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error)
    }

}