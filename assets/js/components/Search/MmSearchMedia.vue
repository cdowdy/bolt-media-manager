<template>
    <form action=""
          class="form-horizontal">
        <div class="form-group">
            <label for="searchMMFiles"
                   class="col-xs-12 col-md-4 control-label">
                Search Your Media Files
            </label>
            <div class="col-xs-12 col-md-6">
                <input id="searchMMFiles"
                       class="form-control"
                       type="search" >
                <!--<span class="sr-only"-->
                      <!--id="MediaSearchDescription">Search Your Media</span>-->
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "mm-search-media",

        // props: {
        //     media: {
        //         default: [],
        //         required: true
        //     },
        // },
        //
        // data() {
        //     return {
        //         filteredMedia: '',
        //         mediaList: this.media
        //     }
        // },
        //
        // computed: {
        //
        //     filterMedia() {
        //         let filter = new RegExp( this.filteredMedia, 'i' );
        //
        //         return this.mediaList.filter( el => el.filename.match( filter ) );
        //     }
        // }
    }
</script>