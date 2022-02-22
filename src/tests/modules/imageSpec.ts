import { promises as fspromises } from "fs"
import Image from "../../modules/image"
import sharp from "sharp"
import { dirExists, createbDir } from "../../modules/directory"
import path from "path"
// How are you i hope you are finne,
// i'm useing macOs OP so my file system
describe("Image Instance :  ", () => {
  // eslint-disable-next-line no-constant-condition
  const slash = (process.platform as string) == "darwin" ? "/" : "\\"
  const img: Image = new Image("fjord", 40, 40)

  it("should return orginal image's path in (full) directory.", () => {
    const originPath = img.originPath()
    expect(originPath).toBe(
      path.join(__dirname, "..", "..", "..", "public", "full", "fjord.jpg")
    )
  })

  it("should create resized image name as imageName40x40.jpg.", () => {
    const cachePath = img.cachePath().split(slash).splice(-1).join("")
    expect(cachePath).toBe("fjord40x40.jpg")
  })

  it("should  not find resaized image.", async () => {
    const imgExistece = await img.cached()
    expect(imgExistece).toBeFalse()
  })

  fit("should resize and save the image.", async () => {
    // For the code reviwer :
    // I was sepeating the logic into two modules.
    //  1- Image -> responsable for resize,save and hold Image data.
    //  2- Directory -> responsable for check and create image's holder folder.
    // In my case i was testing code as units so this test assume that there is arleady thumb folder
    // I think this is the reason why this test worked on my device but failed in yours.
    // i'm will change the test to check folder first i think it's a bad idea becuase this test
    // should be about only img.resize()
    // I hope you if i'm doing anything wrong to tell me what is the rght way to do it oe even the better way
    //, thankyou...
    try {
      if (!(await dirExists(Image.cacheDir))) await createbDir(Image.cacheDir)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
    const resizedImagePath = await img.resize()
    const resizedImage = await sharp(resizedImagePath).metadata()
    expect(resizedImage.width == 40 && resizedImage.height == 40).toBeTrue()
  })

  fit("should find resized image.", async () => {
    const imgExistece = await img.cached()
    expect(imgExistece).toBeTrue()
  })

  afterAll(async () => {
    await fspromises.rm(img.cachePath())
  })
})
