import {User} from "../../entities/main_database/user.entity"
import { VancourosDataSource } from "../../database/data-source-main";

const userListService = async () => {
  const userRepository = VancourosDataSource.getRepository(User)

  const users = userRepository.find();

  return users
}

export default userListService;