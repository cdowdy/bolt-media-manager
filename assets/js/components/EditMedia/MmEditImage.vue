<template>
    <div>
        <div class="col-xs-12 col-md-7">
            <div class="mm-card">
                <canvas ref="canvas" id="canvas" width="700" height="500"></canvas>
            </div>

        </div>
        <div class="col-xs-12 col-md-5">
            <!--<mm-edit-image-form></mm-edit-image-form>-->
            <div class="mm-card">
                <div class="mm-card-divider">
                    Edit Options
                </div>
                <form action="">
                    <fieldset class="fieldset">
                        <div class="checkbox-inline">
                            <label for="greyscale">
                                <input type="checkbox"
                                       id="greyscale"
                                       v-model="models.greyscale"
                                       @change="applyImageFilter">
                                Greyscale
                            </label>
                            {{ models.greyscale }}
                        </div>
                        <div class="radio-inline">
                            <label>
                                <input type="radio"
                                       value="avg"> AVG
                            </label>
                        </div>
                        <div class="radio-inline">
                            <label>
                                <input type="radio"
                                       value="Lum"> Lum
                            </label>
                        </div>
                        <div class="radio-inline">
                            <label>
                                <input type="radio"
                                       value="light"> Light
                            </label>
                        </div>
                    </fieldset>


                    <fieldset class=" fieldset">
                        <p id="filterButtonTitle">
                            Image Filters
                        </p>

                        <div class="mm-edit-filter-group"
                             role="group"
                             aria-label="Available Image Filters">
                            <label :for="index"
                                   class="mm-filter-group-label"
                                   v-for="(filter, index) in Colormatrix">
                                <input class="btn btn-secondary"
                                       type="checkbox"
                                       :value="filter.name"
                                />
                                {{ filter.name }}
                            </label>
                        </div>
                    </fieldset>

                    <fieldset class="fieldset">
                        <label for="removeColor">Remove Color</label>
                        <input :type="RemoveColor.inputType"
                               id="removeColor"
                               :value="RemoveColor.defaultValue"
                        >
                    </fieldset>

                    <fieldset class="fieldset" v-for="(range, index) in ranges">
                        <div class="form-group" >
                            <label :for="index">
                                <input type="checkbox" :id="index">
                                {{ range.name }}
                            </label>
                            <template v-for="(input, index) in range.rangeInputs">
                                <label :for="index">
                                    {{ input.name }}
                                    <input type="range" :value="input.value" :min="input.min" :max="input.max" :step="input.step">
                                </label>
                            </template>
                        </div>
                    </fieldset>

                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import MmEditImageForm from './MmEditImageForm';


    export default {
        name: "mm-edit-image",

        components: {
            MmEditImageForm
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
                boltFiles: this.paths.boltFiles,
                file: this.media,

                models: [
                    { greyscale: [] }
                ],

                Colormatrix: [
                    {name: 'invert'},
                    {name: 'sepia'},
                    {name: 'brownie'},
                    {name: 'brightness'},
                    {name: 'contrast'},
                    {name: 'saturation'},
                    {name: 'noise'},
                    {name: 'vintage'},
                    {name: 'pixelate'},
                    {name: 'blur'},
                    {name: 'sharpen'},
                    {name: 'emboss'},
                    {name: 'technicolor'},
                    {name: 'polaroid'},
                    {name: 'blend-color'},
                    {name: 'gamma'},
                    {name: 'kodachrome'},
                    {name: 'blackwhite'},
                    {name: 'blend-image'},
                    {name: 'hue'},
                    {name: 'resize'},
                ],

                RemoveColor: {
                    inputType: 'color',
                    defaultValue: '#204460'
                },

                ranges: [ // copied steps/values from http://fabricjs.com/image-filters
                    { name: 'Brightness',
                        rangeInputs: [
                            {
                                name: 'Value',
                                value: '0.1',
                                min: '-1',
                                max: '1',
                                step: '0.003921'
                            }
                        ]
                    },
                    {name: 'Gamma',
                        rangeInputs: [
                            {
                                name: 'Red',
                                value: '1',
                                min: '0.2',
                                max: '2.2',
                                step: '0.003921'
                            },
                            {
                                name: 'Green',
                                value: '1',
                                min: '0.2',
                                max: '2.2',
                                step: '0.003921'
                            },
                            {
                                name: 'Blue',
                                value: '1',
                                min: '0.2',
                                max: '2.2',
                                step: '0.003921'
                            },
                        ]
                    },
                    {name: 'Contrast',
                        rangeInputs: [
                            {
                                name: 'Value',
                                value: '0',
                                min: '-1',
                                max: '1',
                                step: '0.003921'
                            }
                        ]
                    },
                    {name: 'Saturation',
                        rangeInputs: [
                            {
                                name: 'Value',
                                value: '0',
                                min: '-1',
                                max: '1',
                                step: '0.003921'
                            }
                        ]
                    },
                    {name: 'Hue',
                        rangeInputs: [
                            {
                                name: 'Value',
                                value: '0',
                                min: '-2',
                                max: '2',
                                step: '0.002'
                            }
                        ]
                    },
                    {name: 'Noise',
                        rangeInputs: [
                            {
                                name: 'Value',
                                value: '100',
                                min: '0',
                                max: '1000',
                                step: ''
                            }
                        ]
                    },
                    {name: 'Pixelate',
                        rangeInputs: [
                            {
                                name: 'Value',
                                value: '4',
                                min: '2',
                                max: '20',
                                step: ''
                            }
                        ]
                    },
                ],
            }
        },

        computed: {

            filePath() {
                return '/files/' + this.file;
            },

        },

        methods: {

            checkboxToggle: function () {

                if (this.models.greyscale) {
                    console.log( 'greyscale checked. should be true')
                }
            },

            initialize: function () {
                var canvas = new fabric.Canvas(this.$refs.canvas);
                var  f = fabric.Image.filters;
                var vm = this;

                fabric.filterBackend = new fabric.Canvas2dFilterBackend();

                fabric.Image.fromURL('/files/' + this.media, (img) => {

                    canvas.backgroundColor = 'lightgrey';

                    // var ff = this.applyImageFilter();

                    img.scaleToWidth(canvas.getWidth());


                    // img.filters.push( new f.Grayscale() );

                    // img.filters.push(
                    //     new f.Sepia() );



                    // img.applyFilters();

                    canvas.add(img);
                    // console.log(canvas.getActiveObject() );
                });

                // console.log(canvas );

                // this.applyImageFilter(  );
            },


            applyImageFilter: function () {
                var object = this.$refs.canvas.getActiveObject();
                var  f = fabric.Image.filters;


                if (this.models.greyscale) {
                    console.log(f);
                    object.filters = new f.Grayscale();
                }

                object.applyFilters();
                canvas.renderAll();
            }

        },


        mounted: function() {

            // console.log(this.checkboxToggle() + ' outside next tick');

            // this.$nextTick(function() {

                // var imgElement = this.$refs.image;
                // var imgInstance = new fabric.Image.fromURL('/files/' + this.media, function(img) {
                //
                //     oImg.scale(0.5);
                //     canvas.add(oImg);
                // });

                // let vm = this;
                //
                // console.log( this.checkboxToggle() + ' inside nextTick' );
                // var canvas = new fabric.Canvas('canvas');
                //
                // fabric.Image.fromURL('/files/' + this.media, function(img) {
                //
                //     canvas.backgroundColor = 'lightgrey';
                //
                //
                //     var oImg = img.scaleToWidth(canvas.getWidth());
                //
                //
                //     canvas.add(oImg);
                // });
            //     this.initialize();
            // })
            this.initialize();
        }
    }
</script>
