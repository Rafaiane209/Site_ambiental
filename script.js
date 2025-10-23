

const db = firebase.firestore();
const arvoresContainer = document.getElementById("arvoresContainer");


async function carregarArvores() {
    try {
        const snapshot = await db.collection("arvores").get();
        
       
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
        
       
        arvoresContainer.innerHTML = '';
        
        if (snapshot.empty) {
            arvoresContainer.innerHTML = `
                <div class="no-trees" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p>Nenhuma árvore cadastrada ainda.</p>
                    <p>Visite a área de administração para adicionar árvores.</p>
                </div>
            `;
            return;
        }
        
        snapshot.forEach(doc => {
            const arvore = doc.data();
            const card = document.createElement("div");
            card.className = "arvore-card";
            card.setAttribute("role", "listitem");
            card.innerHTML = `
                <img src="${arvore.imagem}" alt="${arvore.nome}" loading="lazy">
                <h3>${arvore.nome}</h3>
                <p>${arvore.descricao}</p>
                <a href="${arvore.qrcode}" target="_blank" aria-label="Ver QR Code da árvore ${arvore.nome}">
                    <span aria-hidden="true">🔗</span> QR Code
                </a>
            `;
            arvoresContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar árvores:", error);
        arvoresContainer.innerHTML = `
            <div class="error" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #d32f2f;">
                <p>Ocorreu um erro ao carregar as árvores.</p>
                <p>Tente recarregar a página.</p>
            </div>
        `;
    }
}


function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
        

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
            });
        });
    }
}


window.onload = function() {
    carregarArvores();
    setupMobileMenu();
};


document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('arvore-card')) {
                const link = focusedElement.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        }
    });
});