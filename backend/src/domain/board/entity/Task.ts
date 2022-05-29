export class Task {
    id: string | undefined = undefined;
    content: string | undefined = undefined;

    toString() : string {
        return `Task(color=${this.content})`;
    }
}