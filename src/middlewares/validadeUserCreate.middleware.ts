import { Request, Response, NextFunction } from "express";

import { IUserCreate } from "../interfaces/users";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().default(true),
});

export const validateUserCreate =
  (schema: SchemaOf<IUserCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validatedData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
