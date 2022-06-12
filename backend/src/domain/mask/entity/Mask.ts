export class Mask {
    isMasked: boolean | undefined = undefined;
    time: number | undefined = undefined;

    toString() : string {
        return `Mask(isMasked=${this.isMasked}, time=${this.time})`;
    }
}