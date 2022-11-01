import { Institute } from "./institute"
import { Publication } from "./publication"
import { Topic } from "./topic"

export class User {
    public username!: string
    public firstName!: string
    public lastName!: string
    public email!: string
    public dob?: Date
    public profileImageUrl!: string;
    public joinDate?: Date;
    public lastLoginDate?: Date;
    public lastLoginDateDisplay!: string;
    public institute?: Institute;
    public topics?: Topic[];
    public publications?: Publication[];
}
