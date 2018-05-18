<template>

    <div>
        <div class="row">
            <div class="col-xs-12">
                <button type="button"
                        class="btn btn-secondary"
                        @click="toggleDirectory = !toggleDirectory">
                    Toggle Directories
                </button>
                <table class="dashboardlisting" v-if="toggleDirectory">
                    <thead>
                    <tr>
                        <th>Directories</th>
                        <th>Sub Directories</th>
                    </tr>
                    </thead>
                    <tbody is="dir-list"
                           :directories="paths.directories"
                           :path-all-files="paths.allFiles">
                    </tbody>
                </table>
            </div>
            <hr>

            <div class="col-xs-12 col-md-6">
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
                                   type="search"
                            v-model="filteredMedia">
                            <!--<span class="sr-only"-->
                            <!--id="MediaSearchDescription">Search Your Media</span>-->
                        </div>
                    </div>
                </form>

            </div>
            <div class="col-xs-12 col-md-6">
                <p>
                    Filter Your Media By File Type
                </p>

                <ul class="list-inline list-unstyled">
                    <li v-for="(btn , index) in filterTypeButtons" >
                        <button type="button"
                                class="btn"
                                :class="'btn-mm-' + btn.type"
                                @click="filterByMediaType( btn.type )">
                            {{ btn.type }}
                        </button>
                    </li>
                    <li >
                        <button v-show="typeFilterActive"
                                type="button"
                                class="btn btn-default"
                                @click="clearMediaTypeFilter">
                            clear type filter
                        </button>
                    </li>
                </ul>

            </div>

        </div>

        <div class="row">
            <hr>

            <div class="mm-block-grid">

                <div class="mm-block-grid-item"
                     v-for="(file, index) in filterSearchandType"
                     :key="file.filename">
                    <mm-basecard  :file-path="file.filePath"
                                  :edit-path="paths.edit + '/' + file.filename"
                                  :filename="file.filename"
                                  :directory="file.directory"
                                  :media-type="file.fileType"
                                  >
                    </mm-basecard>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import MmFilterMedia from './components/Search/MmFilterMedia';
    import MmBasecard from './components/Cards/MediaManagerBaseCard';
    import DirList from "./components/Directories/DirList";
    // import MmLightbox from './components/Modal/MmLightbox';
    // import MmDialog from './components/Modal/MmDialog';
    //
    // import dialogPolyfill from 'dialog-polyfill';


    export default {
        name: "media-manager-app",

        components: {
            DirList,
            MmFilterMedia, MmBasecard
        },

        props: {
            media: {
                required: true
            },

            paths: {
                required: true
            }

        },

        data() {
            return {
                filteredMedia: '',
                filteredByType: '',
                mediaList: this.media,

                filterTypeButtons: [
                    { type: 'audio' },
                    { type: 'image' },
                    { type: 'video' }
                ],

                typeFilterActive: false,
                //
                // showImageModal: false,
                // lbImageName: '',
                // lbImagePath: '',
                toggleDirectory: false
            }
        },
        
        methods: {

            filterByMediaType: function (type) {
                this.filteredByType = type;
                this.typeFilterActive = true;
            },

            clearMediaTypeFilter: function () {
                this.filteredByType = '';
                this.typeFilterActive = false;
            },

            // triggerImageModal: function (filename, filePath) {
            //
            //     // this.$refs.modal.focus();
            //     this.showImageModal = true;
            //     this.lbImageName = filename;
            //     this.lbImagePath = filePath;
            //
            //     // console.log('name: ' + this.lbImageName + ' ' + ' path: ' + this.lbImagePath );
            // },
            
            // openDialog: function () {
            //     let dialog = this.$refs.dialog;
            //     dialogPolyfill.registerDialog(dialog);
            //     dialog.showModal();
            // },
            //
            // closeDialog: function () {
            //     let dialog = this.$refs.dialog;
            //     dialog.close();
            // }
        },

        computed: {

            filterSearchandType() {
                let filter = new RegExp( this.filteredMedia, 'i' );

                return this.mediaList
                    .filter( el => el.filename.match( filter ) )
                    .filter( el => el.fileType.match( this.filteredByType ) );
            },

        },


    }
</script>