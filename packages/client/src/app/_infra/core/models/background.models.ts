export class BackgroundPosition {
  posX: string;
  posY: string;
  size: string;

  constructor() {
    this.posX = `${this.getRandomInt(0, 150)}%`;
    this.posY = `${this.getRandomInt(0, 150)}%`;
    this.size = `${this.getRandomInt(50, 150)}%`;
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
