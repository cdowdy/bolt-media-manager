import { fabric }  from 'fabric';

export default class ApplyImageFilter {


    constructor(  img = 'mmcanvas-file',  ) {

        this._canvas =  new fabric.Canvas( 'mmcanvas' );
        this._imageFilters = fabric.Image.filters;

        // this will throw a null error on our main page to list all media files. We need to put a check
        // in to stop this error or just let it ride... for now I'll just finish this script :)
        this._image = document.querySelector('#mmcanvas-file').src;

        this._checkboxes = document.querySelectorAll('.mm-edit-checkbox');
        this._radios = document.querySelectorAll('.mm-edit-radio');

        this._filters = [ 'grayscale', 'invert', 'remove-color', 'sepia',
            'brownie', 'brightness', 'contrast', 'saturation',
            'noise', 'vintage', 'pixelate', 'blur', 'sharpen',
            'emboss', 'technicolor', 'polaroid', 'blend-color',
            'gamma', 'kodachrome', 'blackwhite', 'blend-image',
            'hue', 'resize'
        ];


        fabric.Object.prototype.padding = 5;
        fabric.Object.prototype.transparentCorners = false;
        // fabric.filterBackend = fabric.initFilterBackend();

        // if (fabric.maxTextureSize > 2408  ) {
            fabric.textureSize = 4096;
        // }

    }


    addImageToCanvas( ) {

            fabric.Image.fromURL(this._image ,  img => {
                // var data = {
                //     this_url: { result: this._image },
                //     img_object: { result: img }
                // };
                // console.table(data);

                let actW = document.querySelector('#actualImgWidth');
                let actH = document.querySelector('#actualImgHeight');


                actW.textContent = img.width + 'px';
                actH.textContent = img.height + 'px';


                this._canvas.backgroundColor = '#ededed';
                // img.scaleToWidth( this._canvas.getWidth() - 25 );
                // img.scaleToHeight( this._canvas.getHeight() - 25 );

                if ( img.height > this._canvas.getHeight() - 25 ) {
                    img.scaleToHeight( this._canvas.getHeight() - 25 );
                }

                if ( img.width > this._canvas.getWidth() - 25 ) {
                    img.scaleToWidth( this._canvas.getWidth() - 25 );
                }


                this._canvas.centerObject(img);
                this._canvas.setActiveObject(img);

                img.setCoords();


                // if ( Math.max(img.width, img.height) > 2048) {
                //
                //     let fscale = 2048 / Math.max(img.width, img.height);
                //     img.filters.push(
                //         new fabric.Image.filters.Resize({
                //             resizeType: 'sliceHack',
                //             scaleX: fscale,
                //             scaleY: fscale
                //         }),
                //     );
                //     img.applyFilters();
                // }


                console.log(fabric.maxTextureSize);
                console.log( fabric.textureSize );

                this._canvas.add( img );
                this._canvas.renderAll();
            });
        // this.applyFabricFilter();
    }

    getFilterIndex( index ) {
        let obj = this._canvas.getActiveObject();

        return obj.filters[index];
    }

    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    applyFabricFilter(index, filter  ) {
        let obj = this._canvas.getActiveObject();
        obj.filters[index] = filter;
        obj.applyFilters();
        this._canvas.renderAll();
    }


    applyFabricFilterValue(index, prop, value) {
        let obj = this._canvas.getActiveObject();

        if ( obj.filters[index] ) {
            obj.filters[index][prop] = value;
            obj.applyFilters();
            this._canvas.renderAll();
        }
    }

    doFilter() {

        this._checkboxes.forEach(ele => {

            ele.addEventListener('click', e => {
                let obj = this._canvas.getActiveObject();
                let f = ele.value;

                if (ele.checked) {

                    this.applyFabricFilter( new fabric.Image.filters[f]() );

                    // this.removeColor();
                    // since we use a resize filter on images larger than 2048 there may be a filter already in the
                    // filter array. so we see if it's greater than or equal to 1. if so we'll just pop all the filters
                } else if (obj.filters.length >= 1) {
                    obj.filters.pop();
                    obj.applyFilters();
                    this._canvas.renderAll();
                }

                obj.applyFilters();
                this._canvas.renderAll();
            });
        });
    }

