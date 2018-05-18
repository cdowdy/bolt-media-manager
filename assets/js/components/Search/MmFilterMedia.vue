<template>
    <div class="row">
        <hr>
        <div class="col-xs-12 col-md-6">
            <mm-search-media></mm-search-media>
        </div>
        <mm-filter-buttons media="media"></mm-filter-buttons>
    </div>
</template>

<script>

    import MmFilterButtons from "./MmFilterButtons";
    import MmSearchMedia from "./MmSearchMedia";


    export default {
        components: {
            MmSearchMedia,
            MmFilterButtons
        },
        name: "mm-filter-media",

        props: {
            media: {
                required: true
            }
        }
    }
</script>
