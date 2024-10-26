const detectTheme = () => {
    const lightMode = localStorage.getItem('lightMode');

    if (lightMode) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
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
    const themeButton = document.getElementById('theme');

    if (themeButton) {
        themeButton.addEventListener('change', (ev) => {
            if (themeButton.checked) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');

                localStorage.removeItem('lightMode');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');

                localStorage.setItem('lightMode', '1');
            }
        });
    }
};
changeTheme();

const contactOnSubmit = () => {
    const formContact = document.getElementById('contate-nos');

    if (formContact) {
        formContact.addEventListener('submit', (ev) => {
            ev.preventDefault();
            formContact.reset();

            document.body.classList.add('submitShow');

            setTimeout(() => {
                document.body.classList.remove('submitShow');
            }, 1500);
        });
        console.log(formContact);
    }
};
contactOnSubmit();

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
    const container = document.getElementById('integrantes');

    if (container) {
        members.forEach((member) => {
            container.insertAdjacentHTML('beforeend', renderMember(member));
        });

        console.log('Members loaded');
    }
};
renderMembers();

const scaleControl = () => {
    const fontControl = document.querySelector('.font-control');
    const fontSizeHint = document.getElementById('font-size');

    fontControl.addEventListener('click', (ev) => {
        let fontSize;
        console.log(ev, ev.target);

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

    if (settings) {
        settings.addEventListener('click', (ev) => {
            ev.preventDefault();
            document.body.classList.toggle('settingsShow');
        });
    }
};
settingsToggle();
