import 'dotenv/config'; // Load environment variables
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import { errorHandler } from './middlewares/errorHandler.js';
{{{? tps.answers.routing === "api" }}}
import apiRouter from './api/index.js';
{{{?}}}

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
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// === Routes ===

{{{? tps.answers.routing === "api" }}}
app.use('/api', indexRouter);
{{{?}}}

app.get('/', (req, res) => {
	res.send('hey');
});

// === Error Handling ===

// Handle 404 errors
app.use(notFoundHandler);

// Global error handling
app.use(errorHandler);

// === Start the server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;
