export class Board {
    color: string | null = null;
    priority: string | null = null;
    content: string | null = null;

    toString(): string {
        return `Board(color=${this.color}, priority=${this.priority}, content=${this.content})`;
    }
}