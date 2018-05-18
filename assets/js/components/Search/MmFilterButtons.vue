<template>
    <div class="col-xs-12 col-md-6">
        <p>
            Filter Your Media By File Type
        </p>
        <ul class="list-inline list-unstyled">
            <li>
                <button class="btn btn-mm-audio" @click="fbt('audio')">
                    Audio
                </button>
            </li>
            <li>
                <button class="btn btn-mm-image" @click="fbt('image')">
                    Images
                </button>
            </li>
            <li>
                <button class="btn btn-mm-video" @click="fbt('video')">
                    Video
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "mm-filter-buttons",

        props: {
            media: {
                required: true
            }
        },

        data() {
            return {
                filteredMedia: '',
                mediaList: this.media,
            }
        },

        methods: {

            filterByType: function(  ) {
                let files = this.mediaList;
                let result = {};

                Object.keys( files ).forEach( key => {
                    const item = files[key];
                    // if (item.fileType.some( spec => spec.name === type)) {
                    //     result[key] = item
                    // }
                    console.log(item);
                })
            },

            fbt: function (type) {
                let files = this.mediaList;

                console.log(Object.keys());
                // return this.mediaList.filter( el => el.fileType.match( type ) );
                // return this.mediaList.filter(el => el.filename.match(type));
            },

           /*
           Object.keys(obj).forEach(function(key) {

              if (obj[key].fileType == 'audio' ) {
                console.log('has audio');
              }
            });
            */

            itemsWithPower: function() {
                var items = this.media;

                var result = Object.keys(items)
                    .map(key => items[key]) // turn an array of keys into array of items.
                    .filter(item =>  item.Specs.any(spec => spec.name === "Power")) // filter that array,

                console.log(result);
            }
        }
    }
</script>

<style scoped>

</style>