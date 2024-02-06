<script setup>
</script>

<template>
    
<div class="content" id="lives">
    <iframe src="https://www.youtube.com/embed/XhV3Mhgi6Ck" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <iframe src="https://www.youtube.com/embed/ha2CVpbUG0E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
</template>

<style scoped>
#lives {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
}

iframe {
    border: 0.25em solid hsl(0, 0%, 100%);
    border-radius: 0.5em;
    margin: 0.5em;
    flex-grow: 1;
    height: 25em;
}
</style>

