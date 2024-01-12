const wordpressPostUrl = 'https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2/media';
let images = [];

async function Images(parentId) {
    try {
        const response = await fetch(`${wordpressPostUrl}?parent=${parentId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
            images = data.map(item => [
                item.source_url,
                item.title.rendered
            ]);
        }
    } catch (error) {
        console.error('Error fetching WordPress images:', error);
    }

    return images;
};

export {Images};
