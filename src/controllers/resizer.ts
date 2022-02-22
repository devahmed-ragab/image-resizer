import express from "express"
import Image from "../modules/image"
import { createbDir, dirExists } from "../modules/directory"

// check check if target dir exist
// if not create it.
// check if image is there already.
// of not resizr it.
async function resizer(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const { name, width, height } = req.query
  const cacheDirExists = await dirExists(Image.cacheDir)
  const image = new Image(String(name), Number(width), Number(height))
  try {
    if (!cacheDirExists) {
      await createbDir(Image.cacheDir)
    }

    if (await image.cached()) {
      res.status(200).sendFile(image.cachePath())
    } else {
      const resizedImage = await image.resize()
      res.status(200).sendFile(resizedImage)
    }
  } catch (e) {
    const error = e as Error
    res.status(404).send(error.message)
  }
}

export = { resizer }
