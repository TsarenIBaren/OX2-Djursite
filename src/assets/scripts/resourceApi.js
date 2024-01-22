const wordpressPostUrl = 'https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2';
let storedTags = Tags();

async function Tags() {
    const response = await fetch(`${wordpressPostUrl}/tags?per_page=100`);
    const data = await response.json();
    const result = {};

    for (let tag of data) {
        result[tag.name] = tag.id;
    };

    return result;
}

async function GetifyTags(tags) {
    let postTags = storedTags;
    if (!storedTags.length) {
        postTags = await Tags();
    };

    let searchTags = '';
    tags.forEach((v, i) => {
        if (postTags[v]) {
            searchTags += `${postTags[v]},`;

        } else {
            console.log(`Skipping tag ${v}`);
        };

        if (i == tags.length - 1) {
            searchTags.slice(0,-1);
        };
    });
    return searchTags;
}

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

async function Image(id) {
    if (id) {
        const response = await fetch(`${wordpressPostUrl}/media/${id}`);
        const data = await response.json();
    
        return [data.source_url, data.title.rendered];
    };

    return;
};

async function Images(tags=[]) {
    const response = await fetch(`${wordpressPostUrl}/posts?per_page=100&tags=${await GetifyTags(tags)}`);
    const data = await response.json();
    
    let result = [];

    for (let post of data) {
        if (post.featured_media !== 0) {
            const image = await Image(post.featured_media);
            result.push(image);
        };
    };

    return result;
};

export {Contents, Image, Images};