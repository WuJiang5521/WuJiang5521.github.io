const routes = {
    home: './home.html',
    research: './research.html',
    publications: './publications.html',
    contact: './contact.html',
}

function switchPage(route) {
    const content = document.getElementById('content');
    content.src = routes[route];
}

switchPage('home');
