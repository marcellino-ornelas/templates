import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import createError from 'http-errors';
{{{? tps.answers.api }}}
import apiRouter from './api/index.js';
{{{?}}}
import { IS_DEV } from './config/constrants.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
import router from './routes/index.js';

const app = express();

// === Middlewares ===

// Security headers with Helmet
app.use(helmet());

// CORS setup
app.use(
	cors({
		origin: process.env.CLIENT_URL || '*',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	}),
);

// Gzip compression
app.use(compression());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// HTTP request logger for development
if ( IS_DEV ) {
	app.use(morgan('dev'));
}

// === Routes ===

app.use('/', router);

{{{? tps.answers.api }}}
app.use('/api', apiRouter);

{{{?}}}
// === Error Handling ===

// Handle 404 errors
app.use(notFoundHandler);

// Global error handling
app.use(errorHandler);

export default app;
