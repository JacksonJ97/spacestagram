import { z, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequestBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log("errors: ", result.error.issues);
      return res.status(400).json({
        errors: z.flattenError(result.error),
        message: "Invalid request body",
      });
    }

    req.body = result.data;
    next();
  };
