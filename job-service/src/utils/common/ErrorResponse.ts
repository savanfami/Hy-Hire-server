export class ErrorResponse extends Error {
    statusCode: number;
    message: string;

    constructor(status: number, msg: string) {
        super(msg)
        this.statusCode = status;
        this.message = msg;
    }


    static badRequest(msg: string): ErrorResponse {
        return new ErrorResponse(400, msg || "bad request")
    }
    static unauthorized(msg: string): ErrorResponse {
        return new ErrorResponse(401, msg || "Unauthorized");
    }

    static forbidden(msg: string): ErrorResponse {
        return new ErrorResponse(403, msg || "Forbidden");
    }

    static notFound(msg: string): ErrorResponse {
        return new ErrorResponse(404, msg || "Not Found");
    }
    static conflict(msg: string): ErrorResponse {
        return new ErrorResponse(409, msg || "Conflict");
    }

    static internalError(msg: string): ErrorResponse {
        return new ErrorResponse(500, msg || "internal Server Error");
    }

}