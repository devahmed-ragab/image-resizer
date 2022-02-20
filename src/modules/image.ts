import { promises as fspromises } from "fs";
import path from "path";
import sharp from "sharp";

class Image {
  private _name: string;
  private _width: number;
  private _height: number;

  private _cacheName: string;
  private _extintion = ".jpg";

  static mainDir: string = path.resolve("public");
  static originDir: string = path.join(Image.mainDir, "full");
  static cacheDir: string = path.join(Image.mainDir, "thumb");

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

  async existIn(path: string): Promise<boolean> {
    // takes originPath() or cachePath() as parameter.
    try {
      await fspromises.access(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  async resize(): Promise<string> {
    // resize and save image in cachePath().
    try {
      const img = sharp(this.originPath());
      img.resize({
        width: this._width,
        height: this._height,
      });
      await img.toFile(this.cachePath());
      return this.cachePath();
    } catch (e) {
      throw new Error("An error occurred coulde't resize or save the image.");
    }
  }
}

export default Image;
