import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createClient } from 'redis';

@Injectable()
export class JWTBlacklistTokenPrevention implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    try{
        const token = req.headers.authorization;
    
        const client = createClient();  
        
        client.get(token,(err,reply)=> {
           
            if(reply!=null){
                res.json({
                    description : "Token invalid",
                    status : "FAIL"
                })
            }
            next();
        })
    }catch(err){
        next();
    }
  }
}