    // doFilter(  ) {
    //     let checkboxGroup = document.querySelectorAll('.mm-edit-checkbox-group') ;
    //
    //     checkboxGroup.forEach( element => {
    //
    //         element.addEventListener( 'change', e => {
    //             // the current active canvs with the image we want to modify
    //             let obj = this._canvas.getActiveObject();
    //             // inputs
    //             let allInputs = element.querySelectorAll('input');
    //             let checkbox = element.querySelector('input[type="checkbox"]');
    //             let radios = element.querySelectorAll('input[type="radio"]');
    //             let ranges = element.querySelectorAll('input[type="range"]');
    //             // filter to run
    //             let fabFilter = checkbox.value;
    //             // how many "options" to modify the filter -> ranges, radios etc
    //             let filterOptions = checkbox.getAttribute('data-filterOptions');
    //
    //             if (checkbox.checked) {
    //
    //                 // if the current checkbox is checked enable all inputs within the parent fieldset
    //                 allInputs.forEach( input => {
    //                     input.disabled = false;
    //                 });
    //
    //                 // grayscale filter
    //                 // let grayscaleOptions = element.querySelector('input[name="mode"]:checked').value;
    //                 // this.getFilter(element, checkbox.value,);
    //
    //                 // if ( filterOptions = 'none' ) {
    //                 //     this.applyFabricFilter( new fabric.Image.filters[fabFilter]() );
    //                 // }
    //                 //
    //                 // if ( filterOptions = 'one' ) {
    //                 //     this.applyFabricFilter( new fabric.Image.filters[fabFilter]({
    //                 //
    //                 //     }) );
    //                 // }
    //                 //
    //                 // if ( filterOptions = 'multiple' ) {
    //                 //     this.applyFabricFilter( new fabric.Image.filters[fabFilter]({
    //                 //
    //                 //     }) );
    //                 // }
    //
    //
    //                 // since we use a resize filter on images larger than 2048 there may be a filter already in the
    //                 // filter array. so we see if it's greater than or equal to 1. if so we'll just pop all the filters
    //             } else if (obj.filters.length >= 1) {
    //                 obj.filters.pop();
    //             }
    //
    //             obj.applyFilters();
    //             this._canvas.renderAll();
    //         })
    //     })
    //
    //     // checkboxGroup.addEventListener( 'change', e => {
    //     //
    //     // })
    // }

    checkBoxFilter() {
        let checkbox = document.querySelectorAll('input[type="checkbox"]');

        checkbox.forEach( box => {
            box.addEventListener( 'click', (e) => {
                let filterName = box.value;
                let index = this._filters.indexOf(filterName.toLowerCase());
                this.applyFabricFilter(index, box.checked && new fabric.Image.filters[filterName]() );
            })
        })
    }

    radioFilter() {
        let radios = document.querySelectorAll('input[type="radio"]');

        radios.forEach( radio => {
            radio.addEventListener( 'change', (e) => {
                let filterName = radio.getAttribute('data-filter');
                let index = this._filters.indexOf(filterName.toLowerCase());
                let prop = radio.name;
                let value = radio.value;
                this.applyFabricFilterValue(index, prop, value );
            })
        });
    }

    selectInputFilter() {}

    rangeInputFilter() {
        let rangeInputs = document.querySelectorAll('input[type="range"]');

        rangeInputs.forEach( range => {
            range.addEventListener( 'input', (e) => {
                // let filterName = radio.getAttribute('data-filter');
                // let index = this._filters.indexOf(filterName.toLowerCase());
                // let prop = radio.name;
                // let value = radio.value;
                // this.applyFabricFilterValue(index, prop, value );
            })
        })
    }

    colorInputFilter() {}

    usesCheckboxNameAsParameter() {
        let cbGroup = document.querySelectorAll('.mm-edit-checkbox-group');

        cbGroup.forEach( element =>  {
            element.addEventListener( 'change', (e) => {
                let obj = this._canvas.getActiveObject();
                let Filter = e.target;
                let filterName = Filter.matches('input[type="checkbox"]');
                let checkbox = element.querySelectorAll('input[type="checkbox"]');
                let radio = element.querySelectorAll('input[type="radio"]');

                console.log(checkbox.value);
                console.log(radio.value);

                if ( filterName && Filter.checked ) {
                    console.log( Filter.value );
                    this.getFilter( Filter.value );
                    console.log(obj.filters);

                // }
                //
                //
                // if ( Filter.checked ) {
                //
                //     this.getFilter( Filter.value );
                //     console.log(obj.filters);

                    // this.applyFabricFilterValue(filterIndex, filterOption, fOptionValue );
                    // since we use a resize filter on images larger than 2048 there may be a filter already in the
                    // filter array. so we see if it's greater than or equal to 1. if so we'll just pop all the filters
                } else if (obj.filters.length >= 1) {
                    obj.filters.pop();
                    obj.applyFilters();
                    this._canvas.renderAll();
                }
            })
        })

    }

    ffApply( index, filter ) {
        let obj = this._canvas.getActiveObject();
        obj.filters[index] = filter;

        obj.applyFilters();

        this._canvas.renderAll();
    }

