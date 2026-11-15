import { VancourosDataSource } from "../../database/data-source-main";
import { User } from "../../entities/main_database/user.entity";
import { IUserCreate } from "../../interfaces/main_database/users";
import { AppError } from "../../errors/appError";
 
const userCreateService = async ({name, email, accessLevel} : IUserCreate) => {
  const userRepository = VancourosDataSource.getRepository(User)
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