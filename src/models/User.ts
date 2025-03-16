import { UserRole } from "../enums/user-role";

export class User{
    constructor(
        public name : string,
        public email : string,
        public password : string,
        public role : UserRole
    ){}
}