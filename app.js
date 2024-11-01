let totalSales = 0;
let totalNormalCount = 0;
let totalMashiCount = 0;
let totalMashimashiCount = 0;

// 売上合計の初期設定
function initializeTotalSales() {
    const savedSales = localStorage.getItem('totalSales');
    totalSales = savedSales ? parseInt(savedSales, 10) : 0;
    document.getElementById('total_sales').innerText = totalSales;
}

// 売上合計を保存する関数
function saveTotalSales() {
    localStorage.setItem('totalSales', totalSales);
}

// 売上合計を加算して更新・保存する関数
function addToTotalSales(newAmount) {
    totalSales += newAmount;
    document.getElementById('total_sales').innerText = totalSales;
    saveTotalSales();
}

// 修正金額を適用する関数
function applyAdjustment() {
    const adjustmentAmount = parseInt(document.getElementById('adjustment_amount').value, 10) || 0;
    addToTotalSales(adjustmentAmount);
    
    // 修正金額フィールドをリセット
    document.getElementById('adjustment_amount').value = 0;
}

// 購入金額合計を計算する関数
function calculateTotal() {
    const product300Count = parseInt(document.getElementById('product_300').value, 10) || 0;
    const product350Count = parseInt(document.getElementById('product_350').value, 10) || 0;
    const product400Count = parseInt(document.getElementById('product_400').value, 10) || 0;

    const product300Price = parseInt(document.getElementById('price_300').innerText, 10) || 0;
    const product350Price = parseInt(document.getElementById('price_350').innerText, 10) || 0;
    const product400Price = parseInt(document.getElementById('price_400').innerText, 10) || 0;

    const totalAmount = (product300Price * product300Count) +
                        (product350Price * product350Count) +
                        (product400Price * product400Count);

    document.getElementById('total_amount').innerText = totalAmount;

    addToTotalSales(totalAmount);

    // 累計個数を更新
    totalNormalCount += product300Count;
    totalMashiCount += product350Count;
    totalMashimashiCount += product400Count;

    // 累計個数を表示
    document.getElementById('total_normal_count').innerText = totalNormalCount;
    document.getElementById('total_mashi_count').innerText = totalMashiCount;
    document.getElementById('total_mashimashi_count').innerText = totalMashimashiCount;

    // 累計個数を保存
    localStorage.setItem('totalNormalCount', totalNormalCount);
    localStorage.setItem('totalMashiCount', totalMashiCount);
    localStorage.setItem('totalMashimashiCount', totalMashimashiCount);

    // 個数をリセット
    document.getElementById('product_300').value = 0;
    document.getElementById('product_350').value = 0;
    document.getElementById('product_400').value = 0;
}

// 価格を変更する関数
function changePrice(priceId, amount) {
    const priceElement = document.getElementById(priceId);
    let currentPrice = parseInt(priceElement.innerText, 10);

    // 価格が50円未満にはならないようにする
    const newPrice = currentPrice + amount;
    if (newPrice >= 50) {
        priceElement.innerText = newPrice;
    }
}

// 個数計算プラス
function increaseCount(productId) {
    const inputField = document.getElementById(productId);
    let currentCount = parseInt(inputField.value, 10);
    inputField.value = currentCount + 1;
}

// 個数計算マイナス
function decreaseCount(productId) {
    const inputField = document.getElementById(productId);
    let currentCount = parseInt(inputField.value, 10);
    // 0以下にならない
    if (currentCount > 0) {
        inputField.value = currentCount - 1;
    }
}

// ページ読み込み時に売り上げ合計と個数を表示
window.onload = function() {
    initializeTotalSales();

    // 累計個数の読み込み
    totalNormalCount = parseInt(localStorage.getItem('totalNormalCount'), 10) || 0;
    totalMashiCount = parseInt(localStorage.getItem('totalMashiCount'), 10) || 0;
    totalMashimashiCount = parseInt(localStorage.getItem('totalMashimashiCount'), 10) || 0;

    document.getElementById('total_normal_count').innerText = totalNormalCount;
    document.getElementById('total_mashi_count').innerText = totalMashiCount;
    document.getElementById('total_mashimashi_count').innerText = totalMashimashiCount;
};
