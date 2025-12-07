
let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartList = document.getElementById("cart-list");
const grandTotalEl = document.getElementById("grand-total");
const selectAllCheckbox = document.getElementById("select-all");

function renderCart() {
    cartList.innerHTML = "";

    const emptyMsg = document.getElementById("empty-cart-msg");
    const selectAll = document.getElementById("select-all-label");

    // ✅ 購物車是空的
    if (cart.length === 0) {
        emptyMsg.style.display = "block";
        selectAll.style.display = "none";
        grandTotalEl.textContent = "總金額：＄0";
        return;
    }

    // ✅ 有商品
    emptyMsg.style.display = "none";
    selectAll.style.display = "inline-block";

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        const total = product.price * item.qty;

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="cart">
                <label class="control control--checkbox">
                    <input type="checkbox" class="check-item" />
                    <div class="control__indicator"></div>
                </label>
                <h2>${product.farmer}</h2>
                <img src="${product.img}" alt="">
                <h3>${product.name}</h3>
                <p>＄${product.price}</p>
                <div class="price">
                    <div class="amount">
                        <p>數量</p>
                        <button class="minus">-</button>
                        <span>${item.qty}</span>
                        <button class="plus">+</button>
                    </div>
                    <div class="total">
                        <p>總價</p>
                        <p>＄${total}</p>
                    </div>
                </div>
            </div>
        `;

        // 數量加減
        const qtySpan = li.querySelector("span");
        const totalEl = li.querySelector(".total p:last-of-type");
        const checkbox = li.querySelector(".check-item");

        li.querySelector(".plus").addEventListener("click", () => {
            item.qty++;
            qtySpan.textContent = item.qty;
            totalEl.textContent = `＄${item.qty * product.price}`;
            updateGrandTotal();
        });
        li.querySelector(".minus").addEventListener("click", () => {
            if (item.qty > 1) item.qty--;
            qtySpan.textContent = item.qty;
            totalEl.textContent = `＄${item.qty * product.price}`;
            updateGrandTotal();
        });

        // checkbox 控制總金額
        checkbox.addEventListener("change", () => {
            updateGrandTotal();
            updateSelectAllState();
        });

        cartList.appendChild(li);
    });

    updateGrandTotal();
}

// 更新總金額
function updateGrandTotal() {
    let sum = 0;
    const carts = document.querySelectorAll(".cart");
    carts.forEach(cartDiv => {
        const checkbox = cartDiv.querySelector(".check-item");
        const totalEl = cartDiv.querySelector(".total p:last-of-type");
        if (checkbox.checked) {
            sum += parseInt(totalEl.textContent.replace("＄", ""));
        }
    });
    grandTotalEl.textContent = `總金額：＄${sum}`;
}

// 更新全選勾選狀態
function updateSelectAllState() {
    const checkboxes = document.querySelectorAll(".check-item");
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    selectAllCheckbox.checked = allChecked;
}

// 全選 / 全不選
selectAllCheckbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".check-item");
    checkboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
    updateGrandTotal();
});

renderCart();
