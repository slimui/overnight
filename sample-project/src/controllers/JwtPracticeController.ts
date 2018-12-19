/**
 * Example Controller for the Overnight web-framework.
 *
 * created by Sean Maxwell Aug 26, 2018
 */

import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'
import { jwt, jwtmiddleware, JwtHandler, SecureRequest }  from '@overnightjs/jwt'

import { Request, Response } from 'express'
import { cinfo, cerr }       from 'simple-color-print'
import { ParentController }  from './ParentController'

const jwtHander = new JwtHandler('secret', '10h')
const JWTMIDDLEWARE = jwtHander.getMiddleware()


@Controller('api/jwt')
export class JwtPracticeController extends ParentController
{
    @Get(':email')
    private getJwt(req: Request, res: Response): void
    {
        let dataToEncypt = {
            email: req.params.email
        }

        res.status(200).json({jwt: jwt(dataToEncypt)})
    }

    @Get('callProtectedRoute')
    @Middleware(jwtmiddleware)
    private callProtectedRoute(req: SecureRequest, res: Response): void
    {
        res.status(200).json({email: req.params.payload.email})
    }

    @Get(':fullname')
    private getJwtFromHandler(req: Request, res: Response): void
    {
        let dataToEncypt = {
            fullName: req.params.fullname
        }

        res.status(200).json({jwt: jwtHander.getJwt(dataToEncypt)})
    }

    @Get('callProtectedRouteFromHandler')
    @Middleware([JWTMIDDLEWARE])
    private callProtectedRouteFromHandler(req: SecureRequest, res: Response): void
    {
        res.status(200).json({fullname: req.params.payload.fullName})
    }
}