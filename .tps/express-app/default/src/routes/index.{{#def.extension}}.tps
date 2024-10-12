{{{? tps.answers.typescript}}}
import express, { Request, Response, NextFunction } from 'express';
{{{??}}}
import express from 'express';
{{{?}}}

const router = express.Router();

// Web route for the homepage
{{{? tps.answers.typescript}}}
router.get('/', (req: Request, res: Response) => {
{{{??}}}
router.get('/', (req, res) => {
{{{?}}}
	res.status(200).send('Home page');
});

export default router;
