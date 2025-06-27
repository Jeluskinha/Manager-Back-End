import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/user";
import { AppError } from "../../errors/appError";
 
const userCreateService = async ({name, email, accessLevel} : IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find()

  const emailAlreadyExists = users.find (user => user.email === email)

  if (emailAlreadyExists) {
    throw new AppError("Email Already exists", 403)
  }

  const user = new User()
  user.name = name
  user.email = email
  user.accessLevel = accessLevel

  userRepository.create(user)
  await userRepository.save(user)

  return user
}

export default userCreateService