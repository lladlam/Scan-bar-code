import { findProduct } from './router';

window.doSearch = () => {
  const code = document.getElementById('barcodeInput').value;
  const data = findProduct(code);
  const infoBox = document.getElementById('info');

  if (data) {
    infoBox.innerHTML = `
      <div style="border:1px solid #ccc; padding:20px; border-radius:10px;">
        <img src="./img/maidong.jpg" style="width:100px;">
        <h2>${data.title}</h2>
        <p>价格：${data.price}</p>
        <p>描述：${data.description}</p>
      </div>
    `;
  } else {
    alert('未找到该条码对应的文件');
  }
};