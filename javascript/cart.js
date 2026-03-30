// Quản lý giỏ hàng với localStorage
class CartManager {
  constructor() {
    this.cartKey = 'fiama_cart';
    this.loadCart();
  }

  // Lấy giỏ hàng từ localStorage
  loadCart() {
    const cart = localStorage.getItem(this.cartKey);
    this.items = cart ? JSON.parse(cart) : [];
  }

  // Lưu giỏ hàng vào localStorage
  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }

  // Thêm sản phẩm vào giỏ hàng
  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity: quantity
      });
    }

    this.saveCart();
    return this;
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeProduct(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    return this;
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity++;
      this.saveCart();
    }
    return this;
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
    return this;
  }

  // Lấy tất cả sản phẩm trong giỏ
  getCart() {
    return this.items;
  }

  // Tính tổng tiền
  getTotalPrice() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Lấy số lượng sản phẩm trong giỏ
  getCartCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Xóa toàn bộ giỏ hàng
  clearCart() {
    this.items = [];
    this.saveCart();
    return this;
  }

  // Cập nhật quantity của sản phẩm
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeProduct(productId);
    } else {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveCart();
      }
    }
    return this;
  }
}

// Khởi tạo cart manager toàn cục
const cart = new CartManager();

// Cập nhật hiển thị giỏ hàng ở header
function updateCartDisplay() {
  const cartCount = cart.getCartCount();
  const cartTotal = cart.getTotalPrice();

  // Cập nhật số lượng và tổng tiền ở header
  const cartContent = document.querySelector('.cart-content p');
  if (cartContent) {
    cartContent.textContent = `${cartTotal.toLocaleString('vi-VN')} VND`;
  }

  // Cập nhật header-total nếu có
  const headerTotal = document.getElementById('header-total');
  if (headerTotal) {
    headerTotal.textContent = `${cartTotal.toLocaleString('vi-VN')} VND`;
  }

  // Cập nhật badge giỏ hàng (không ghi đè toàn bộ icon)
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    let badge = cartIcon.querySelector('.cart-badge');
    if (cartCount > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartIcon.appendChild(badge);
      }
      badge.textContent = cartCount;
    } else if (badge) {
      badge.remove();
    }
  }
}

// Gắn sự kiện click cho nút "Thêm vào giỏ"
function setupAddToCartButtons() {
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.add-item')) {
      const button = e.target.closest('.add-item');
      const productCol = button.closest('[data-id]');
      const productId = parseInt(productCol.dataset.id);

      // Lấy thông tin sản phẩm từ trang
      const productTitle = productCol.querySelector('.Product-item--title')?.textContent || '';
      const priceText = productCol.querySelector('.Product-item-price')?.textContent || '0';
      const price = parseInt(priceText.replace(/\D/g, ''));
      const image = productCol.querySelector('.Product-item--img img')?.src || '';

      const product = {
        id: productId,
        name: productTitle,
        price: price,
        image: image
      };

      cart.addProduct(product);
      updateCartDisplay();

      // Thêm hiệu ứng visual
      button.style.background = '#ed5578';
      setTimeout(() => {
        button.style.background = '';
      }, 300);
    }
  });
}

// Chạy khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
  setupAddToCartButtons();
  updateCartDisplay();
});

