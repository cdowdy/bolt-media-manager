<template>
    <audio controls
           muted
           :src="'/files/' + filePath "
           class="mm-card-media mm-card-media-audio">
    </audio>
</template>

<script>
    export default {
        name: "media-manager-audio-card",

        props: {
            filePath: {
                required: true
            }
        }
    }
</script>