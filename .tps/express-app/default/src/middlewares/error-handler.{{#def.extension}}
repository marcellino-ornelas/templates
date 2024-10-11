// 404 handler
export const notFoundHandler = (req, res, next) => {
	res.status(404).json({ error: 'Route not found' });
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		error: err.message || 'Internal Server Error',
	});
};
