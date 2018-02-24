class Pool {
  constructor () {
    if (!window.loadPool) {
      window.loadPool = []
    }
  }

  pushPool (image) {
    if (!this.getPool(image.src)) {
      window.loadPool.push(image)
    }
  }

  getPool (src) {
    for (let item of window.loadPool) {
      if (item.src === src) return item
    }

    return undefined
  }

  abortAll () {
    window.loadPool.forEach((item) => {
      item.src = ''
    })
  }

  remove (image) {
    window.loadPool = window.loadPool.filter((item) => {
      return item.src !== image.src
    })
  }
}

let pool = new Pool()
/**
 * load image baseon browser cache
 * @param {string} url image url
 */
export default function (url) {
  let image = new Image()
  image.src = url
  pool.pushPool(image)

  return new Promise((resolve, reject) => {
    pool.remove(image)

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

export {
  Pool
}
