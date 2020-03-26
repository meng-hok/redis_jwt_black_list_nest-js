import { Injectable, NestMiddleware, Request , Session } from '@nestjs/common';
import {  Response } from 'express';
import { createClient } from 'redis';
import { request } from 'http';

@Injectable()
export class JWTBlacklistTokenPrevention implements NestMiddleware {
  use(@Request() req , res: Response, next: Function) {
    console.log('Request...');
   
    try{
        const token = req.headers.authorization;
       
        if(req.session.user == undefined){
          
        
            res.json({
                description : "Cannot Directly Access Endpoint Without Login",
                status : "FAIL"
            })
        }
      
    
        const client = createClient();  
        
        client.get(token,(err,reply)=> {
           
            if(reply!=null){
                res.json({
                    description : "Token invalid",
                    status : "FAIL"
                })
            }
         
        })
        /***
         * next() can not be called in callback function middle excute outside of callback function
         */
         next();
    }catch(err){
        console.log(err)
        next();
    }
  }
}
