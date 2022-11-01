import { Author } from "./author";
import { Topic } from "./topic";
import { User } from "./user";

export class Publication {
    public author: Author;
    public publicationId!: string;
    public title!: string
    public storagePath!: string
    public description!: string
    public isPublic!: string
    public publicationType!: string
    public publishedAt?: Date;
    public updatedAt?: Date;
    public topics?: Topic[]
    public tags!: string

    constructor() {
        this.author = new Author()
    }

}