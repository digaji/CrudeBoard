export class User {
    id: string | undefined = undefined;
    email: string | undefined = undefined;
    password: string | undefined = undefined;
    organization: string | undefined = undefined;
    authorization: string | undefined = undefined;

    toString() : string {
        return `User(username=${this.email}, password=${this.password})`;
    }
}