const render = document.getElementById('render');
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

const getHash = () => window.location.hash.substring(1);

const isLight = () => localStorage.getItem('lightMode');

const setLight = () => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    localStorage.setItem('lightMode', '1');
};

const setDark = () => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');

    localStorage.removeItem('lightMode');
};

const showSucessPopup = () => {
    document.body.classList.add('submitShow');

    setTimeout(() => {
        document.body.classList.remove('submitShow');
    }, 1500);
};

const detectTheme = () => {
    const lightMode = isLight();

    if (lightMode) {
        setLight();
    }
};
detectTheme();

const detectScale = () => {
    const fontSizeHint = document.getElementById('font-size');
    const fontSize = localStorage.getItem('fontSize');

    if (fontSize !== null) {
        fontSizeHint.textContent = fontSize;
        document.documentElement.style.fontSize = `${fontSize}px`;
    }
};
detectScale();

const changeTheme = () => {
    const themeButton = document.getElementById('theme-item');

    themeButton?.addEventListener('click', (ev) => {
        const lightSelected = isLight();

        if (lightSelected) {
            setDark();
        } else {
            setLight();
        }
    });
};
changeTheme();

const contactOnSubmit = () => {
    const formContact = document.getElementById('contate-nos');

    if (formContact) {
        formContact.addEventListener('submit', (ev) => {
            ev.preventDefault();
            formContact.reset();

            showSucessPopup();
        });
    }
};

const renderItem = (array) => array.map((item) => `<li>${item}</li>`).join('\n');

const renderMember = (props) => {
    const { name, bio, photo, skills, experiences, education } = props;

    return `
    <hr class="separator" />
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

const renderMembers = () => {
    const members = window.members;
    const container = document.getElementById('sobre');

    if (container) {
        members.forEach((member) => {
            container.insertAdjacentHTML('beforeend', renderMember(member));
        });
    }
};
renderMembers();

const scaleControl = () => {
    const fontControl = document.querySelector('.font-control');
    const fontSizeHint = document.getElementById('font-size');

    fontControl.addEventListener('click', (ev) => {
        let fontSize;

        if (ev.target.closest('.lucide-plus')) {
            fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) + 2;
            document.documentElement.style.fontSize = `${fontSize}px`;
        }

        if (ev.target.closest('.lucide-minus')) {
            fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) - 2;
            document.documentElement.style.fontSize = `${fontSize}px`;
        }

        if (fontSize !== null) {
            localStorage.setItem('fontSize', fontSize.toString());
            fontSizeHint.textContent = fontSize;
        }
    });
};
scaleControl();

const settingsToggle = () => {
    const settings = document.getElementById('settings-item');

    settings.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (!ev.target.closest('#settings-menu')) {
            document.body.classList.toggle('settingsShow');
        }
    });
};
settingsToggle();

const hashLink = () => {
    const navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach((navLink) => {
        if (getHash() === navLink.hash.substring(1)) {
            navLink.classList.add('hashed');
        } else {
            navLink.classList.remove('hashed');
        }
    });
};

const changePage = () => {
    const pageType = getHash();
    const pageUse = pages.find((page) => page.type === pageType);

    if (pageUse) {
        render.innerHTML = pageUse.html;

        if (pageUse.type === 'contato') {
            contactOnSubmit();
        }

        hashLink();
    } else {
        render.innerHTML = '<h1>Página não encontrada</h1>';
    }

    if (getHash() === '') {
        render.innerHTML = pages[0].html;
    }
};

const loadPages = async () => {
    const promises = pages.map(async (page, i) => {
        const res = await fetch(page.path);
        const resText = await res.text();
        pages[i].html = resText;
    });

    await Promise.all(promises);
    changePage();
};
loadPages();

window.addEventListener('hashchange', changePage);
