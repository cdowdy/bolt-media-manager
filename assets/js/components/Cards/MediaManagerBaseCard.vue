<template>
    <transition name="media-filtered">

        <div class=" mm-card ">

            <div class="mm-card-divider"
                 :class="'mm-card-divider-' + mediaType">
                <p>
                    {{ filename.toLowerCase() }}
                </p>
            </div><!-- /.mm-card-divider -->

            <div class="mm-card-media-container">

                <template v-if="mediaType === 'image'">
                    <!-- to many props/data to pass around to the parent component so I'll remove this image component for now -->
                    <!--<mm-imagecard :file-path="filePath"-->
                                  <!--:filename="filename"-->
                                  <!--:directory="directory"-->
                                  <!--@image-clicked="triggerLightbox">-->
                    <!--</mm-imagecard>-->
                    <a :href="'/files/' + filePath "
                       class="image-popup-fit-width magnific mm-card-lightbox-anchor"
                       :title="'Preview: ' + filename "
                       >
                        <img :src="'/files/' + filePath "
                             :alt="filename "
                             :id=" filename "
                             class="mm-card-media lazy">
                    </a>
                </template>

                <template v-if="mediaType === 'audio'">
                    <audio controls
                           muted
                           :src="'/files/' + filePath "
                           class="mm-card-media mm-card-media-audio">
                    </audio>
                </template>

                <template v-if="mediaType === 'video'">
                    <video controls
                           muted
                           preload="auto"
                           :src="'/files/' + filePath "
                           class="mm-card-media">
                    </video>
                </template>

            </div>


            <div class="mm-card-section">
                <ul class="mm-card-list">
                    <li class="cached-image-name">
                        <strong>Name: </strong> {{ filename.toLowerCase() }}
                    </li>
                </ul>
                <hr>
                <ul class="list-inline list-unstyled edit-media-list">
                    <li>
                        <a :href="editPath"
                           class="btn btn-default"
                           data-toggle="tooltip"
                           data-placement="top"
                           title="Edit File">
                            <i class="fa fa-edit"></i>
                            <span class="sr-only">Edit File</span>
                        </a>
                    </li>
                    <li>
                        <button type="button" class="btn btn-info"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Copy File">
                            <i class="fa fa-copy"></i>
                            <span class="sr-only">Copy File</span>
                        </button>
                    </li>
                    <li>
                        <button type="button"
                                class="btn btn-danger"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete File">
                            <i class="fa fa-trash"></i>
                            <span class="sr-only">Delete File</span>
                        </button>
                    </li>
                </ul>
                <!--<button class="btn btn-primary deletebutton"-->
                        <!--type="button"-->
                        <!--id="">-->
                    <!--Delete Image-->
                <!--</button>-->
            </div>

            <!--<button id="show-modal" @click="showModal = true">Show Modal</button>-->
            <!--<mm-lightbox v-if="showModal" @close="showModal = false" >-->
                <!--<p slot="main-content">-->
                    <!--temp text-->
                <!--</p>-->
            <!--</mm-lightbox>-->
        </div>

    </transition>
</template>

<script>
    import MmImagecard from './MediaManagerImageCard';
    import MmAudiocard from './MediaManagerAudioCard';
    import MmVideocard from './MediaManagerVideoCard';
    import MmLightbox from '../Modal/MmLightbox';

    export default {
        name: "media-manager-base-card",
        components: {
            MmImagecard,
            MmAudiocard,
            MmVideocard,
            MmLightbox
        },

        props: {

            filePath: {
                required: true
            },

            filename: {
                required: true
            },

            directory: {
                required: true
            },

            mediaType: {
                required: true
            },

            editPath: {
                required: true
            }

        },

        // data() {
        //     return {
        //         lbImageName: '',
        //         lbImagePath: '',
        //         showModal: false
        //     }
        // },

        methods: {
            // triggerLightbox: function (filename, filePath) {
            //     this.lbImageName = filename;
            //     this.lbImagePath = filePath;
            //
            //     console.log('name: ' + this.lbImageName + ' ' + ' path: ' + this.lbImagePath );
            // },

            //
            // anchorClicked: function (filename, filePath) {
            //     this.$emit('image-clicked', filename, filePath)
            // }
        }
    }
</script>