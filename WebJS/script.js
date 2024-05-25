function createElement(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        key.startsWith('on') ? element.addEventListener(key.substring(2).toLowerCase(), attributes[key]) : element.setAttribute(key, attributes[key]);
    }
    children.forEach(child => typeof child === 'string' ? element.appendChild(document.createTextNode(child)) : element.appendChild(child));
    return element;
}

function addGlobalStyles() {
    const style = createElement('style', {}, `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; }
        header { background-color: #0056b3; color: white; text-align: center; padding: 20px; width: 100%; box-sizing: border-box; }
        header h1 { margin: 0; font-size: 2rem; }
        nav { background-color: #1a1a1a; padding: 10px 0; margin: 0; }
        nav ul { list-style-type: none; display: flex; justify-content: center; gap: 20px; padding: 0; margin: 0; width: 100%; }
        nav ul li { margin: 0; }
        nav ul li a { color: #fff; text-decoration: none; font-weight: 600; }
        main { background-color: #fff; padding: 20px; }
        main section { margin-bottom: 40px; }
        footer { background-color: #333; color: white; padding: 10px; text-align: center; }
    `);
    document.head.appendChild(style);
}

function createHeader() {
    const header = document.querySelector('header');
    header.innerHTML = '';
    header.appendChild(createElement('h1', {}, 'Squirtle'));
}

function createNav() {
    const nav = document.querySelector('nav');
    nav.innerHTML = '';
    const ul = createElement('ul');
    const navItems = [
        { href: '#info-squirtle', text: 'Informações sobre Squirtle' },
        { href: '#caracteristicas', text: 'Características' },
        { href: '#curiosidades', text: 'Curiosidades' },
        { href: '#artigo-squirtle', text: 'Artigo sobre Squirtle' },
        { href: '#recursos', text: 'Recursos Adicionais' },
        { href: '#evolucao', text: 'Evolução' },
    ];
    navItems.forEach(item => {
        const li = createElement('li');
        li.appendChild(createElement('a', { href: item.href }, item.text));
        ul.appendChild(li);
    });
    nav.appendChild(ul);
}

function createMain() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const sections = [
        { id: 'info-squirtle', title: 'Informações sobre Squirtle', content: '<div><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle 1" /><img src="https://archives.bulbagarden.net/media/upload/thumb/7/79/Squirtle_SSBU.png/200px-Squirtle_SSBU.png" alt="Squirtle 2" /></div><p>Squirtle é um Pokémon do tipo Água. É o Pokémon inicial da região de Kanto e evolui para Wartortle.</p>' },
        { id: 'caracteristicas', title: 'Características', content: '<p>Squirtle é conhecido por sua concha nas costas, que oferece proteção adicional. Ele possui ataques de água poderosos, como Water Gun e Hydro Pump.</p>' },
        { id: 'curiosidades', title: 'Curiosidades', content: '<ul><li>Squirtle é um dos Pokémon mais populares e adoráveis.</li><li>Seu nome deriva das palavras "squirrel" (esquilo) e "turtle" (tartaruga).</li><li>Squirtle é frequentemente escolhido por treinadores para começar sua jornada Pokémon.</li></ul>' },
        { id: 'artigo-squirtle', title: 'Squirtle: O Amigo Aquático', content: '<p>Squirtle, com sua aparência simpática e sua habilidade em controlar a água, conquistou o coração de treinadores Pokémon ao redor do mundo. Sendo o inicial de água na região de Kanto, Squirtle é uma escolha popular para aqueles que buscam equilíbrio e versatilidade em suas equipes.</p><p>Sua concha nas costas não apenas oferece proteção, mas também é um símbolo de resistência. Ao evoluir para Wartortle e, posteriormente, para Blastoise, Squirtle se transforma em uma força formidável, dominando ataques aquáticos que podem surpreender adversários em batalhas.</p><p>Além de suas habilidades de batalha, Squirtle é conhecido por seu carisma. Treinadores muitas vezes descrevem a relação com seu Squirtle como uma amizade profunda, tornando-o não apenas um companheiro de lutas, mas um amigo leal ao longo de suas jornadas.</p>' },
        { id: 'recursos', title: 'Recursos Adicionais', content: '<ul><li><a href="https://www.pokemon.com/br/pokedex/squirtle" target="_blank">Pokédex - Squirtle</a></li><li><a href="https://bulbapedia.bulbagarden.net/wiki/Squirtle_(Pok%C3%A9mon)" target="_blank">Bulbapedia - Squirtle</a></li></ul>' },
        { id: 'evolucao', title: 'Evoluções', content: '<ul><li><a href="./pages/pokemon/index.html?name=squirtle"><figure><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png" alt="Squirtle" /><figcaption>1. Squirtle</figcaption></figure></a></li><li><a href="./pages/pokemon/index.html?name=wartortle"><figure><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png" alt="Wartortle" /><figcaption>2. Wartortle</figcaption></figure></a></li><li><a href="./pages/pokemon/index.html?name=blastoise"><figure><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png" alt="Blastoise" /><figcaption>3. Blastoise</oise</figcaption></figure></a></li></ul>' }
    ];
    sections.forEach(sectionData => {
        const section = createElement('section', { id: sectionData.id, 'aria-labelledby': `${sectionData.id}-label` });
        section.appendChild(createElement('h2', { id: `${sectionData.id}-label` }, sectionData.title));
        section.innerHTML += sectionData.content;
        main.appendChild(section);
    });
}

function createFooter() {
    const footer = document.querySelector('footer');
    footer.innerHTML = '';
    const copyright = createElement('p', { 'aria-label': 'Copyright' }, '© 2024 Página do Pokémon Squirtle. Todos os direitos reservados.');
    const backToTop = createElement('p', {}, createElement('a', { href: '#header' }, 'Voltar para o topo'));
    const email = createElement('p', {}, createElement('a', { href: 'mailto:contato@squirtlepage.com' }, 'Contato via e-mail'));
    const phone = createElement('p', {}, createElement('a', { href: 'tel:+5555555555' }, 'Telefone: (55) 5555-5555'));
    footer.appendChild(copyright);
    footer.appendChild(backToTop);
    footer.appendChild(email);
    footer.appendChild(phone);
}

function initializeSite() {
    addGlobalStyles();
    createHeader();
    createNav();
    createMain();
    createFooter();
}

document.addEventListener('DOMContentLoaded', initializeSite);
