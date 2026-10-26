function notFound(req, res) {
  return res.status(404).json({
    success: false,
    error: {
      message: 'Not found'
    }
  });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let status = error.statusCode || error.status || 500;
  if (error.name === 'MulterError') {
    status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
  }
  if (!Number.isInteger(status) || status < 400 || status > 599) {
    status = 500;
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  const responseError = {
    message: status >= 500 ? 'Internal server error' : error.message
  };

  if (error.details !== undefined) {
    responseError.details = error.details;
  }
  if (isDevelopment && error.stack) {
    responseError.details = {
      ...(responseError.details && typeof responseError.details === 'object'
        ? responseError.details
        : {}),
      stack: error.stack
    };
  }

  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({
    success: false,
    error: responseError
  });
}

module.exports = { errorHandler, notFound };
