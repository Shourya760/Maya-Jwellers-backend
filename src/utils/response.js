export function successResponse(message, data = null, statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
    };
  }
  
  export function errorResponse(message, errors = null, statusCode = 400) {
    return {
      success: false,
      message,
      errors,
      statusCode,
    };
  }
  