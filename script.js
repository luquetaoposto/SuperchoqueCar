document.addEventListener("DOMContentLoaded", () => {

    /* ===================================================
       1. ALTERNÂNCIA DE TEMA (MODO ESCURO E CLARO)
       =================================================== */
    const toggleThemeBtn = document.getElementById("toggle-theme");
    const body = document.body;

    toggleThemeBtn.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        
        // Atualiza ícone do botão
        const icon = toggleThemeBtn.querySelector("i");
        if (body.classList.contains("light-theme")) {
            icon.className = "fas fa-sun";
        } else {
            icon.className = "fas fa-moon";
        }
    });

    /* ===================================================
       2. CONTROLE DO TAMANHO DA FONTE (A+, A, A-)
       =================================================== */
    const increaseFontBtn = document.getElementById("increase-font");
    const resetFontBtn = document.getElementById("reset-font");
    const decreaseFontBtn = document.getElementById("decrease-font");
    
    let currentScale = 100; // Porcentagem inicial

    increaseFontBtn.addEventListener("click", () => {
        if (currentScale < 130) { // Limite máximo 130%
            currentScale += 10;
            document.documentElement.style.setProperty('--font-scale', `${currentScale}%`);
        }
    });

    decreaseFontBtn.addEventListener("click", () => {
        if (currentScale > 80) { // Limite mínimo 80%
            currentScale -= 10;
            document.documentElement.style.setProperty('--font-scale', `${currentScale}%`);
        }
    });

    resetFontBtn.addEventListener("click", () => {
        currentScale = 100;
        document.documentElement.style.setProperty('--font-scale', '100%');
    });

    /* ===================================================
       3. BOTÃO DE ACESSO RÁPIDO PARA LIBRAS (PARA SURDOS)
       =================================================== */
    const librasBtn = document.getElementById("libras-btn");
    librasBtn.addEventListener("click", () => {
        // Dispara a abertura do widget do VLibras
        const vlibrasBtn = document.querySelector('[vw-access-button]');
        if (vlibrasBtn) {
            vlibrasBtn.click();
        } else {
            alert("O assistente de LIBRAS está sendo ativado na tela.");
        }
    });

    /* ===================================================
       4. FILTRO DE VEÍCULOS NO CATÁLOGO
       =================================================== */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const carCards = document.querySelectorAll(".car-card");

    filterBtns.addEventListener("click", (e) => {
        const targetBtn = e.target;
        if (!targetBtn.classList.contains("filter-btn")) return;

        // Atualizar estado ativo dos botões
        filterBtns.forEach(btn => btn.classList.remove("active"));
        targetBtn.classList.add("active");

        const filterValue = targetBtn.getAttribute("data-filter");

        // Filtrar cards
        carCards.forEach(card => {
            const categories = card.getAttribute("data-category");

            if (filterValue === "all" || categories.includes(filterValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    /* ===================================================
       5. CHAT DE ATENDIMENTO ON-LINE (SIMULAÇÃO ACESSÍVEL)
       =================================================== */
    const startChatBtn = document.getElementById("start-chat-btn");
    const closeChatBtn = document.getElementById("close-chat");
    const chatModal = document.getElementById("chat-modal");
    const sendChatBtn = document.getElementById("send-chat-btn");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    // Abrir Chat
    startChatBtn.addEventListener("click", () => {
        chatModal.classList.remove("hidden");
        chatInput.focus();
    });

    // Fechar Chat
    closeChatBtn.addEventListener("click", () => {
        chatModal.classList.add("hidden");
    });

    // Enviar Mensagem
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text !== "") {
            // Mensagem do usuário
            const userMsg = document.createElement("div");
            userMsg.className = "chat-msg user";
            userMsg.textContent = text;
            chatBody.appendChild(userMsg);

            chatInput.value = "";
            chatBody.scrollTop = chatBody.scrollHeight;

            // Resposta automática do sistema
            setTimeout(() => {
                const sysMsg = document.createElement("div");
                sysMsg.className = "chat-msg system";
                sysMsg.textContent = "Atendente: Obrigado pela mensagem! Um de nossos especialistas em carros elétricos já vai te atender.";
                chatBody.appendChild(sysMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }

    sendChatBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