    grayscale() {
        // let checkbox = document.getElementById('grayscale');
        let cbGroup = document.querySelectorAll('.mm-edit-grayscale');

        // checkbox.addEventListener( 'click', () => {
        //
        // });

        cbGroup.forEach( element =>  {
            element.addEventListener( 'change', (e) => {
                let obj = this._canvas.getActiveObject();
                let filterName = element.querySelector('input[type="checkbox"]');
                let filterOption = element.querySelector('input[type="radio"]');


                if ( filterName.checked ) {

                    this.getFilter(element, filterName.value);
                    console.log(obj.filters);
                    let filterIndex = this._filters.indexOf(filterName.value.toLowerCase());


                    console.log(filterIndex);
                    console.log(filterOption.checked.value);


                    // this.applyFabricFilterValue(filterIndex, filterOption, fOptionValue );
                    // since we use a resize filter on images larger than 2048 there may be a filter already in the
                    // filter array. so we see if it's greater than or equal to 1. if so we'll just pop all the filters
                } else if (obj.filters.length >= 1) {
                    obj.filters.pop();
                    obj.applyFilters();
                    this._canvas.renderAll();
                }
            })
        })

        // checkbox.addEventListener('click', () => {
        //     if (checkbox.checked) {
        //         this.ffApply( 0, new fabric.Image.filters.Grayscale() );
        //     } else if (obj.filters.length >= 1) {
        //         obj.filters.pop();
        //         obj.applyFilters();

        //         this._canvas.renderAll();
        //     }
        // })
    }


    invert() {

    }


    brownie() {}


    getFilter(filterType ) {
        let filter;


        let filters = {

            'Grayscale' : () => {
                // let grayscaleOptions = clickTarget.querySelector('input[name="mode"]:checked').value;
                // this.applyFabricFilter( new fabric.Image.filters.Grayscale({
                //     mode: grayscaleOptions
                // }) );
                //
                // console.log(grayscaleOptions);
                this.applyFabricFilter( new fabric.Image.filters[filterType]() );
            },

            'Invert': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },
            'BlackWhite': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },

            'Brownie': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },
            'Vintage': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },
            'Kodachrome': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },

            'Technicolor': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },
            'Polaroid': () => {
                this.applyFabricFilter( new fabric.Image.filters[filterType]());
            },

        };

        return filters[filterType]();
    }



    removeColor() {
        let checkbox = document.getElementById('removeColor-checkbox');
        let removeDistance = document.getElementById('remove-color-distance');
        let colorToRemove = document.getElementById('colorToRemove');
        let rc = document.getElementById('removeColor');


        rc.addEventListener( 'click', e => {
            let obj = this._canvas.getActiveObject();
            let f = checkbox.value;

            if ( checkbox.checked ) {

                removeDistance.disabled = false;
                colorToRemove.disabled = false;

                this.applyFabricFilter( new fabric.Image.filters[f]({
                    distance: removeDistance.value,
                    color: colorToRemove.value
                }) );

                // since we use a resize filter on images larger than 2048 there may be a filter already in the
                // filter array. so we see if it's greater than or equal to 1. if so we'll just pop all the filters
            } else if (obj.filters.length >= 1) {
                obj.filters.pop();
                obj.applyFilters();
                this._canvas.renderAll();
            }
        });

        removeDistance.addEventListener('change', () => {

        })
    }

    /**
     * set up the backend. decide between webgl and canvas to run our filters on
     */
    // setBackEnd() {
    //     let webglBackend = new fabric.WebglFilterBackend();
    //     let canvas2dBackend = new fabric.Canvas2dFilterBackend();
    //     let backend     = document.querySelector('#mm-webgl');
    //
    //     backend.addEventListener('click', () => {
    //
    //         if (backend.checked) {
    //             fabric.filterBackend = webglBackend;
    //         } else {
    //             fabric.filterBackend = canvas2dBackend;
    //         }
    //
    //     });
    // }
    //
    // applyRanges() {
    //
    // }

    cropImage() {
        let cropTrigger = document.querySelector('.mm-crop-trigger');


        cropTrigger.addEventListener( 'click', (e) => {
            e.preventDefault();

            let obj = this._canvas.getActiveObject();
            let rect = new fabric.Rect({

            });

            if (obj) {
                console.log('active object is here');
                console.log(obj);
                obj.set({
                    selectable: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockRotation: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockUniScaling: true,
                    hasControls: false,
                    hasBorders: false
                });

                // this._canvas.on({
                //     'object:scaling':
                // })

            }
        });
    }


    do() {
        // this.setBackEnd();

        let list = document.querySelectorAll( 'input[type=checkbox]' );

        list.forEach( item => {
            item.checked = false;
        });

        this.addImageToCanvas();

        // this.doFilter();
        // this.usesCheckboxNameAsParameter();
        this.checkBoxFilter();
        this.radioFilter();
        this.removeColor();

        this.cropImage();


    }

}