// Elemento onde o conteúdo da página será renderizado
const render = document.getElementById('render');

// Array de objetos representando as páginas com tipo e caminho de cada uma
const pages = [
    {
        type: 'sobre',
        path: 'assets/pages/sobre.html',
    },
    {
        type: 'galeria',
        path: 'assets/pages/galeria.html',
    },
    {
        type: 'contato',
        path: 'assets/pages/contato.html',
    },
];

// Função para obter o valor atual do hash da URL, removendo o caractere '#'
const getHash = () => window.location.hash.substring(1);

// Função que verifica se o modo claro está ativado, verificando o valor armazenado no localStorage
const isLight = () => localStorage.getItem('lightMode');

// Função que ativa o tema claro, ajustando as classes e salvando a preferência no localStorage
const setLight = () => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('lightMode', '1');
};

// Função que ativa o tema escuro, ajustando as classes e removendo a preferência do localStorage
const setDark = () => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.removeItem('lightMode');
};

// Função que exibe um popup de sucesso ao enviar o formulário de contato, com timeout para ocultar
const showSucessPopup = () => {
    document.body.classList.add('submitShow');
    setTimeout(() => {
        document.body.classList.remove('submitShow');
    }, 1500);
};

// Função que detecta o tema (claro/escuro) baseado no localStorage e aplica-o
const detectTheme = () => {
    const lightMode = isLight();
    if (lightMode) {
        setLight();
    }
};
detectTheme(); // Chamada inicial para aplicar o tema ao carregar a página

// Função que detecta o tamanho de fonte configurado, aplicando-o ao elemento raiz da página
const detectScale = () => {
    const fontSizeHint = document.getElementById('font-size'); // Elemento que exibe o tamanho da fonte
    const fontSize = localStorage.getItem('fontSize'); // Valor salvo do tamanho da fonte
    if (fontSize !== null) {
        fontSizeHint.textContent = fontSize;
        document.documentElement.style.fontSize = `${fontSize}px`;
    }
};
detectScale(); // Chamada inicial para aplicar o tamanho de fonte ao carregar a página

// Função que alterna entre os temas claro e escuro quando o botão de tema é clicado
const changeTheme = () => {
    const themeButton = document.getElementById('theme-item');
    themeButton?.addEventListener('click', () => {
        const lightSelected = isLight();
        if (lightSelected) {
            setDark();
        } else {
            setLight();
        }
    });
};
changeTheme(); // Chamada inicial para configurar o evento de clique do botão de tema

// Função que configura o formulário de contato para mostrar uma confirmação ao enviar
const contactOnSubmit = () => {
    const formContact = document.getElementById('contate-nos');
    if (formContact) {
        formContact.addEventListener('submit', ev => {
            ev.preventDefault();
            formContact.reset(); // Reseta o formulário
            showSucessPopup(); // Exibe popup de sucesso
        });
    }
};

const sortIntegrantes = array => {
    array.sort((a, b) => {
        if (a.nome < b.nome) {
            return -1; // a vem antes de b
        }
        if (a.nome > b.nome) {
            return 1; // b vem antes de a
        }
        return 0; // são iguais
    });
};

// Função auxiliar para renderizar uma lista de itens em HTML
const renderItem = array => array.map(item => `<li>${item}</li>`).join('\n');

// Função que renderiza as informações de um membro em HTML, incluindo nome, bio, foto, etc.
const renderMember = (props, index) => {
    const { name, bio, photo, skills, experiences, education } = props;
    return `
    ${index !== 0 ? '<hr class="separator" />' : ''}
    <article class="integrante">
        <div class="desc">
            <div>
                <h1 class="nome">${name}</h1>
                <p class="integrante-info">${bio}</p>
                <hr class="separator" />
                <div class="competencias">
                    <header>Competências:</header>
                    <ul>
                        ${renderItem(skills)}
                    </ul>
                </div>
                <div class="experiencias">
                    <header>Experiências profissionais:</header>
                    <ul>
                        ${renderItem(experiences)}
                    </ul>
                </div>
                <div class="escolaridade">
                    <header>Escolaridade:</header>
                    <ul>
                        <li>${education}</li>
                    </ul>
                </div>
            </div>
            <figure class="img-container">
                <img class="profile" width="100%" src="${photo}" alt="${name}" />
                <figcaption>${name}</figcaption>
            </figure>
        </div>
    </article>
  `;
};

