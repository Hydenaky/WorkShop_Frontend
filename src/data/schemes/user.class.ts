export class User {
    constructor(
        public username: string,
        public password: string
    ){}

    fromJson(json: any): User {
        return new User(
            json.username,
            json.password
        )
    }

    toJson(): any{
        return {
            username: this.username,
            password: this.password
        }
    }
}