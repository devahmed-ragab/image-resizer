import Image from "../../modules/image";
import sharp from "sharp";

describe("Image Instance :  ", () => {
  // eslint-disable-next-line no-constant-condition
  const slash = (process.platform as string) == "darwin" ? "/" : "\\";
  const img: Image = new Image("fjord", 40, 40);

  it("should return orginal image's path in (full) directory.", () => {
    const originPath = img.originPath().split(slash).splice(-4).join(slash);
    expect(originPath).toBe("imageProcessingApi/public/full/fjord.jpg");
  });

  it("should create resized image name as imageName40x40.jpg.", () => {
    const cachePath = img.cachePath().split(slash).splice(-1).join("");
    expect(cachePath).toBe("fjord40x40.jpg");
  });

  xit("should  not find resaized image yet.", async () => {
    const imgExistece = await img.cached();
    expect(imgExistece).toBeFalse();
  });

  it("should resize and save the image.", async () => {
    const resizedImagePath = await img.resize();
    const resizedImage = await sharp(resizedImagePath).metadata();
    expect(resizedImage.width == 40 && resizedImage.height == 40).toBeTrue();
  });

  it("should find resized image.", async () => {
    const imgExistece = await img.cached();
    expect(imgExistece).toBeTrue();
  });
});
