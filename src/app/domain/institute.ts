import { User } from "./user";

export class Institute {
    public instituteId!: string;
    public name!: string;
    public country!: string;
    public users?: User[]
}