// Função que renderiza todos os membros na página "Sobre" a partir dos dados fornecidos
const renderMembers = () => {
    window.members.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    // const members = sortIntegrantes(window.members); // Array ordenado global de membros
    const members = window.members; // Array global de membros
    const container = document.getElementById('sobre'); // Container para os membros
    if (container) {
        members.forEach((member, index) => {
            container.insertAdjacentHTML('beforeend', renderMember(member, index));
        });
    }
};
renderMembers(); // Chamada inicial para renderizar os membros

// Função que controla o ajuste de tamanho de fonte, aumentando ou diminuindo o valor e salvando-o
const scaleControl = () => {
    const fontControl = document.querySelector('.font-control'); // Container de controle de fonte
    const fontSizeHint = document.getElementById('font-size'); // Elemento que exibe o tamanho da fonte
    fontControl.addEventListener('click', ev => {
        let fontSize;
        if (ev.target.closest('.lucide-plus')) {
            // Se botão de aumentar foi clicado
            fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) + 2;
            document.documentElement.style.fontSize = `${fontSize}px`;
        }
        if (ev.target.closest('.lucide-minus')) {
            // Se botão de diminuir foi clicado
            fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) - 2;
            document.documentElement.style.fontSize = `${fontSize}px`;
        }
        if (fontSize !== null) {
            localStorage.setItem('fontSize', fontSize.toString());
            fontSizeHint.textContent = fontSize;
        }
    });
};
scaleControl(); // Chamada inicial para configurar o controle de fonte

const cardControl = () => {
    const toggle = document.getElementById('card-toggle');
    const css = document.getElementById('card-css');

    if (toggle && css) {
        toggle.addEventListener('change', ev => {
            if (toggle.checked) {
                css.disabled = !1;
                localStorage.setItem('cardsView', '1');
            } else {
                css.disabled = !0;
                localStorage.setItem('cardsView', '0');
            }
        });
    }
};
cardControl();

const cardControlOnce = () => {
    const toggle = document.getElementById('card-toggle');
    const css = document.getElementById('card-css');
    const cardView = localStorage.getItem('cardsView');

    if (cardView && cardView === '1') {
        toggle.checked = !0;
        css.disabled = !1;
    }
};
cardControlOnce();

// Função que alterna a exibição do menu de configurações ao clicar no botão de configurações
const settingsToggle = () => {
    const settings = document.getElementById('settings-item');
    settings.addEventListener('click', ev => {
        // ev.preventDefault();
        ev.stopImmediatePropagation();
        if (!ev.target.closest('#settings-menu')) {
            document.body.classList.toggle('settingsShow');
        }
    });
};
settingsToggle(); // Chamada inicial para configurar o evento de clique do botão de configurações

// Função que aplica a classe `hashed` aos links de navegação baseados no hash atual da URL
const hashLink = () => {
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(navLink => {
        if (getHash() === navLink.hash.substring(1)) {
            navLink.classList.add('hashed');
        } else {
            navLink.classList.remove('hashed');
        }
    });
};

// Remove o skeleton de carregamento
const hideSkeleton = () => {
    const skeleton = document.getElementsByClassName('skeleton');
    [...skeleton]?.forEach(e => e.remove());
};

// Função que muda o conteúdo da página com base no hash atual da URL
const changePage = () => {
    const pageType = getHash(); // Tipo de página a ser exibida
    const pageUse = pages.find(page => page.type === pageType); // Página correspondente

    if (getHash() === '') {
        window.location.hash = '#sobre';
        return;
    }

    render.innerHTML = pageUse.html; // Define o conteúdo da página

    if (pageUse.type === 'contato') {
        contactOnSubmit();
    }

    if (pageUse.type === 'sobre') {
        // Simular delay
        setTimeout(() => {
            renderMembers(); // Renderiza os membros da equipe
            hideSkeleton(); // Remove o skeleton de carregamento
        }, 1500);
    }
    hashLink();
};

// Função que carrega o conteúdo das páginas listadas em `pages` de forma assíncrona
const loadPages = async () => {
    const promises = pages.map(async (page, i) => {
        const res = await fetch(page.path); // Faz uma requisição para obter o conteúdo da página
        const resText = await res.text(); // Converte a resposta para texto
        pages[i].html = resText; // Armazena o conteúdo HTML na propriedade html
    });
    await Promise.all(promises); // Aguarda que todas as páginas sejam carregadas
    changePage(); // Exibe a primeira página após o carregamento
};

loadPages(); // Chamada inicial para carregar as páginas

// Adiciona o evento `hashchange` para alterar a página ao mudar o hash da URL
window.addEventListener('hashchange', changePage);
