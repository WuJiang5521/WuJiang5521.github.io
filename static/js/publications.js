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
                ? `./static/publications/${pub.id}/teaser.png`
                : pub.teaser,
            paper: pub.paper === ''
                ? `./static/publications/${pub.id}/${pub.id}.pdf`
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
        function test() {
            if (loadState === 0) return false;
            if (loadState === 1) resolve();
            else reject();
            return true;
        }
        if (!test())
            const interval = setInterval(() => {
                if (test()) clearInterval(interval);
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
            const filteredPubs = filter
                ? pubs.filter(filter)
                : pubs.map(pub => pub);
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

const icons = {
    paper: () => r('span', {
        classNames: 'material-icons pub-icon',
        innerText: 'article',
    }),
    video: () => r('span', {
        classNames: 'material-icons pub-icon',
        innerText: 'videocam',
    }),
    system: () => r('span', {
        classNames: 'material-icons pub-icon',
        innerText: 'airplay',
    }),
    source: () => r('span', {
        classNames: 'material-icons pub-icon',
        innerText: 'code',
    }),
    citation: () => r('button', {
        innerText: 'Cite This',
    }),
    award: () => r('span', {
        classNames: 'material-icons pub-icon',
        innerText: 'emoji_events',
    }),
}
const links = {
    paper: l => l,
    video: l => l.startsWith('http')
        ? l
        : `https://youtu.be/${l}`,
    system: l => l,
    source: l => l,
    citation: l => l,
}

function renderIconLink(type, link) {
    return r('a',
        {
            href: links[type](link),
            title: type,
            target: ['video', 'source', 'system'].includes(type)
                ? "_blank"
                : "_self",
        },
        icons[type](),
    );
}

function renderTag(tag, icon, tagStyle) {
    return r('span', {classNames: `pub-tag ${tagStyle}`},
        r('span', {classNames: 'pub-tag-icon'}, icon),
        r('span', {classNames: 'pub-tag-text', innerText: tag}),
    );
}

function renderPub(pub) {
    return r('div', // pub root
        {classNames: 'pub-root'},
        r('div', // image container
            {classNames: 'img-container'},
            r('img', {src: pub.teaser}), // image
        ),
        r('div', // info container
            {classNames: 'info-container'},
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
                {classNames: 'actions'},
                pub.paper && renderIconLink('paper', pub.paper),
                pub.video && renderIconLink('video', pub.video),
                pub.system && renderIconLink('system', pub.system),
                pub.source && renderIconLink('source', pub.source),
                pub.citation && renderIconLink('citation', pub.citation),
                r('div', {style: 'flex: 1'}), // placeholder,
                pub.markers.includes('conditional acceptance') && renderTag('Conditional Acceptance', null, 'disabled'),
                pub.markers.includes('best paper') && renderTag('Best Paper', icons.award(), 'emphasis'),
                pub.markers.includes('honorable mention') && renderTag('Honorable Mention', icons.award(), 'emphasis'),
            ),
            pub.note && r('div', // note
                {classNames: 'note', innerText: `*note: ${pub.note}`}
            )
        )
    );
}
