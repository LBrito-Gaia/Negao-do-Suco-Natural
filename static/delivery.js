// Delivery System - Gerenciamento de Carrinho e Checkout (VERSÃO CORRIGIDA)
const deliverySystem = {
    cart: [],
    deliveryFee: 0.00, // Será calculado dinamicamente
    orderData: {},
    
    // CONFIGURAÇÃO DO FIREBASE (BANCO DE DADOS)
    // Substitua os valores abaixo pelos que você pegou no Console do Firebase
    firebaseConfig: {
        apiKey: "AIzaSyBHAOUDG1l9t1qiRjBW5KcIxi6cAtvmk8g",
        authDomain: "negaodosuconatural-aa2e0.firebaseapp.com",
        databaseURL: "https://negaodosuconatural-aa2e0-default-rtdb.firebaseio.com",
        projectId: "negaodosuconatural-aa2e0",
        storageBucket: "negaodosuconatural-aa2e0.firebasestorage.app",
        messagingSenderId: "43267784727",
        appId: "1:43267784727:web:5a892a879fcd5f87685c52"
    },

    // Configurações da Loja (Lógica estilo CardapioWeb)
    storeConfig: {
        isOpen: true, 
        forceClosed: false, // CONTROLE MANUAL: Mude para 'true' para fechar a loja imediatamente.
        printerActive: true, // CONTROLE DA IMPRESSORA
        openingHours: {
            start: 9, // 09:00
            end: 19    // 19:00 (o sistema fecha às 19:00 em ponto)
        },
        // Taxas por bairro (Exemplo)
        neighborhoodFees: {
            'Centro': 5.00,
            'Bairro A': 7.00,
            'Bairro B': 10.00,
            'Outros': 15.00
        }
    },

    products: {
        'Salada de frutas': { price: 12.00, color: 'linear-gradient(135deg, #98D8C8 0%, #6BCF7F 100%)', icon: 'fa-glass-whiskey', isAvailable: true },
        'Tapioca Carne Seca com Queijo': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Carne Seca com Catupiry': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Carne Seca com Cheddar': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Carne Seca com Requeijao': { price: 22.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Frango com Queijo': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Frango com Cheddar': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Frango com Catupiry': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Frango com Requeijao': { price: 20.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Calabresa com Queijo': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Calabresa com Cheddar': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Queijo com Presunto': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Queijo Branco com Peito de Peru': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Queijo com Presunto, Calabresa e Cheddar': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Bacon com Ovos e Queijo': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Bacon com Queijo e Requeijao': { price: 18.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Coco com Leite Condensado': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Nutella': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Nutella com Oreo': { price: 17.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Tapioca Romeu e Julieta': { price: 16.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Laranja':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Maracuja':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Abacaxi':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Abacaxi com Hortela e Gengibre':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Goiaba':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Manga':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Melancia':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Limao':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Limao com Inhame':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Beterraba com Cenoura, Laranja, Limao e Gengibre':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Laranja com Acerola':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Laranja com Couve e Hortela':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Laranja com Morango':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Suco Maracuja com Morango':{price: 8.00, color: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)', icon: 'fa-utensils', isAvailable: true },
        'Sanduiche Natural': { price: 12.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Pao com Linguica': { price: 17.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Misto Quente': { price: 6.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Misto com Ovo': { price: 10.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Misto com Queijo e Peito de Peru': { price: 8.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Pao com Ovo, Bacon e Queijo Coalho': { price: 12.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Pao com Ovo e Bacon': { price: 9.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Fielzao': { price: 12.00, color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', icon: 'fa-hamburger', isAvailable: true },
        'Vitamina Morango': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender', isAvailable: true },
        'Vitamina Maracuja': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender', isAvailable: true },
        'Vitamina Banana com Aveia': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender', isAvailable: true },
        'Vitamina Abacate': { price: 15.00, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', icon: 'fa-blender', isAvailable: true }
    ,
        'Adicional Queijo': { price: 4.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true },
        'Adicional Ovo': { price: 2.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true },
        'Adicional Bacon': { price: 4.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true },
        'Adicional Cheddar': { price: 3.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true },
        'Adicional Requeijão': { price: 4.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true },
        'Adicional Catupiry': { price: 3.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true },
        'Adicional Calabresa': { price: 4.00, color: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)', icon: 'fa-plus-circle', isAvailable: true }
    },

    init() {
        // Garante que o 'this' dentro do handleBeforeUnload se refira ao deliverySystem
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
        this.loadCart();
        this.setupEventListeners();
        this.setupFirebase(); // Conecta ao banco de dados
        this.setupAdminSecret(); // Inicia o "escuta" do menu secreto
        this.checkOpeningHours(); // Verifica se está aberto ao carregar
        this.updateProductAvailabilityUI();
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

        // Prepara os atualizadores de preço para os cards com select
        this.setupPriceUpdater('selectVitaminas', 'priceDisplay-vitaminas');
        this.setupPriceUpdater('selectSucos', 'priceDisplay-sucos');
    },

    setupPriceUpdater(selectId, displayId) {
        const selectElement = document.getElementById(selectId);
        const displayElement = document.getElementById(displayId);

        if (!selectElement || !displayElement) return;

        const updatePrice = () => {
            const selectedProduct = selectElement.value;
            if (this.products[selectedProduct]) {
                const price = this.products[selectedProduct].price;
                // Formata para o padrão brasileiro (R$ 10,00)
                displayElement.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
            }
        };

        selectElement.addEventListener('change', updatePrice);
        // Força a atualização inicial do preço
        updatePrice();
    },

    // --- CONEXÃO COM FIREBASE ---
    setupFirebase() {
        // Verifica se o Firebase foi carregado no HTML
        if (typeof firebase === 'undefined') {
            console.error("Firebase SDK não encontrado! Adicione os scripts no HTML.");
            return;
        }

        // Inicializa o Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        
        this.db = firebase.database();

        // 1. OUVINTE: Status da Loja (Aberto/Fechado)
        // Sempre que mudar no banco, atualiza aqui automaticamente
        this.db.ref('config/forceClosed').on('value', (snapshot) => {
            const isClosed = snapshot.val();
            // Se for null (primeira vez), assume false
            this.storeConfig.forceClosed = isClosed === true; 
            this.checkOpeningHours();
            
            // Se o painel admin estiver aberto, atualiza ele visualmente
            if (document.getElementById('adminPanel')) {
                this.openAdminPanel();
            }
        });

        // 3. OUVINTE: Status da Impressora
        this.db.ref('config/impressoraAtiva').on('value', (snapshot) => {
            this.storeConfig.printerActive = snapshot.val() === true;
            // Se o painel admin estiver aberto, atualiza ele visualmente
            if (document.getElementById('adminPanel')) {
                this.openAdminPanel();
            }
        });

        // 2. OUVINTE: Estoque de Produtos
        this.db.ref('estoque').on('value', (snapshot) => {
            const estoqueRemoto = snapshot.val() || {};
            
            // Atualiza o status local de cada produto
            for (const productName in this.products) {
                // Se o produto existe no banco, usa o valor do banco. 
                // Se não existe (novo produto), assume true (disponível).
                if (estoqueRemoto.hasOwnProperty(productName)) {
                    this.products[productName].isAvailable = estoqueRemoto[productName];
                }
            }
            
            this.updateProductAvailabilityUI();
            
            // Se o painel admin estiver aberto, atualiza a lista
            if (document.getElementById('adminPanel')) {
                this.openAdminPanel();
            }
        });
    },

    updateProductAvailabilityUI() {
        // PASSO 1: Atualiza cada item individualmente (Botões, Opções de Select e Checkboxes)
        for (const productName in this.products) {
            const product = this.products[productName];
            const isAvailable = product.isAvailable;
            
            // Seleciona botões e opções relacionados a este produto
            const simpleButtons = document.querySelectorAll(`button[onclick="addToCart('${productName}')"], button[onclick="window.addToCart('${productName}')"]`);
            const options = document.querySelectorAll(`option[value="${productName}"]`);
            const checkboxes = document.querySelectorAll(`input[type="checkbox"][value="${productName}"]`);

            // Atualiza Botões Simples (Ex: Salada de Frutas)
            simpleButtons.forEach(button => {
                const card = button.closest('.produto-card');
                if (!isAvailable) {
                    if (card) card.classList.add('produto-esgotado');
                    button.disabled = true;
                    button.innerHTML = '<i class="fas fa-times-circle"></i> Esgotado';
                } else {
                    if (card) card.classList.remove('produto-esgotado');
                    button.disabled = false;
                    button.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar';
                }
            });
            
            // Atualiza Opções dentro de Listas (Ex: Sucos, Tapiocas)
            options.forEach(option => {
                // Salva o texto original (com preço e formatação) na primeira vez
                if (!option.getAttribute('data-original-text')) {
                    option.setAttribute('data-original-text', option.textContent);
                }
                const originalText = option.getAttribute('data-original-text');

                option.disabled = !isAvailable;
                option.textContent = isAvailable ? originalText : `${originalText} (Esgotado)`;
            });

            // Atualiza Checkboxes (Adicionais)
            checkboxes.forEach(checkbox => {
                checkbox.disabled = !isAvailable;
                const label = checkbox.closest('label');
                if (label) {
                    if (!isAvailable) {
                        label.style.textDecoration = 'line-through';
                        label.style.color = '#999';
                        label.title = "Item esgotado";
                        checkbox.checked = false; // Desmarca se estiver esgotado
                    } else {
                        label.style.textDecoration = 'none';
                        label.style.color = '';
                        label.title = "";
                    }
                }
            });
        }

        // PASSO 2: Verifica os Selects (Se TODOS os itens do select estiverem esgotados, bloqueia o card inteiro)
        const allSelects = document.querySelectorAll('select');
        allSelects.forEach(select => {
            const options = Array.from(select.querySelectorAll('option'));
            if (options.length === 0) return;

            // Verifica se todas as opções estão desabilitadas
            const allDisabled = options.every(opt => opt.disabled);
            const card = select.closest('.produto-card');
            const btnAdd = card ? card.querySelector('.btn-add') : null;

            if (allDisabled && card && btnAdd) {
                card.classList.add('produto-esgotado');
                btnAdd.disabled = true;
                btnAdd.innerHTML = '<i class="fas fa-times-circle"></i> Esgotado';
            } else if (!allDisabled && card && btnAdd) {
                // Se tiver pelo menos um disponível, libera o card
                card.classList.remove('produto-esgotado');
                btnAdd.disabled = false;
                btnAdd.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar';
            }
        });
    },

    // --- ÁREA DO FUNCIONÁRIO (MENU SECRETO) ---
    setupAdminSecret() {
        const logo = document.querySelector('.logo'); // O elemento que receberá os cliques secretos
        if (!logo) return;

        let clickCount = 0;
        let clickTimer = null;

        logo.addEventListener('click', (e) => {
            // Conta os cliques
            clickCount++;
            
            if (clickTimer) clearTimeout(clickTimer);
            
            // Reseta a contagem se parar de clicar por 2 segundos
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);

            // Se atingir 5 cliques, pede a senha
            if (clickCount === 5) {
                const password = prompt("🔒 Acesso Restrito: Digite a senha de funcionário:");
                if (password === "1234") { // DEFINA SUA SENHA AQUI
                    this.openAdminPanel();
                } else if (password !== null) {
                    alert("Senha incorreta!");
                }
                clickCount = 0;
            }
        });
    },

    toggleProductAvailability(productName) {
        const product = this.products[productName];
        if (product) {
            // Em vez de mudar localmente, enviamos para o Firebase
            // O Firebase vai avisar a todos (inclusive nós mesmos) que mudou
            const novoStatus = !product.isAvailable;
            this.db.ref('estoque/' + productName).set(novoStatus);
            // Não precisamos chamar updateUI aqui, o ouvinte .on('value') fará isso
        }
    },

    openAdminPanel() {
        // Remove painel se já existir (para não duplicar)
        const existingPanel = document.getElementById('adminPanel');
        if (existingPanel) {
            // Se já existe e está minimizado, restaura ele
            if (existingPanel.getAttribute('data-minimized') === 'true') {
                this.toggleAdminPanelSize();
            }
            return;
        }

        // Cria o painel visualmente
        const panel = document.createElement('div');
        panel.id = 'adminPanel';
        panel.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: white; padding: 0; border-radius: 15px;
            box-shadow: 0 0 40px rgba(0,0,0,0.6); z-index: 9999;
            width: 90%; max-width: 450px; display: flex; flex-direction: column; max-height: 80vh;
            overflow: hidden; transition: all 0.3s ease;
        `;

        const isClosed = this.storeConfig.forceClosed;
        const isPrinterOn = this.storeConfig.printerActive;
        // Variável local para controlar a impressão via navegador
        const isWebPrinterActive = window.webPrinterActive || false;
        
        // Lista de produtos para controle de estoque
        let productListHTML = '';
        for (const productName in this.products) {
            const product = this.products[productName];
            const available = product.isAvailable;
            productListHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 0.8rem;">${available ? '🟢' : '🔴'}</span>
                        <span style="color: #333; font-size: 0.9rem;">${productName}</span>
                    </div>
                    <button onclick="deliverySystem.toggleProductAvailability('${productName}')" style="padding: 5px 10px; border: none; border-radius: 5px; font-size: 0.8rem; cursor: pointer; color: white; background: ${available ? '#c0392b' : '#27ae60'};">
                        ${available ? 'Esgotar' : 'Disponibilizar'}
                    </button>
                </div>
            `;
        }

        panel.innerHTML = `
            <div style="background: #f1f1f1; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; color: #333; font-size: 1rem;">Painel de Controle</h3>
                <div style="display: flex; gap: 10px;">
                    <button id="btnMinMax" onclick="deliverySystem.toggleAdminPanelSize()" title="Minimizar" style="border: none; background: none; cursor: pointer; font-size: 1.2rem; font-weight: bold; color: #27ae60;">➖</button>
                    <button onclick="document.getElementById('adminPanel').remove()" title="Fechar Totalmente" style="border: none; background: none; cursor: pointer; font-size: 1.2rem; font-weight: bold; color: #c0392b;">✖️</button>
                </div>
            </div>
            
            <div id="adminBody" style="padding: 20px; overflow-y: auto; display: flex; flex-direction: column; flex: 1; min-height: 0;">
                <div style="text-align: center; padding-bottom: 15px; border-bottom: 1px solid #ccc;">
                    <p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #27ae60;">☁️ Conectado ao Banco de Dados</p>
                    <button id="btnToggleStore" style="padding: 10px; width: 100%; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; color: white; background: ${isClosed ? '#27ae60' : '#c0392b'};">
                        ${isClosed ? 'LOJA FECHADA (CLIQUE PARA ABRIR)' : 'LOJA ABERTA (CLIQUE PARA FECHAR)'}
                    </button>
                    <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 8px; border: 1px solid #eee;">
                        <h4 style="margin: 0 0 5px 0; font-size: 0.9rem;">🖨️ Impressão Automática (Navegador)</h4>
                        <button id="btnToggleWebPrinter" style="padding: 10px; width: 100%; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; color: white; background: ${isWebPrinterActive ? '#27ae60' : '#7f8c8d'};">
                            ${isWebPrinterActive ? 'MONITORANDO PEDIDOS (ATIVO)' : 'ATIVAR IMPRESSÃO'}
                        </button>
                    </div>
                </div>
                <h4 style="margin: 15px 0 10px 0; color: #333; text-align: center;">Controle de Estoque</h4>
                <div style="overflow-y: auto; flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 5px; min-height: 150px;">${productListHTML}</div>
            </div>
        `;

        document.body.appendChild(panel);

        // Lógica do botão
        document.getElementById('btnToggleStore').addEventListener('click', () => {
            // Envia para o Firebase
            const novoStatus = !this.storeConfig.forceClosed;
            this.db.ref('config/forceClosed').set(novoStatus);
            alert(`Comando enviado! A loja será ${novoStatus ? 'FECHADA' : 'ABERTA'} para todos.`);
        });

        document.getElementById('btnToggleWebPrinter').addEventListener('click', () => {
            if (!window.webPrinterActive) {
                this.startWebPrinterListener();
                document.getElementById('btnToggleWebPrinter').textContent = "MONITORANDO PEDIDOS (ATIVO)";
                document.getElementById('btnToggleWebPrinter').style.background = "#27ae60";
                alert("✅ Impressão Automática Ativada!\n\n⚠️ IMPORTANTE: Mantenha esta aba do navegador aberta para que os pedidos sejam impressos.");
            } else {
                window.webPrinterActive = false;
                // Remove o aviso de segurança ao desativar manualmente
                window.removeEventListener('beforeunload', this.handleBeforeUnload);
                document.getElementById('btnToggleWebPrinter').textContent = "ATIVAR IMPRESSÃO";
                document.getElementById('btnToggleWebPrinter').style.background = "#7f8c8d";
                alert("Impressão automática pausada.");
            }
        });
    },

    // --- FUNÇÃO DE MINIMIZAR/MAXIMIZAR ---
    toggleAdminPanelSize() {
        const panel = document.getElementById('adminPanel');
        const body = document.getElementById('adminBody');
        const btn = document.getElementById('btnMinMax');
        
        if (!panel || !body) return;

        const isMinimized = panel.getAttribute('data-minimized') === 'true';

        if (isMinimized) {
            // MAXIMIZAR
            panel.setAttribute('data-minimized', 'false');
            body.style.display = 'flex';
            
            // Restaura estilos originais
            panel.style.width = '90%';
            panel.style.maxWidth = '450px';
            panel.style.height = 'auto';
            panel.style.maxHeight = '80vh';
            panel.style.top = '50%';
            panel.style.left = '50%';
            panel.style.transform = 'translate(-50%, -50%)';
            panel.style.borderRadius = '15px';
            
            btn.innerHTML = '➖';
            btn.title = "Minimizar";
        } else {
            // MINIMIZAR
            panel.setAttribute('data-minimized', 'true');
            body.style.display = 'none';
            
            // Estilo minimizado (canto inferior direito)
            panel.style.width = '250px';
            panel.style.maxWidth = 'none';
            panel.style.height = 'auto';
            panel.style.top = 'auto';
            panel.style.left = 'auto';
            panel.style.bottom = '20px';
            panel.style.right = '20px';
            panel.style.transform = 'none';
            panel.style.borderRadius = '10px';
            
            btn.innerHTML = '⬜'; // Ícone de maximizar
            btn.title = "Maximizar";
        }
    },

    // --- AVISO PARA NÃO FECHAR A JANELA ---
    handleBeforeUnload(e) {
        if (window.webPrinterActive) {
            const message = "A impressão automática está ativa. Fechar esta página irá interromper a impressão de novos pedidos. Tem certeza que deseja sair?";
            e.preventDefault(); // Necessário para a maioria dos navegadores
            e.returnValue = message; // Para navegadores mais antigos
            return message;
        }
    },

    // --- LÓGICA DE IMPRESSÃO WEB ---
    startWebPrinterListener() {
        if (window.webPrinterActive) return;
        window.webPrinterActive = true;
        const sessionStart = Date.now();

        // Cria área de impressão oculta
        if (!document.getElementById('printableArea')) {
            const printDiv = document.createElement('div');
            printDiv.id = 'printableArea';
            document.body.appendChild(printDiv);
            
            const style = document.createElement('style');
            style.innerHTML = `
                @media print {
                    body * { visibility: hidden; }
                    #printableArea, #printableArea * { visibility: visible; }
                    #printableArea { position: absolute; left: 0; top: 0; width: 100%; }
                    @page { margin: 0; size: auto; }
                }
            `;
            document.head.appendChild(style);
        }

        // Adiciona o "aviso de segurança" ao ativar a impressão
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        // Escuta novos pedidos
        this.db.ref('pedidos').limitToLast(1).on('child_added', (snapshot) => {
            if (!window.webPrinterActive) return;
            const pedido = snapshot.val();
            
            // Verifica se é um pedido novo (feito após ativar o painel ou nos últimos 30s)
            const isNew = (pedido.timestamp > sessionStart) || (Date.now() - pedido.timestamp < 30000);

            if (isNew) {
                this.printWebReceipt(pedido);
            }
        });
    },

    printWebReceipt(order) {
        const area = document.getElementById('printableArea');
        const cliente = order.cliente || {};
        const itens = order.itens || [];
        const valores = order.valores || {};
        const pagamento = order.pagamento || {};

        let html = `
            <div style="font-family: 'Courier New', monospace; font-size: 12px; width: 280px; color: black;">
                <div style="text-align: center; font-weight: bold; margin-bottom: 10px;">
                    NEGÃO DO SUCO NATURAL<br>--------------------------------
                </div>
                <div>Data: ${order.data}</div>
                <div>Cliente: ${cliente.nome || 'N/A'}</div>
                <div>Tel: ${cliente.telefone || 'N/A'}</div>
                <div>End: ${cliente.endereco}, ${cliente.numero}</div>
                <div>Bairro: ${cliente.bairro}</div>
                <div style="margin: 10px 0; border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 5px 0;">
        `;

        itens.forEach(item => {
            html += `<div style="display: flex; justify-content: space-between;"><span>${item.quantity}x ${item.name}</span><span>R$ ${(item.price * item.quantity).toFixed(2)}</span></div>`;
        });

        html += `</div>
                <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>R$ ${valores.subtotal.toFixed(2)}</span></div>
                <div style="display: flex; justify-content: space-between;"><span>Entrega:</span> <span>R$ ${valores.taxaEntrega.toFixed(2)}</span></div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-top: 5px;"><span>TOTAL:</span> <span>R$ ${valores.total.toFixed(2)}</span></div>
                <div style="margin-top: 10px;">Forma: ${pagamento.method.toUpperCase()}<br>`;

        if (pagamento.method === 'dinheiro' && pagamento.needChange === 'sim') {
            html += `Troco p/: R$ ${pagamento.changeValue.toFixed(2)}<br><strong>LEVAR TROCO: R$ ${pagamento.calculatedChange.toFixed(2)}</strong>`;
        }

        html += `</div><div style="text-align: center; margin-top: 20px;">--------------------------------<br>Fim do Pedido</div></div>`;

        area.innerHTML = html;
        // Pequeno delay para renderizar antes de imprimir
        setTimeout(() => window.print(), 500);
    },

    // Função para verificar horário de funcionamento
    checkOpeningHours() {
        // Prioridade 1: Verifica se a loja foi forçada a fechar manualmente.
        if (this.storeConfig.forceClosed) {
            this.storeConfig.isOpen = false;
        } else {
            // Prioridade 2: Lógica de horário normal
            const now = new Date();
            const currentHour = now.getHours();
            const { start, end } = this.storeConfig.openingHours;
            
            if (currentHour >= start && currentHour < end) {
                this.storeConfig.isOpen = true;
            } else {
                this.storeConfig.isOpen = false;
            }
        }
        
        // Atualiza o Banner Visual no Site
        this.updateStoreStatusUI();
    },

    // Nova Função: Mostra Banner de Loja Fechada (Estilo Letreiro/Marca d'água)
    updateStoreStatusUI() {
        let banner = document.getElementById('store-status-banner');
        
        // Cria o banner se não existir
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'store-status-banner';
            
            // Estilo Letreiro (Marquee) no Topo
            // pointer-events: none -> Permite clicar no logo/menu que está "atrás" do banner
            banner.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%;
                height: 35px;
                background: rgba(8, 65, 44, 0.4); /* Verde da marca (padrão do site) com transparência */
                color: white; 
                z-index: 9999; /* Fica acima do menu */
                box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
                display: none;
                overflow: hidden;
                white-space: nowrap;
                pointer-events: none; /* O SEGREDO: Permite clicar através do banner */
                backdrop-filter: blur(2px);
                font-family: 'Segoe UI', sans-serif;
                font-weight: bold;
                font-size: 0.9rem;
                line-height: 35px;
                text-transform: uppercase;
                letter-spacing: 1px;
            `;
            
            // Adiciona a animação CSS na página
            if (!document.getElementById('marquee-style')) {
                const style = document.createElement('style');
                style.id = 'marquee-style';
                style.innerHTML = `
                    @keyframes marquee {
                        from { transform: translateX(100vw); }
                        to { transform: translateX(-100%); }
                    }
                    .marquee-content {
                        display: inline-block;
                        animation: marquee 20s linear infinite;
                    }
                `;
                document.head.appendChild(style);
            }
            
            banner.innerHTML = '<div class="marquee-content" id="marquee-text"></div>';
            document.body.appendChild(banner);
        }

        const marqueeText = banner.querySelector('#marquee-text');

        if (!this.storeConfig.isOpen) {
            banner.style.display = 'block';
            const motivo = this.storeConfig.forceClosed ? "FECHADO TEMPORARIAMENTE" : "LOJA FECHADA";
            const horario = `${this.storeConfig.openingHours.start}:00 às ${this.storeConfig.openingHours.end}:00`;
            
            // Texto do letreiro
            marqueeText.textContent = `🚨 ${motivo} • HORÁRIO: ${horario} • NÃO ESTAMOS RECEBENDO PEDIDOS NO MOMENTO 🚨`;
        } else {
            banner.style.display = 'none';
        }
    },

    addToCart(productName) {
        const product = this.products[productName];
        if (!product || !product.isAvailable) {
            alert(`Desculpe, ${productName} está esgotado no momento.`);
            return;
        }

        const existingItem = this.cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
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

    // Trava de Horário (Estilo CardapioWeb)
    deliverySystem.checkOpeningHours();
    if (!deliverySystem.storeConfig.isOpen) {
        // Mensagem personalizada se estiver fechado manualmente ou por horário
        const alertMessage = deliverySystem.storeConfig.forceClosed
            ? "No momento, estamos fechados para recebimento de novos pedidos. Voltaremos em breve!"
            : `Estamos fechados no momento! Nosso horário de funcionamento é das ${deliverySystem.storeConfig.openingHours.start}:00 às ${deliverySystem.storeConfig.openingHours.end}:00.`;
        
        alert(alertMessage);
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
        // Normaliza o texto digitado pelo cliente para um formato padrão
        const bairroDigitado = formData.get('bairro');
        const bairroNormalizado = bairroDigitado
            .trim() // 1. Remove espaços extras no início e no fim
            .toLowerCase() // 2. Converte tudo para minúsculo
            .replace(/\b\w/g, char => char.toUpperCase()); // 3. Converte a primeira letra de cada palavra para maiúsculo
        
        // Cálculo dinâmico da taxa
        let taxaCalculada = deliverySystem.storeConfig.neighborhoodFees['Outros'];
        
        // A comparação agora é feita com o texto tratado, tornando-a mais inteligente
        if (deliverySystem.storeConfig.neighborhoodFees[bairroNormalizado]) {
            taxaCalculada = deliverySystem.storeConfig.neighborhoodFees[bairroNormalizado];
        }

        deliverySystem.deliveryFee = taxaCalculada;

        deliverySystem.orderData.delivery = {
            nome: formData.get('nome'),
            telefone: formData.get('telefone'),
            cep: formData.get('cep'),
            cidade: formData.get('cidade'),
            endereco: formData.get('endereco'),
            numero: formData.get('numero'),
            complemento: formData.get('complemento'),
            bairro: bairroNormalizado, // Salva o nome do bairro já corrigido
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
    
    const whatsappUrl = `https://wa.me/5521974440502?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // --- SALVAR NO BANCO DE DADOS (HISTÓRICO DE VENDAS) ---
    if (deliverySystem.db) {
        const novoPedido = {
            data: new Date().toLocaleString('pt-BR'),
            timestamp: Date.now(), // Útil para ordenar do mais recente para o mais antigo
            cliente: delivery,     // Salva nome, endereço, telefone, bairro...
            itens: items,          // Salva a lista de produtos comprados
            pagamento: payment,    // Salva forma de pagamento e troco
            valores: {
                subtotal: subtotal,
                taxaEntrega: deliverySystem.deliveryFee,
                total: total
            }
        };
        deliverySystem.db.ref('pedidos').push(novoPedido);
    }

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

// NOVA FUNÇÃO: Adicionar item principal + Checkboxes de adicionais
function adicionarComAdicionais(idSelect, idContainerAdicionais) {
    const selectElement = document.getElementById(idSelect);
    const containerAdicionais = document.getElementById(idContainerAdicionais);
    
    if (!selectElement || !containerAdicionais) return;

    // 1. Pega o produto principal
    const nomePrincipal = selectElement.value;
    const produtoPrincipal = deliverySystem.products[nomePrincipal];

    if (!produtoPrincipal || !produtoPrincipal.isAvailable) {
        alert(`Desculpe, ${nomePrincipal} está esgotado no momento.`);
        return;
    }

    let nomeFinal = nomePrincipal;
    let precoFinal = produtoPrincipal.price;

    // 2. Varre os checkboxes marcados
    const checkboxes = containerAdicionais.querySelectorAll('input[type="checkbox"]:checked');
    
    for (const checkbox of checkboxes) {
        const nomeCompletoAdicional = checkbox.value; // Ex: "Adicional Queijo"
        
        // Verificação de Segurança: O adicional está disponível?
        if (deliverySystem.products[nomeCompletoAdicional] && !deliverySystem.products[nomeCompletoAdicional].isAvailable) {
            alert(`O item ${nomeCompletoAdicional} acabou de esgotar. Por favor, desmarque-o.`);
            return; // Interrompe o processo de forma limpa
        }

        const nomeAdicional = nomeCompletoAdicional.replace('Adicional ', ''); // Ex: "Queijo"
        
        // Busca o preço no sistema central (delivery.js) para garantir consistência
        let precoAdicional = 0;
        if (deliverySystem.products[nomeCompletoAdicional]) {
            precoAdicional = deliverySystem.products[nomeCompletoAdicional].price;
        } else {
            // Fallback: se não achar no sistema, pega do HTML
            precoAdicional = parseFloat(checkbox.getAttribute('data-price'));
        }

        nomeFinal += ` + ${nomeAdicional}`;
        precoFinal += precoAdicional;
    }

    // 3. Adiciona ao carrinho manualmente (Bypassing a função padrão para permitir nome composto)
    // Verifica se esse combo exato já existe no carrinho
    const existingItem = deliverySystem.cart.find(item => item.name === nomeFinal);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        deliverySystem.cart.push({
            name: nomeFinal,
            price: precoFinal,
            quantity: 1,
            color: produtoPrincipal.color, // Usa a cor/ícone do item principal
            icon: produtoPrincipal.icon
        });
    }

    // 4. Atualiza UI e Salva
    deliverySystem.saveCart();
    deliverySystem.updateCartUI();
    
    // Limpa os checkboxes para o próximo pedido
    checkboxes.forEach(cb => cb.checked = false);

    if (typeof showNotification === 'function') {
        showNotification(`${nomePrincipal} adicionado com sucesso!`);
    }
}

window.adicionarComAdicionais = adicionarComAdicionais;