import { promises as fspromises } from "fs";
import path from "path";
import sharp from "sharp";
import { dirExists } from "./directory";
class Image {
  private _name: string;
  private _width: number;
  private _height: number;

  private _cacheName: string;
  private _extintion = ".jpg";

  static readonly mainDir: string = path.join(__dirname, "..", "..", "public");
  static readonly originDir: string = path.join(Image.mainDir, "full");
  static readonly cacheDir: string = path.join(Image.mainDir, "thumb");

  constructor(name: string, width: number, height: number) {
    this._width = width;
    this._height = height;
    this._name = name.toLowerCase();

    this._cacheName = `${this._name}${this._width}x${this._height}`;
  }

  originPath(): string {
    // return orginal Image full path with image extintion.
    return path.join(Image.originDir, this._name + this._extintion);
  }

  cachePath(): string {
    // return cahed (target) Image full path with image extintion.
    return path.join(Image.cacheDir, this._cacheName + this._extintion);
  }

  async cached(): Promise<boolean> {
    // takes originPath() or cachePath() as parameter.
    try {
      await fspromises.access(this.cachePath());
      return true;
    } catch (e) {
      return false;
    }
  }

  async resize(): Promise<string> {
    // resize and save image in cachePath().
    const orginalImgExists = await dirExists(this.originPath());
    if (!orginalImgExists)
      throw new Error(`Iamge ${this._name} dose not exists.`);

    try {
      const img = sharp(this.originPath()).resize({
        width: this._width,
        height: this._height,
      });
      await img.toFile(this.cachePath());
      return this.cachePath();
    } catch (e) {
      throw new Error(
        `An error occurred could't resize the iamge ${this._name}.`
      );
    }
  }
}

export default Image;
