<template>
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
                               v-model="models.greyscale">
                        Greyscale
                    </label>

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
                <input :type="RemoveColors.inputType"
                       id="removeColor"
                       :value="RemoveColors.defaultValue"
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

</template>

<script>
    export default {
        name: "mm-edit-image-form",

        data() {
            return {

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

                RemoveColors: {
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

        methods: {

            applyFilter: function () {

            },
        },

    }
</script>
