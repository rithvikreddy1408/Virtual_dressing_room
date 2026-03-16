/**
 * Global Express error handler.
 * Must be registered AFTER all routes (app.use(errorHandler)).
 *
 * If any route calls next(err), this catches it and returns a clean JSON error.
 */
function errorHandler(err, req, res, next) {
    // Log the full error server-side for debugging
    console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';

    res.status(statusCode).json({
        success: false,
        error: message,
    });
}

module.exports = errorHandler;
