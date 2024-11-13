// Renderiza o conteúdo da página
const renderContainer = document.getElementById('render');

// Define as páginas e seus caminhos
const pages = [
    { type: 'sobre', path: 'assets/pages/sobre.html' },
    { type: 'galeria', path: 'assets/pages/galeria.html' },
    { type: 'contato', path: 'assets/pages/contato.html' },
];

// Utils
const getHashValue = () => window.location.hash.substring(1);
const getLocalStorageItem = key => localStorage.getItem(key);
const setLocalStorageItem = (key, value) => localStorage.setItem(key, value);
const removeLocalStorageItem = key => localStorage.removeItem(key);

// Tema
const enableLightTheme = () => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    setLocalStorageItem('lightMode', '1');
};

const enableDarkTheme = () => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    removeLocalStorageItem('lightMode');
};

const toggleTheme = () => {
    const isLightMode = getLocalStorageItem('lightMode');
    isLightMode ? enableDarkTheme() : enableLightTheme();
};

// Configura tema inicial
const applyInitialTheme = () => {
    if (getLocalStorageItem('lightMode')) enableLightTheme();
};

// Fonte
const applyFontSize = () => {
    const fontSize = getLocalStorageItem('fontSize');
    if (fontSize) document.documentElement.style.fontSize = `${fontSize}px`;
};

const updateFontSize = (increase = true) => {
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    fontSize = increase ? fontSize + 2 : fontSize - 2;
    document.documentElement.style.fontSize = `${fontSize}px`;
    setLocalStorageItem('fontSize', fontSize);
};

// Controle de fonte
const setupFontControls = () => {
    document.querySelector('.font-control')?.addEventListener('click', ev => {
        ev.target.closest('.increase') ? updateFontSize(true) : updateFontSize(false);
    });
};

// Exibição de Popup
const showSuccessPopup = () => {
    document.body.classList.add('show-success-popup');
    setTimeout(() => document.body.classList.remove('show-success-popup'), 1500);
};

// Formulário de contato
const setupContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            contactForm.reset();
            showSuccessPopup();
        });
    }
};

// Renderiza membros
const renderMemberCard = ({ name, bio, photo, skills, experiences, education }, index) => `
    ${index !== 0 ? '<hr class="separator" />' : ''}
    <article class="member-card">
        <h1>${name}</h1>
        <p>${bio}</p>
        <img src="${photo}" alt="${name}" />
        <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <ul>${experiences.map(exp => `<li>${exp}</li>`).join('')}</ul>
        <ul><li>${education}</li></ul>
    </article>
`;

const renderMembers = members => {
    const container = document.getElementById('members');
    container.innerHTML = members.map(renderMemberCard).join('');
};

// Página
const renderPage = pageType => {
    const page = pages.find(p => p.type === pageType);
    if (page) renderContainer.innerHTML = page.html;
};

const setupPageContent = async () => {
    await Promise.all(
        pages.map(async (page, index) => {
            const response = await fetch(page.path);
            const html = await response.text();
            pages[index].html = html;
        })
    );
    renderPage(getHashValue() || 'sobre');
};

// Eventos e Inicialização
const setupEventListeners = () => {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    window.addEventListener('hashchange', () => renderPage(getHashValue()));
};

const init = () => {
    applyInitialTheme();
    applyFontSize();
    setupFontControls();
    setupEventListeners();
    setupPageContent();
};

init();
