{{{? tps.answers.typescript}}}
import express, { Request, Response, NextFunction } from 'express';
{{{??}}}
import express from 'express';
{{{?}}}
{{{? tps.answers.api}}}
import apiRouter from './api/index.js'
{{{?}}}

const router = express.Router();

{{{? tps.answers.api}}}
router.use('/api', apiRouter)

{{{?}}}
// Web route for the homepage
{{{? tps.answers.typescript}}}
router.get('/', (req: Request, res: Response) => {
{{{??}}}
router.get('/', (req, res) => {
{{{?}}}
	res.status(200).send('Home page');
});

export default router;
