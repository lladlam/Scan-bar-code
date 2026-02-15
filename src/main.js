import { getProductByBarcode } from './router';

// 这里的变量用于存储扫码器实例
let html5QrCode = null;

/**
 * 启动扫码器的核心逻辑
 */
const startScanning = async () => {
    const scannerContainer = document.getElementById("reader");
    
    // 1. 实例化扫码核心类（不带默认UI，更易控制自动启动）
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }

    // 2. 配置参数：强制后置摄像头，设置扫码框大小
    const config = { 
        fps: 15, 
        qrbox: { width: 250, height: 200 } 
    };

    try {
        // 3. 核心：使用 facingMode: "environment" 强制后置镜头
        await html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                // 扫码成功回调
                handleScanSuccess(decodedText);
            }
        );
        console.log("摄像头已自动开启");
    } catch (err) {
        console.error("无法开启摄像头: ", err);
        // 如果失败（比如电脑没后置镜），尝试开启默认镜头
        html5QrCode.start({ facingMode: "user" }, config, (text) => handleScanSuccess(text));
    }
};

/**
 * 扫描成功后的逻辑
 */
const handleScanSuccess = (barcode) => {
    const product = getProductByBarcode(barcode);
    const card = document.getElementById('product-card');
    const error = document.getElementById('error-message');

    if (product) {
        // 渲染 Markdown 数据
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-type').textContent = product.type;
        document.getElementById('product-desc').textContent = product.desc;
        document.getElementById('product-barcode').textContent = barcode;
        document.getElementById('product-image').src = `./img/${product.image}`;

        card.classList.remove('hidden');
        error.classList.add('hidden');
        
        // 成功后停止相机以防发热
        html5QrCode.stop();
    } else {
        error.classList.remove('hidden');
        setTimeout(() => error.classList.add('hidden'), 3000);
    }
};

/**
 * UI 交互函数挂载到 window
 */
window.handleManualSearch = () => {
    const val = document.getElementById('manual-input').value.trim();
    if (val) handleScanSuccess(val);
};

window.resetSearch = () => {
    document.getElementById('product-card').classList.add('hidden');
    document.getElementById('manual-input').value = '';
    startScanning(); // 重新自动开启
};

// 【关键】页面加载完成立即执行启动
window.addEventListener('DOMContentLoaded', () => {
    // 延迟一小会儿确保 DOM 完全就绪
    setTimeout(startScanning, 500);
});
