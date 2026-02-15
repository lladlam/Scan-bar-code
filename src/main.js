import { getProductByBarcode } from './router';

/**
 * 扫码器配置
 */
let html5QrcodeScanner = null;

const initScanner = () => {
    if (!html5QrcodeScanner) {
        html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", 
            { 
                fps: 15, 
                qrbox: { width: 280, height: 160 },
                aspectRatio: 1.0 
            }
        );
    }
    html5QrcodeScanner.render((decodedText) => {
        window.handleSearch(decodedText);
    });
};

/**
 * 核心查询渲染逻辑
 */
window.handleSearch = (barcode) => {
    const product = getProductByBarcode(barcode);
    const card = document.getElementById('product-card');
    const error = document.getElementById('error-message');

    if (product) {
        // 渲染从 Markdown 解析出的字段
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-type').textContent = product.type;
        document.getElementById('product-desc').textContent = product.desc;
        document.getElementById('product-barcode').textContent = barcode;
        
        // 图片路径：public/img 中的图片在打包后会出现在 ./img/
        document.getElementById('product-image').src = `./img/${product.image}`;

        card.classList.remove('hidden');
        error.classList.add('hidden');
        
        // 扫码成功后停止相机
        if (html5QrcodeScanner) {
            html5QrcodeScanner.clear();
        }
    } else {
        card.classList.add('hidden');
        error.classList.remove('hidden');
        // 3秒后自动隐藏错误提示
        setTimeout(() => error.classList.add('hidden'), 3000);
    }
};

/**
 * UI 辅助逻辑
 */
window.handleManualSearch = () => {
    const val = document.getElementById('manual-input').value.trim();
    if (val) window.handleSearch(val);
};

window.resetSearch = () => {
    document.getElementById('product-card').classList.add('hidden');
    document.getElementById('manual-input').value = '';
    initScanner(); 
};

// 页面加载自动启动扫码
window.addEventListener('DOMContentLoaded', initScanner);