//Trang cart
        // Hiển thị giỏ hàng
        function displayCart() {
            const cartContent = document.getElementById('cart-content');
            const cartItems = cart.getCart();
            const totalPrice = cart.getTotalPrice();

            if (cartItems.length === 0) {
                cartContent.innerHTML = `
                    <div class="cart-empty">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <h2>Giỏ hàng của bạn trống</h2>
                        <p style="color: #999; margin-bottom: 20px;">Hãy thêm sản phẩm vào giỏ hàng</p>
                        <a href="index.html" class="btn-continue">Tiếp tục mua sắm</a>
                    </div>
                `;
                return;
            }

            let html = `
                <div class="row">
                    <div class="col-lg-8">
                        <table class="table cart-table">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                html += `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <img src="${item.image}" alt="${item.name}">
                                <div>
                                    <h6 style="margin: 0; font-weight: 600;">${item.name}</h6>
                                </div>
                            </div>
                        </td>
                        <td>${item.price.toLocaleString('vi-VN')} VND</td>
                        <td>
                            <div class="quantity-control">
                                <button onclick="decreaseQuantity(${item.id})">-</button>
                                <input type="number" value="${item.quantity}" readonly>
                                <button onclick="increaseQuantity(${item.id})">+</button>
                            </div>
                        </td>
                        <td style="font-weight: 600; color: #ed5578;">
                            ${itemTotal.toLocaleString('vi-VN')} VND
                        </td>
                        <td>
                            <button class="btn-remove" onclick="removeFromCart(${item.id})">
                                <i class="fa-solid fa-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                `;
            });

            html += `
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-4">
                        <div class="cart-summary">
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span>${totalPrice.toLocaleString('vi-VN')} VND</span>
                            </div>
                            <div class="summary-row">
                                <span>Shipping:</span>
                                <span>0 VND</span>
                            </div>
                            <div class="summary-row">
                                <span>Tax:</span>
                                <span>0 VND</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span id="final-total">${totalPrice.toLocaleString('vi-VN')} VND</span>
                            </div>
                            <button class="btn-checkout" onclick="checkout()">
                                Tiến hành thanh toán
                            </button>
                            <a href="index.html" class="btn-continue">Tiếp tục mua sắm</a>
                        </div>
                    </div>
                </div>
                <button class="btn-clear-cart" onclick="clearAllCart()">
                    <i class="fa-solid fa-trash"></i> Xóa toàn bộ
                </button>
            `;

            cartContent.innerHTML = html;
        }

        // Tăng số lượng
        function increaseQuantity(productId) {
            cart.increaseQuantity(productId);
            displayCart();
            updateCartDisplay();
        }

        // Giảm số lượng
        function decreaseQuantity(productId) {
            cart.decreaseQuantity(productId);
            displayCart();
            updateCartDisplay();
        }

        // Xóa sản phẩm
        function removeFromCart(productId) {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                cart.removeProduct(productId);
                displayCart();
                updateCartDisplay();
            }
        }

        // Xóa toàn bộ giỏ hàng
        function clearAllCart() {
            if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                cart.clearCart();
                displayCart();
                updateCartDisplay();
            }
        }

        // Tạo URL mã QR thanh toán
        function generateQRPaymentUrl(amount) {
            const bankCode = '970422';           
            const accountNumber = '0932712466';   
            const accountName = 'NGUYEN%20THI%20THU%20DUNG'; 
            const addInfo = 'ThanhToanDonHang'; 

            return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
        }

        // Thanh toán
        function checkout() {
            const totalPrice = cart.getTotalPrice();
            if (totalPrice === 0) {
                alert('Giỏ hàng trống!');
                return;
            }

            // Hiển thị modal QR
            const qrUrl = generateQRPaymentUrl(totalPrice);
            const modal = document.createElement('div');
            modal.className = 'qr-modal';
            modal.innerHTML = `
                <div class="qr-modal-content">
                    <button class="qr-close" onclick="this.parentElement.parentElement.remove()">×</button>
                    <h3>Mã QR Thanh Toán</h3>
                    <img src="${qrUrl}" alt="QR Code" class="qr-code">
                    <div class="qr-info">
                        <p><strong>Tổng thanh toán:</strong> ${totalPrice.toLocaleString('vi-VN')} VND</p>
                        <p><strong>Nội dung:</strong> ThanhToanDonHang</p>
                        <p style="font-size: 12px; color: #999; margin-top: 15px;">Quét mã QR để thanh toán qua ngân hàng</p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Cập nhật header
        function updateHeaderCart() {
            const headerTotal = document.getElementById('header-total');
            if (headerTotal) {
                const total = cart.getTotalPrice();
                headerTotal.textContent = total.toLocaleString('vi-VN') + ' VND';
            }
        }

        // Load trang
        document.addEventListener('DOMContentLoaded', () => {
            displayCart();
            updateHeaderCart();
        });
   