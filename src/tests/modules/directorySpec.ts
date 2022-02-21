import path from "path";
import { createbDir, dirExists } from "../../modules/directory";
import { promises as fspromises } from "fs";

describe("Directory Module", () => {
  const publicDirPath = path.resolve("public");
  describe("dirExists: Function", () => {
    it("should return true for exits directory.", async () => {
      expect(await dirExists(publicDirPath)).toBeTrue();
    });
    it("should return false for unexits directory.", async () => {
      const path = publicDirPath + "unreal";
      expect(await dirExists(path)).toBeFalse();
    });
  });

  describe("createbDir: Function", () => {
    const dirPath = path.join(publicDirPath, "testDir");
    it("should crate directory at given path.", async () => {
      let dirExistnce: boolean;
      await createbDir(dirPath);
      try {
        await fspromises.access(dirPath);
        dirExistnce = true;
      } catch (e) {
        dirExistnce = false;
      }
      expect(dirExistnce).toBeTrue();
    });

    afterAll(async () => {
      await fspromises.rmdir(dirPath);
    });
  });
});
