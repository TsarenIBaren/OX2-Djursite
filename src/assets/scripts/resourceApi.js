import translations from '/src/assets/translations.json';

const wordpressPostUrl = 'https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2';
let loadingMeta = true;
let loading = true;
let transaction = 0;
let transactions = {};

const languages = translations.languages;

let cookies = {};
let cookieChunks = document.cookie.split(';');
for (let cookiePiece of cookieChunks) {
    if (cookiePiece) {
        let pieces = cookiePiece.split('=');
        cookies[pieces[0]] = pieces[1];
    };
};

let storedTags = {}

async function LoadMeta() {
    storedTags = await Tags();
    loadingMeta = false;
};

LoadMeta();

function BeginFetch() {
    loading = true;
    const id = transaction;
    transaction += 1;
    transactions[id] = true;
    return id;
};

function EndFetch(id) {
    delete transactions[id];
    if (Object.keys(transactions).length == 0) {
        loading = false;
    };
};

async function Tags() {
    const transaction = BeginFetch();

    const response = await fetch(`${wordpressPostUrl}/tags?per_page=100`);
    const result = {};

    if (response.ok) {
        const data = await response.json();
    
        for (let tag of data) {
            result[tag.slug] = tag.id;
        };
    };

    EndFetch(transaction);

    return result;
};

async function GetifyTags(tags) {
    let lang = 'sv';
    if (languages.includes(cookies['lang'])) {
        lang = cookies['lang'];
    };

    let searchTags = '';
    tags.forEach((v, i) => {
        if (storedTags[`${v}-${lang}`]) {
            searchTags += `${storedTags[`${v}-${lang}`]},`;

        } else {
            console.log(`Skipping tag ${v}-${lang} \nReason: Tag doesn't exist`);
        };

        if (i == tags.length - 1) {
            searchTags.slice(0,-1);
        };
    });
    return searchTags;
};

async function Contents(tags=[]) {
    const transaction = BeginFetch();

    const response = await fetch(`${wordpressPostUrl}/posts?per_page=100&tags=${await GetifyTags(tags)}`);
    let result = null;

    if (response.ok) {
        const data = await response.json();
        result = data.map((item) => {
            return {
                content: item.content.rendered,
                featured: item.featured_media
            };
        });
    };

    EndFetch(transaction);

    return result;
};

async function Image(id, trueTitle=null) {

    if (id) {
        const transaction = BeginFetch();

        const response = await fetch(`${wordpressPostUrl}/media/${id}`);
        const data = await response.json();

        EndFetch(transaction);
    
        return [data.source_url, trueTitle ? trueTitle : data.title.rendered, data.title.rendered];
    };

    return;
};

async function Images(tags=[]) {
    const transaction = BeginFetch();

    const response = await fetch(`${wordpressPostUrl}/posts?per_page=100&tags=${await GetifyTags(tags)}`);
    const data = await response.json();
    
    let result = [];

    for (let post of data) {
        if (post.featured_media !== 0) {
            const image = await Image(post.featured_media, post.content.rendered);
            result.push(image);
        };
    };
    
    EndFetch(transaction);

    return result;
};

function AsyncImage(callback, id, trueTitle=null) {
    if (id) {
        fetch(`${wordpressPostUrl}/media/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                return null;
            }
        })
        .then(data => {
            if (data) {
                callback([data.source_url, trueTitle ? trueTitle : data.title.rendered, data.title.rendered]);
            } else {
                callback([null, null]);
            };
        });
    };
}

export {loadingMeta, loading, cookies, Contents, Images, AsyncImage};