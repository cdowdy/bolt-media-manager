<template>
    <div>
        <mm-edit-image :media="media"
                       :paths="paths">
        </mm-edit-image>
    </div>
    
</template>

<script>
    import MmEditImage from './components/EditMedia/MmEditImage';

    export default {
        name: "media-manager-edit",

        components: {
            MmEditImage
        },

        props: {
            media: {
                required: true
            },

            paths: {
                required: true
            }

        },

        // data() {
        //     return {
        //         boltFiles: this.paths.boltFiles,
        //         file: this.media,
        //     }
        // },
        //
        // computed: {
        //
        //     filePath() {
        //         return '/files/' + this.file;
        //     },
        //
        // },
        //
        //
        // mounted: function() {
        //
        //     this.$nextTick(function() {
        //         var canvas = new fabric.Canvas('canvas');
        //         // var imgElement = this.$refs.image;
        //         // var imgInstance = new fabric.Image.fromURL('/files/' + this.media, function(img) {
        //         //
        //         //     oImg.scale(0.5);
        //         //     canvas.add(oImg);
        //         // });
        //
        //         fabric.Image.fromURL('/files/' + this.media, function(img) {
        //
        //             var oImg = img.scaleToWidth(canvas.getWidth());
        //             canvas.add(oImg);
        //         });
        //     })
        //
        // }
    }
</script>
