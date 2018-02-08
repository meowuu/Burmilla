/**
 * load image baseon browser cache
 * @param {string} url image url
 */
export default function (url) {
  let image = new Image()
  image.src = url

  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve({
        url,
        width: image.naturalWidth,
        height: image.naturalHeight
      })
    }

    image.onerror = (e) => {
      reject(e)
    }
  })
}
