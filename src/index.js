import pngInfo from './80x80~ac~.png';
import jpegInfo from './240x240~ac~.jpeg';

// info 结构如下
// {
//   base64: '',
//   color: '', // 所有像素 rgb 的平均值
//   width: '80px',
//   height: '80px',
// }

function generateImageNode(info) {
  const image = new Image();

  // 模拟网络延迟
  setTimeout(() => {
    image.src = info.base64;
  }, 1000)

  image.style.width = info.width;
  image.style.height = info.height;
  image.style.background = info.color;
  document.body.appendChild(image);
}

generateImageNode(jpegInfo);
generateImageNode(pngInfo);
