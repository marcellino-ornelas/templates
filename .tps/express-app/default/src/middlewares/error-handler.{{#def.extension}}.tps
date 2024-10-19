{{{? tps.answers.typescript}}}
import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from 'http-errors';

{{{?}}}
// 404 handler
{{{? tps.answers.typescript}}}
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
{{{??}}}
export const notFoundHandler = (req, res, next) => {
{{{?}}}
	res.status(404).json({ error: 'Route not found' });
};

// Global error handler
{{{? tps.answers.typescript}}}
export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
{{{??}}}
export const errorHandler = (err, req, res, next) => {
{{{?}}}
	res.status(err.status || 500).json({
		error: err.message || 'Internal Server Error',
	});
};
