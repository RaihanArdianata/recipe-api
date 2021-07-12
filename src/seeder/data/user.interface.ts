import { Role } from "src/utils/enums/role.enum";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role
}