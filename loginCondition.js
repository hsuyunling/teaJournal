document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector('a[href="login.html"]');
    const cartLink = document.querySelector('a[href="cart.html"]');

    // 取得登入狀態（true / false）
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    // (A) 如果已登入 → 將「登入」改成「個人」
    if (isLoggedIn) {
        loginLink.textContent = "個人";
        loginLink.href = "profile.html"; // demo：跳轉到個人頁
    }

    // (B) 如果未登入 → 點購物車時強制導到登入頁
    cartLink.addEventListener("click", (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            window.location.href = "login.html";
        }
    });
    const userMenu = document.getElementById("user-menu");
    const userLink = document.getElementById("user-link");

    if (isLoggedIn) {
        // 將文字改成「個人」
        userLink.textContent = "個人";
        userLink.href = "#"; // 可改成個人頁面
        
        // 建立下拉選單
        const dropdown = document.createElement("ol");
        dropdown.className = "menu";
        dropdown.innerHTML = `
            <li><button onclick="demoLogout()">登出</button></li>
        `;
        userMenu.appendChild(dropdown);

        // 加上 dropdown class 控制懸浮顯示
        userMenu.classList.add("dropdown");
    }
});

function demoLogout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}