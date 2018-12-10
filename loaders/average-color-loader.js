const {
  createCanvas,
  loadImage
} = require('canvas')

module.exports = function rawLoader(source) {
  // 加载图片
  return loadImage(this.resourcePath).then((image) => {
    const { width, height } = image;

    // canvas 处理
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 求 rgb 平均色值
    let count = 0;
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;

    ctx.drawImage(image, 0, 0, width, height);

    const canvasData = ctx.getImageData(0, 0, width, height);

    for (let x = 0; x < canvasData.width; x++) {
      for (let y = 0; y < canvasData.height; y++) {
        const idx = (x + y * canvasData.width) * 4;
        const r = canvasData.data[idx];
        const g = canvasData.data[idx + 1];
        const b = canvasData.data[idx + 2];

        totalR += r;
        totalG += g;
        totalB += b;
        count += 1;
      }
    }

    // 计算平均值
    const averageR = parseInt(totalR / count);
    const averageG = parseInt(totalG / count);
    const averageB = parseInt(totalB / count);

    // canvas to buffer
    const buf = canvas.toBuffer();

    const result = {
      base64: `data:image/png;base64,${buf.toString('base64')}`,
      color: `rgba(${averageR}, ${averageG}, ${averageB}, 255)`,
      width: `${width}px`,
      height: `${height}px`,
    }

    return `module.exports = ${JSON.stringify(result)}`;
  }).catch((e) => {
    console.log('加载图片失败:', e);
    throw new Error(e);
    // TODO: loader 如何抛出错误。
  });
};