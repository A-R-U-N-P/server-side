export enum HttpStatusCode {
  OK = 200,
  ALREADY_REPORTED = 409,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNSUPPORTED_ACTION = 405,
  VALIDATION_FAILED = 422,
  SESSION_INVALID = 470,
  SERVER_ERROR = 500,
  CREATED = 201,
  INTERNAL_ERROR = 430,
}
export const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

function statusMessage(status: HttpStatusCode) {
  switch (status) {
    case HttpStatusCode.BAD_REQUEST:
      return '400 Bad Request';
    case HttpStatusCode.UNAUTHORIZED:
      return '401 Unauthorized';
    case HttpStatusCode.FORBIDDEN:
      return '403 Forbidden';
    case HttpStatusCode.NOT_FOUND:
      return '404 Non Found';
    case HttpStatusCode.UNSUPPORTED_ACTION:
      return '405 Unsupported Action';
    case HttpStatusCode.VALIDATION_FAILED:
      return '422 Validation Failed';
    case HttpStatusCode.SERVER_ERROR:
      return '500 Server Error';
    case HttpStatusCode.CREATED:
      return '201 Created';
    case HttpStatusCode.ALREADY_REPORTED:
      return '208 Already Exist';
    default:
      return '500 Server Error';
  }
}

function jsonResponse(res, body, option) {
  const options = option || {};
  options.status = options.status || HttpStatusCode.OK;
  res.status(options.status).json(body || null);
}

const Res = {
  ok(request, response, data) {
    jsonResponse(response, data, {
      status: HttpStatusCode.OK,
    });
  },

  badRequest(req, res, error, label?: string) {
    const errors = Array.isArray(error) ? error : [error];
    const body = {
      message: statusMessage(HttpStatusCode.BAD_REQUEST),
      errors,
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.BAD_REQUEST,
    });
  },

  unauthorized(req, res, msg?: any) {
    const body = {
      message: msg || statusMessage(HttpStatusCode.UNAUTHORIZED),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.UNAUTHORIZED,
    });
  },

  sessionInvalid(req, res) {
    const body = {
      message: statusMessage(HttpStatusCode.SESSION_INVALID),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.SESSION_INVALID,
    });
  },

  internalError(req, res) {
    const body = {
      message: statusMessage(HttpStatusCode.INTERNAL_ERROR),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.INTERNAL_ERROR,
    });
  },

  forbidden(req, res) {
    const body = {
      message: statusMessage(HttpStatusCode.FORBIDDEN),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.FORBIDDEN,
    });
  },

  notFound(req, res, msg?: any) {
    const body = {
      message: msg || statusMessage(HttpStatusCode.NOT_FOUND),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.NOT_FOUND,
    });
  },

  unsupportedAction(req, res) {
    const body = {
      message: statusMessage(HttpStatusCode.UNSUPPORTED_ACTION),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.UNSUPPORTED_ACTION,
    });
  },

  invalid(req, res, error) {
    const errors = Array.isArray(error) ? error : [error];
    const body = {
      message: statusMessage(HttpStatusCode.VALIDATION_FAILED),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.VALIDATION_FAILED,
    });
  },

  serverError(req, res, error) {
    if (error instanceof Error) {
      const errors = {
        message: error.message,
        stacktrace: error.stack,
      };
    }

    const body = {
      message: error.error_msg || statusMessage(HttpStatusCode.SERVER_ERROR),
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.SERVER_ERROR,
    });
  },

  alreadyExist(req, res, error, label?: string) {
    const errors = Array.isArray(error) ? error : [error];
    const body = {
      message: statusMessage(HttpStatusCode.ALREADY_REPORTED),
      errors,
    };

    jsonResponse(res, body, {
      status: HttpStatusCode.ALREADY_REPORTED,
    });
  },
};

export { Res };
