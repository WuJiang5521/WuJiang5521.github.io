const routes = {
    home: './home.html',
    research: './research.html',
    publications: './publications.html',
    contact: './contact.html',
    life: './life.html',
}

function switchPage(route) {
    window.history.pushState(null, '', `${window.location.origin}${window.location.pathname}?page=${route}`);
    const content = document.getElementById('content');
    content.src = routes[route];
}

function parseRoute() {
    const search = window.location.search
    const params = Object.fromEntries(search.substring(1)
        .split('&')
        .map(seg => seg.split('=')));
    return params['page'] || '';
}

switchPage(parseRoute() || 'home');
