import { promises as fspromises } from "fs";

export async function dirExists(path: string): Promise<boolean> {
  try {
    await fspromises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
}

export async function createbDir(path: string): Promise<void> {
  try {
    fspromises.mkdir(path);
  } catch (e) {
    throw new Error("could't create directory: " + path);
  }
}
