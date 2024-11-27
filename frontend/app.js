document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const stockTableBody = document.querySelector('#stock-table tbody');
    let products = [];

    // Функция для обновления таблицы остатков
    function updateStockTable() {
        stockTableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
            `;
            stockTableBody.appendChild(row);
        });
    }

    // Обработчик отправки формы добавления товара
    addProductForm.addEventListener('submit', event => {
        event.preventDefault();
        const productName = document.getElementById('product-name').value;
        const productQuantity = parseInt(document.getElementById('product-quantity').value);

        if (!productName || !productQuantity) return;

        products.push({ name: productName, quantity: productQuantity });
        updateStockTable();

        // Очистим форму после добавления товара
        addProductForm.reset();
    });

    // Получение текущих остатков
    document.getElementById('get-stock-button').addEventListener('click', () => {
        alert(`Текущие остатки:\n\n${products.map(p => `${p.name}: ${p.quantity}`).join('\n')}`);
    });

    // Увеличение остатка товара
    document.getElementById('increase-stock-button').addEventListener('click', () => {
        const productIndex = prompt("Введите индекс товара для увеличения остатка:");
        if (productIndex && !isNaN(productIndex)) {
            const index = parseInt(productIndex);
            if (index >= 0 && index < products.length) {
                const newQuantity = parseInt(prompt("На сколько увеличить?"));
                if (!isNaN(newQuantity)) {
                    products[index].quantity += newQuantity;
                    updateStockTable();
                }
            }
        }
    });

    // Уменьшение остатка товара
    document.getElementById('decrease-stock-button').addEventListener('click', () => {
        const productIndex =Number( prompt("Введите индекс товара для уменьшения остатка:"));
        if (productIndex && !isNaN(productIndex)) {
            const index = productIndex;
            if (index >= 0 && index < products.length) {
                const newQuantity = parseInt(prompt("На сколько уменьшить?"));
                if (!isNaN(newQuantity)) {
                    products[index].quantity -= newQuantity;
                    updateStockTable();
                }
            }
        }
    });
});