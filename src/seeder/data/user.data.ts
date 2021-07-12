import { Role } from "src/utils/enums/role.enum";
import { encodePassword } from "src/utils/helpers/bcrypt";
import { IUser } from "./user.interface";
const faker = require('faker')

export const UserSeed: IUser[] = [
  { name: faker.name.findName(), email: faker.internet.email(), password: encodePassword("ini password"), role: Role.Admin },
  { name: faker.name.findName(), email: faker.internet.email(), password: encodePassword("ini password"), role: Role.User },
];