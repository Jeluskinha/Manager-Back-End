import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  const { name, email, accessLevel } = req.body;

  const newUser = await userCreateService({ name, email, accessLevel });

  return res.status(201).send(newUser);
};

export default userCreateController;
