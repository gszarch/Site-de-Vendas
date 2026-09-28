// ================================
// CARRINHO
// ================================

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// Abrir carrinho
cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    overlay.classList.add("active");
});


// Fechar carrinho
function closeCartSidebar() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("active");
}

closeCart.addEventListener("click", closeCartSidebar);
overlay.addEventListener("click", closeCartSidebar);


// ================================
// ADICIONAR PRODUTOS
// ================================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            product => product.name === name
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        // Abre o carrinho automaticamente
        cartSidebar.classList.add("open");
        overlay.classList.add("active");

    });

});


// ================================
// ATUALIZAR CARRINHO
// ================================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-empty">
                <span>🛒</span>
                <p>Seu carrinho está vazio.</p>
            </div>
        `;

    } else {

        cart.forEach((product, index) => {

            const item = document.createElement("div");

            item.classList.add("cart-item");

            item.innerHTML = `
                <div class="cart-item-image">
                    🛍️
                </div>

                <div class="cart-item-info">
                    <strong>${product.name}</strong>
                    <span>
                        ${product.quantity}x
                        R$ ${product.price.toFixed(2).replace(".", ",")}
                    </span>
                </div>

                <button
                    class="remove-item"
                    onclick="removeProduct(${index})">
                    ✕
                </button>
            `;

            cartItems.appendChild(item);

        });

    }

    updateCartTotal();

}


// ================================
// REMOVER PRODUTO
// ================================

function removeProduct(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================================
// TOTAL
// ================================

function updateCartTotal() {

    const total = cart.reduce(
        (sum, product) => {
            return sum + product.price * product.quantity;
        },
        0
    );

    const quantity = cart.reduce(
        (sum, product) => {
            return sum + product.quantity;
        },
        0
    );

    cartCount.textContent = quantity;

    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;
}


// ================================
// CATEGORIAS
// ================================

const categoryButtons =
    document.querySelectorAll(".category-card");

const products =
    document.querySelectorAll(".product-card");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove seleção
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.category;

        filterProducts(category);

    });

});


function filterProducts(category) {

    let visibleProducts = 0;

    products.forEach(product => {

        const productCategory =
            product.dataset.category;

        if (
            category === "todos" ||
            productCategory === category
        ) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });

    document.getElementById("emptyMessage").style.display =
        visibleProducts === 0 ? "block" : "none";
}


// ================================
// BUSCA
// ================================

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();

    let visibleProducts = 0;

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(search)) {

            product.style.display = "";
            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });

    document.getElementById("emptyMessage").style.display =
        visibleProducts === 0 ? "block" : "none";

});


// ================================
// FAVORITOS
// ================================

const favoriteButtons =
    document.querySelectorAll(".favorite");

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});


// ================================
// BOTÃO DE PESQUISA
// ================================

const searchBtn =
    document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    document
        .getElementById("produtos")
        .scrollIntoView({
            behavior: "smooth"
        });

    setTimeout(() => {
        searchInput.focus();
    }, 500);

});


// ================================
// CHECKOUT
// ================================

const checkoutBtn =
    document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    alert(
        "Pedido iniciado! Aqui você pode integrar o checkout do seu sistema de pagamentos."
    );

});


// ================================
// MENU MOBILE
// ================================

const mobileMenu =
    document.getElementById("mobileMenu");

const menu =
    document.querySelector(".menu");

mobileMenu.addEventListener("click", () => {

    if (menu.style.display === "flex") {

        menu.style.display = "";

    } else {

        menu.style.display = "flex";

        menu.style.position = "absolute";
        menu.style.top = "68px";
        menu.style.left = "0";
        menu.style.right = "0";
        menu.style.padding = "20px";
        menu.style.background = "#fff";
        menu.style.flexDirection = "column";
        menu.style.gap = "20px";
        menu.style.borderBottom = "1px solid #e4e4e7";

    }

});
