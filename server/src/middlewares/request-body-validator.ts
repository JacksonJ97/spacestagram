import { z, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

function validateRequestBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: z.flattenError(result.error),
        message: "Invalid request body",
      });
    }

    req.body = result.data;
    next();
  };
}

export default validateRequestBody;
