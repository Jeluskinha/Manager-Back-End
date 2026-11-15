interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserCreate {
  name: string;
  email: string;
  accessLevel:string
}

export { IUser, IUserCreate}