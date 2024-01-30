const wordpressPostUrl = 'https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2';
const languages = ['sv', 'en'];
let storedTags = Tags();

let cookies = {};
let cookieChunks = document.cookie.split(';');
for (let cookiePiece of cookieChunks) {
    if (cookiePiece) {
        let pieces = cookiePiece.split('=');
        cookies[pieces[0]] = pieces[1];
    };
};

async function Tags() {
    const response = await fetch(`${wordpressPostUrl}/tags?per_page=100`);
    const data = await response.json();
    const result = {};

    for (let tag of data) {
        result[tag.slug] = tag.id;
    };

    return result;
};

async function GetifyTags(tags) {
    let lang = 'sv';
    if (languages.includes(cookies['lang'])) {
        lang = cookies['lang'];
    };

    let postTags = storedTags;
    if (!storedTags.length) {
        postTags = await Tags();
    };

    let searchTags = '';
    tags.forEach((v, i) => {
        if (postTags[`${v}-${lang}`]) {
            searchTags += `${postTags[`${v}-${lang}`]},`;

        } else {
            console.log(`Skipping tag ${v}-${lang}`);
        };

        if (i == tags.length - 1) {
            searchTags.slice(0,-1);
        };
    });
    return searchTags;
};

async function Contents(tags=[]) {
    const response = await fetch(`${wordpressPostUrl}/posts?per_page=100&tags=${await GetifyTags(tags)}`);
    const data = await response.json();
    const result = data.map((item) => {
        return {
            content: item.content.rendered,
            featured: item.featured_media
        };
    });

    return result;
};

async function Image(id, trueTitle=null) {
    if (id) {
        const response = await fetch(`${wordpressPostUrl}/media/${id}`);
        const data = await response.json();
    
        return [data.source_url, trueTitle ? trueTitle : data.title.rendered, data.title.rendered];
    };

    return;
};

async function Images(tags=[]) {
    const response = await fetch(`${wordpressPostUrl}/posts?per_page=100&tags=${await GetifyTags(tags)}`);
    const data = await response.json();
    
    let result = [];

    for (let post of data) {
        if (post.featured_media !== 0) {
            const image = await Image(post.featured_media, post.content.rendered);
            result.push(image);
        };
    };

    return result;
};

export {Contents, Image, Images};