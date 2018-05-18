<template>
    <!--<transition name="media-filtered">-->

        <!--<div class=" mm-card ">-->
            <!--<div class="mm-card-divider mm-card-divider-image">-->
                <!--<p>{{ filename }}</p>-->
            <!--</div>&lt;!&ndash; /.mm-card-divider &ndash;&gt;-->

            <!--<div class="mm-card-media-container">-->

                <a :href="'/files/' + filePath "
                   class="image-popup-fit-width"
                   :title="'Preview: ' + filename "
                    @click.prevent="anchorClicked( filename, filePath) ">
                    <img :src="'/files/' + filePath "
                         :alt="filename "
                         :id=" filename "
                         class="mm-card-media lazy">
                </a>
            <!--</div>-->


            <!--<div class="mm-card-section">-->
                <!--<ul class="mm-card-list">-->
                    <!--<li class="cached-image-name">-->
                        <!--<strong>Name: </strong> {{ filename }}-->
                    <!--</li>-->
                <!--</ul>-->
                <!--<button class="btn btn-primary deletebutton"-->
                        <!--type="button"-->
                        <!--id="">-->
                    <!--Delete Image-->
                <!--</button>-->
            <!--</div>-->
        <!--</div>-->
    <!--</transition>-->
</template>

<script>
    export default {
        name: "media-manager-image-card",

        props: {

            // directory: {
            //     required: true
            // },

            filePath: {
                required: true
            },

            filename: {
                required: true
            },

            directory: {
                required: true
            },
        },
        
        methods: {
            anchorClicked: function (filename, filePath) {
                this.$emit( 'image-clicked', filename, filePath )
            }
        }
    }
</script>
