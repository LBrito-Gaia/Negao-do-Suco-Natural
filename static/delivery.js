// Delivery System - Gerenciamento de Carrinho e Checkout (VERSÃO CORRIGIDA)
const deliverySystem = {
    cart: [],
    deliveryFee: 5.00,
    orderData: {},
    
    products: {
        'Verde Detox': { price: 10.00, color: 'linear-gradient(135deg, #A8E6CF 0%, #4ECDC4 100%)', icon: 'fa-seedling' },
        'Limonada Suíça': { price: 9.00, color: 'linear-gradient(135deg, #FFD93D 0%, #F9A826 100%)', icon: 'fa-lemon' },
        'Morango': { price: 11.00, color: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)', icon: 'fa-heart' },
        'Manga': { price: 9.50, color: 'linear-gradient(135deg, #FFA07A 0%, #FF7F50 100%)', icon: 'fa-sun' },
        'Salada de frutas': { price: 12.00, color: 'linear-gradient(135deg, #98D8C8 0%, #6BCF7F 100%)', icon: 'fa-glass-whiskey' },
        'Açaí': { price: 12.00, color: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', icon: 'fa-grape' },
        'Tapioca Carne Seca c/ Queijo': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Carne Seca c/ Catupiry': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Carne Seca c/ Cheddar': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Carne Seca c/ Requeijao': { price: 22.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Frango c/ Queijo': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Frango c/ Cheddar': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Frango c/ Catupiry': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Frango c/ Requeijao': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Calabresa c/ Queijo': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Calabresa c/ Cheddar': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Queijo c/ Presunto': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Queijo Branco c/ Peito de Peru': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Queijo c/ Presunto, Calabresa e Cheddar': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Bacon c/ Ovos e Queijo': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Bacon c/ Queijo e Requeijao': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Coco c/ Leite Condensado': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Nutella': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Nutella c/ Oreo': { price: 17.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Tapioca Romeu e Julieta': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Laranja':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Maracuja':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Abacaxi':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Abacaxi c/ Hortela e Gengibre':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Goiaba':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Manga':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Melancia':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Limao':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Limao c/ Inhame':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Beterraba c/ Cenoura, Laranja, Limao e Gengibre':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Laranja c/ Acerola':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Laranja c/ Couve e Hortela':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Laranja c/ Morango':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Suco Maracuja c/ Morango':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils' },
        'Sanduiche Natural': { price: 10.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Pao c/ Linguica': { price: 12.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Misto Quente': { price: 8.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Misto c/ Ovo': { price: 10.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Misto c/ Queijo e Peito de Peru': { price: 12.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Pao c/ Ovo, Bacon e Queijo Coalho': { price: 15.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Pao c/ Ovo e Bacon': { price: 12.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Fielzao': { price: 18.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger' },
        'Vitamina Morango': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender' },
        'Vitamina Maracuja': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender' },
        'Vitamina Banana c/ Aveia': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender' },
        'Vitamina Abacate': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender' }
    },

    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateCartUI();
    },

    setupEventListeners() {
        const cartButton = document.getElementById('cartButton');
        const closeCart = document.getElementById('closeCart');
        const cartModal = document.getElementById('cartModal');
        
        cartButton.addEventListener('click', () => this.openCart());
        closeCart.addEventListener('click', () => this.closeCart());
        
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                this.closeCart();
            }
        });

        const paymentRadios = document.querySelectorAll('input[name="payment"]');
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const trocoSection = document.getElementById('trocoSection');
                if (e.target.value === 'dinheiro') {
                    trocoSection.style.display = 'block';
                } else {
                    trocoSection.style.display = 'none';
                }
            });
        });

        const needChangeRadios = document.querySelectorAll('input[name="needChange"]');
        needChangeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const changeAmount = document.getElementById('changeAmount');
                if (e.target.value === 'sim') {
                    changeAmount.style.display = 'block';
                } else {
                    changeAmount.style.display = 'none';
                }
            });
        });

        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 5) {
                    value = value.substring(0, 5) + '-' + value.substring(5, 8);
                }
                e.target.value = value;
            });
        }
    },

    addToCart(productName) {
        const existingItem = this.cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const product = this.products[productName];
            if (!product) {
                console.error(`Produto não encontrado: ${productName}. Verifique se o nome no HTML é igual ao do delivery.js`);
                alert("Erro ao adicionar produto. Tente novamente.");
                return;
            }
            this.cart.push({
                name: productName,
                price: product.price,
                quantity: 1,
                color: product.color,
                icon: product.icon
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        if (typeof showNotification === 'function') {
            showNotification(`${productName} adicionado ao carrinho!`);
        }
    },

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartUI();
        this.renderCart();
    },

    updateQuantity(index, change) {
        this.cart[index].quantity += change;
        
        if (this.cart[index].quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.saveCart();
            this.updateCartUI();
            this.renderCart();
        }
    },

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getTotalWithDelivery() {
        return this.getTotal() + this.deliveryFee;
    },

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;
    },

    openCart() {
        const cartModal = document.getElementById('cartModal');
        cartModal.classList.add('active');
        this.renderCart();
    },

    closeCart() {
        const cartModal = document.getElementById('cartModal');
        cartModal.classList.remove('active');
    },

    renderCart() {
        const cartModalBody = document.getElementById('cartModalBody');
        const cartModalFooter = document.getElementById('cartModalFooter');
        
        if (this.cart.length === 0) {
            cartModalBody.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <a href="#produtos" class="btn btn-primary" onclick="closeCartModal()">Ver Produtos</a>
                </div>
            `;
            cartModalFooter.style.display = 'none';
        } else {
            const cartItemsHTML = this.cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-icon" style="background: ${item.color}">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="deliverySystem.updateQuantity(${index}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-number">${item.quantity}</span>
                            <button class="quantity-btn" onclick="deliverySystem.updateQuantity(${index}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item" onclick="deliverySystem.removeFromCart(${index})" aria-label="Remover item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            cartModalBody.innerHTML = `<div class="cart-items">${cartItemsHTML}</div>`;
            cartModalFooter.style.display = 'block';
            
            const totalPrice = document.getElementById('totalPrice');
            totalPrice.textContent = `R$ ${this.getTotal().toFixed(2)}`;
        }
    },

    saveCart() {
        localStorage.setItem('negaodosucoCart', JSON.stringify(this.cart));
    },

    loadCart() {
        const saved = localStorage.getItem('negaodosucoCart');
        if (saved) {
            this.cart = JSON.parse(saved);
        }
    },

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    }
};

// --- Funções de Checkout ---

function goToCheckout() {
    if (deliverySystem.cart.length === 0) {
        if (typeof showNotification === 'function') showNotification('Seu carrinho está vazio!');
        return;
    }
    
    deliverySystem.closeCart();
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.add('active');
    
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active', 'completed'));
    document.querySelector('.step[data-step="1"]').classList.add('active');
    
    document.querySelectorAll('.checkout-step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector('.checkout-step-content[data-content="1"]').classList.add('active');
    
    updateCheckoutTotals();
}

function nextStep(stepNumber) {
    if (stepNumber === 2) {
        const form = document.getElementById('deliveryForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const formData = new FormData(form);
        deliverySystem.orderData.delivery = {
            nome: formData.get('nome'),
            telefone: formData.get('telefone'),
            cep: formData.get('cep'),
            cidade: formData.get('cidade'),
            endereco: formData.get('endereco'),
            numero: formData.get('numero'),
            complemento: formData.get('complemento'),
            bairro: formData.get('bairro'),
            referencia: formData.get('referencia')
        };
    }
    
    if (stepNumber === 3) {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const needChange = document.querySelector('input[name="needChange"]:checked')?.value;
    const trocoInput = document.getElementById('trocoValue');
    const changeValue = parseFloat(trocoInput?.value) || 0;
    const totalPedido = deliverySystem.getTotalWithDelivery();

    // 1. LIMPEZA DE ERROS ANTERIORES
    trocoInput.classList.remove('input-error');

    // 2. VALIDAÇÃO DETALHADA
    if (selectedPayment === 'dinheiro' && needChange === 'sim') {
        if (isNaN(changeValue) || changeValue <= 0) {
            alert("Por favor, digite o valor que você terá em mãos para pagar.");
            trocoInput.focus();
            return;
        }

        if (changeValue < totalPedido) {
            trocoInput.classList.add('input-error');
            alert(`Valor insuficiente! O total é R$ ${totalPedido.toFixed(2)}, mas você digitou R$ ${changeValue.toFixed(2)}. Por favor, corrija o valor do troco.`);
            trocoInput.focus();
            return;
        }
    }
    
    // 3. REGISTRO DOS DADOS E CÁLCULO
    deliverySystem.orderData.payment = {
        method: selectedPayment,
        needChange: selectedPayment === 'dinheiro' ? needChange : 'nao',
        changeValue: changeValue,
        calculatedChange: (changeValue - totalPedido)
    };
        
        renderOrderSummary();
    }
    
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active');
        if (stepNum < stepNumber) {
            step.classList.add('completed');
        }
    });
    
    document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
    document.querySelectorAll('.checkout-step-content').forEach(content => content.classList.remove('active'));
    document.querySelector(`.checkout-step-content[data-content="${stepNumber}"]`).classList.add('active');
}

function renderOrderSummary() {
    const delivery = deliverySystem.orderData.delivery;
    const payment = deliverySystem.orderData.payment;
    
    const addressText = `
        ${delivery.nome}<br>
        ${delivery.telefone}<br>
        ${delivery.endereco}, ${delivery.numero}${delivery.complemento ? ' - ' + delivery.complemento : ''}<br>
        ${delivery.bairro}, ${delivery.cidade}<br>
        CEP: ${delivery.cep}
        ${delivery.referencia ? '<br>Ref: ' + delivery.referencia : ''}
    `;
    document.getElementById('summaryAddress').innerHTML = addressText;
    
    const itemsHTML = deliverySystem.cart.map(item => `
        <div class="summary-item">
            <span>${item.quantity}x ${item.name}</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    document.getElementById('summaryItems').innerHTML = itemsHTML;
    
    // EXIBIÇÃO DO TROCO NO RESUMO (CORREÇÃO)
    let paymentText = '';
    if (payment.method === 'dinheiro') {
        paymentText = '<strong>Dinheiro</strong>';
        if (payment.needChange === 'sim') {
            paymentText += `<br>Paga com: R$ ${payment.changeValue.toFixed(2)}`;
            paymentText += `<br>Troco a receber: <span style="color: #27ae60">R$ ${payment.calculatedChange.toFixed(2)}</span>`;
        } else {
            paymentText += ' - Sem troco';
        }
    } else if (payment.method === 'pix') {
        paymentText = 'PIX';
    } else {
        paymentText = 'Cartão';
    }
    document.getElementById('summaryPayment').innerHTML = paymentText;
    
    const subtotal = deliverySystem.getTotal();
    const total = deliverySystem.getTotalWithDelivery();
    
    document.getElementById('finalSubtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('finalDeliveryFee').textContent = `R$ ${deliverySystem.deliveryFee.toFixed(2)}`;
    document.getElementById('finalTotal').textContent = `R$ ${total.toFixed(2)}`;
}

function confirmOrder() {
    const delivery = deliverySystem.orderData.delivery;
    const payment = deliverySystem.orderData.payment;
    const items = deliverySystem.cart;
    const subtotal = deliverySystem.getTotal();
    const total = deliverySystem.getTotalWithDelivery();
    
    let message = ` *PEDIDO - NEGÃO DO SUCO NATURAL*%0A%0A`;
    
    message += `*📦 ITENS DO PEDIDO:*%0A`;
    items.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    
    message += `%0A*💰 VALORES:*%0A`;
    message += `Subtotal: R$ ${subtotal.toFixed(2)}%0A`;
    message += `Taxa de Entrega: R$ ${deliverySystem.deliveryFee.toFixed(2)}%0A`;
    message += `*TOTAL: R$ ${total.toFixed(2)}*%0A`;
    
    message += `%0A*📍 ENDEREÇO DE ENTREGA:*%0A`;
    message += `Nome: ${delivery.nome}%0A`;
    message += `Telefone: ${delivery.telefone}%0A`;
    message += `Endereço: ${delivery.endereco}, ${delivery.numero}${delivery.complemento ? ' - ' + delivery.complemento : ''}%0A`;
    message += `Bairro: ${delivery.bairro} - ${delivery.cidade}%0A`;
    
    // MENSAGEM DE PAGAMENTO PARA O WHATSAPP (CORREÇÃO)
    message += `%0A*💳 FORMA DE PAGAMENTO:*%0A`;
    if (payment.method === 'dinheiro') {
        message += `Dinheiro`;
        if (payment.needChange === 'sim') {
            message += `%0A- Paga com: R$ ${payment.changeValue.toFixed(2)}`;
            message += `%0A- *LEVAR DE TROCO: R$ ${payment.calculatedChange.toFixed(2)}*`;
        } else {
            message += ` - Sem troco`;
        }
    } else if (payment.method === 'pix') {
        message += `PIX`;
    } else {
        message += `Cartão`;
    }
    
    const whatsappUrl = `https://wa.me/5521970331233?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
        closeCheckout();
        deliverySystem.clearCart();
        deliverySystem.renderCart();
        if (typeof showNotification === 'function') showNotification('Pedido enviado com sucesso!');
    }, 1000);
}

// Inicialização e Globais
function updateCheckoutTotals() {
    const subtotal = deliverySystem.getTotal();
    const total = deliverySystem.getTotalWithDelivery();
    document.getElementById('subtotalCheckout').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('totalCheckout').textContent = `R$ ${total.toFixed(2)}`;
}

function closeCartModal() { deliverySystem.closeCart(); }
function backToCart() { document.getElementById('checkoutModal').classList.remove('active'); deliverySystem.openCart(); }
function closeCheckout() { document.getElementById('checkoutModal').classList.remove('active'); }

window.addEventListener('DOMContentLoaded', () => deliverySystem.init());

// Exportação para o HTML
window.addToCart = (name) => deliverySystem.addToCart(name);
window.closeCartModal = closeCartModal;
window.goToCheckout = goToCheckout;
window.backToCart = backToCart;
window.closeCheckout = closeCheckout;
window.nextStep = nextStep;
window.confirmOrder = confirmOrder;
window.deliverySystem = deliverySystem;

// Função ponte para ler o valor do select e adicionar ao carrinho
function adicionarComSelect(idDoCampo) {
    const elementoSelect = document.getElementById(idDoCampo);
    if (!elementoSelect) return;

    const saborEscolhido = elementoSelect.value;
    
    // O deliverySystem.addToCart já sabe buscar o preço no seu objeto 'products'
    // que está no topo do delivery.js. Se o nome no 'value' do HTML for igual 
    // ao nome no objeto 'products', tudo funciona perfeitamente!
    window.addToCart(saborEscolhido);
}

// Garante que o botão no HTML consiga "ver" essa função
window.adicionarComSelect = adicionarComSelect;