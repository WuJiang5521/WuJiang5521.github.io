const pubs = [];
let loadState = 0;

function pubsTransfer(pubs) {
    return pubs
        .filter(pub => !pub.markers.includes('hide'))
        .map((pub, pId) => ({
            ...pub,
            index: pId,
            authorIndex: pub.author.indexOf('Jiang Wu'),
            teaser: pub.teaser === ''
                ? `./publications/${pub.id}/teaser.png`
                : pub.teaser,
            paper: pub.paper === ''
                ? `./publications/${pub.id}/${pub.id}.pdf`
                : pub.paper,
        }))
}

fetch('./static/publications/publications.json')
    .catch(() => loadState = -1)
    .then(res => res.json())
    .catch(() => loadState = -1)
    .then(res => pubs.splice(0, pubs.length, ...pubsTransfer(res)))
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

function defaultSorter(pubA, pubB) {
    if (pubA.year !== pubB.year) return pubB.year - pubA.year;
    if (pubA.authorIndex !== pubB.authorIndex) return pubA.authorIndex - pubB.authorIndex;
    return pubA.index - pubB.index;
}

function renderPublications(dom, filter, sorter = defaultSorter) {
    pubsReady()
        .catch(() => dom.appendChild(r('p',
            {
                innerText: "Fail to load publications. Please check you network.",
                style: "color: red;"
            }
        )))
        .then(() => {
            const filteredPubs = pubs.filter(filter);
            if (sorter) filteredPubs.sort(sorter)

            dom.appendChild(r('div',
                {},
                ...filteredPubs.map(pub => renderPub(pub))
            ));
        })
}

function genPublishInfo(pub) {
    if (pub.journal)
        if (pub.proceedings) return `${pub.journal} (Proceedings of ${pub.proceedings})`;
        else return `${pub.journal}, ${pub.year}`;
    else return pub.proceedings;
}

function renderIconLink(type, link) {
    return r('a',
        {href: link},
        r('span', {
            class: '',
            innerText: '',
        })
    );
}

function renderPub(pub) {
    return r('div', // pub root
        {},
        r('div', // image container
            {},
            r('img', {src: pub.teaser}), // image
        ),
        r('div', // info container
            {},
            r('h4', {innerText: pub.title}), // title
            r('p', { // author list
                innerHTML: pub.author
                    .map((n, nId) =>
                        nId === pub.authorIndex
                            ? `<strong>${n}</strong>`
                            : (nId === pub.author.length - 1
                                ? `and ${n}`
                                : n)
                    )
                    .join(', ')
            }),
            r('em', { // journal & proceedings & year
                innerText: genPublishInfo(pub)
            }),
            r('div', // actions & markers
                {},
                pub.paper && renderIconLink('paper', pub.paper),
                pub.video && renderIconLink('video', pub.video),
                pub.system && renderIconLink('system', pub.system),
                pub.source && renderIconLink('source', pub.source),
                pub.citation && renderIconLink('citation', pub.citation),
                r('div', {style: 'flex: 1'}), // placeholder,
                // pub.markers.includes('conditional acceptance') &&,
                // pub.markers.includes('best paper') &&,
                // pub.markers.includes('honorable mention') &&,
            ),
            pub.note && r('div', // note
                {innerText: pub.note}
            )
        )
    );
}
