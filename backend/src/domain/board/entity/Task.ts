export class Task {
    content: string | null = null;

    toString() : string {
        return `Task(color=${this.content})`;
    }
}