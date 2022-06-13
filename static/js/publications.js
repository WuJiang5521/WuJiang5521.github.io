const pubs = [];
let loadState = 0;

fetch('./static/publications/publications.json')
    .catch(() => loadState = -1)
    .then(res => res.json())
    .catch(() => loadState = -1)
    .then(res => pubs.splice(0, pubs.length, ...res
        .filter(pub => !pub.markers.includes('hide'))
        .map((pub, pId) => ({
            ...pub,
            index: pId,
            authorIndex: pub.author.indexOf('Jiang Wu'),
        }))))
    .catch(() => loadState = -1)
    .then(() => loadState = 1);

function pubsReady() {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (loadState === 0) return;
            if (loadState === 1) resolve();
            else reject();
            clearInterval(interval);
        }, 500);
    });
}

function renderPub(pub) {
    return document.createElement('div');
}

function defaultSorter(pubA, pubB) {
    if (pubA.year !== pubB.year) return pubB.year - pubA.year;
    if (pubA.authorIndex !== pubB.authorIndex) return pubA.authorIndex - pubB.authorIndex;
    return pubA.index - pubB.index;
}

function renderPublications(dom, filter, sorter = defaultSorter) {
    pubsReady()
        .catch(() => {
            const errorText = document.createElement('p');
            errorText.innerText = "Fail to load publications. Please check you network.";
            dom.appendChild(errorText);
        })
        .then(() => {
            const filteredPubs = pubs.filter(filter);
            if (sorter) filteredPubs.sort(sorter)
            filteredPubs.forEach(pub => dom.appendChild(renderPub(pub)));
        })
}