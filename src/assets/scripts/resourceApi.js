const wordpressPostUrl = 'https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2';

async function Tags() {
    try {
        const response = await fetch(`${wordpressPostUrl}/tags`);
        const data = await response.json();
        const result = {};

        for (let tag of data) {
            result[tag.name] = tag.id;
        };

        return result;

    } catch (error) {
        console.error('Error fetching WordPress data:', error);
    };
}

async function Contents(tags=[]) {
    try {
        const response = await fetch(`${wordpressPostUrl}/posts`);
        const data = await response.json();
        const postTags = await Tags();
        let result;

        result = data.filter((post) => {
            for (let tag of tags) {
                if (!post.tags.includes(postTags[tag])) {
                    return false;
                };
            };

            return true;
        });

        result = result.map((item) => [item.content.rendered, item.featured_media]);
        return result;

    } catch (error) {
        console.error('Error fetching WordPress data:', error);
        return;
    };
}

async function Image(id) {
    try {
        const response = await fetch(`${wordpressPostUrl}/media/${id}`);
        const data = await response.json();

        return [data.source_url, data.title.rendered];

    } catch (error) {
        console.error('Error fetching WordPress data:', error);
        return;
    };
};

async function Images(tags=[]) {
    try {
        const response = await fetch(`${wordpressPostUrl}/media`);
        const data = await response.json();
        let result;

        result = data.filter((media) => {
            for (let tag of tags) {
                if (!media.alt_text.split(' ').includes(tag)) {
                    return false;
                };
            };

            return true;
        });

        result = result.map(image => [
            image.source_url,
            image.title.rendered,
        ]);

        return result;

    } catch (error) {
        console.error('Error fetching WordPress data:', error);
        return;
    };
};

export {Contents, Image, Images};
