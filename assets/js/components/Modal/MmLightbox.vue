<template>
    <transition name="mm-lightbox">
        <div class="mm-lightbox-mask">

           <!--<div tabindex="-1"-->
                <!--role="dialog"-->
                <!--id="mmLightbox"-->
                <!--class="mm-lightbox-wrapper">-->
               <!--<div class="mm-lightbox-container">-->
                   <!--<button slot="header"-->
                           <!--class="mm-lightbox-close"-->
                           <!--@click="$emit('close')"-->
                           <!--@keyup.escape="$emit('close')"-->
                           <!--ref="closeButton">-->
                       <!--x-->
                   <!--</button>-->
                   <!--<slot name="header"></slot>-->
                   <!--<slot name="main-content"></slot>-->
                   <!--<slot name="footer"></slot>-->
               <!--</div>-->
           <!--</div>-->

            <div class="mm-lightbox-container-2">
                <div class="mm-lightbox-header">
                    <slot name="header"></slot>
                    <button type="button"
                                class="mm-lightbox-close"
                                @click="$emit('close')"
                                @keyup.escape="$emit('close')"
                                ref="closeButton">
                            x
                    </button>
                </div>
                <div class="mm-lightbox-content">
                    <slot name="content"></slot>
                </div>
                <div class="mm-lightbox-footer">
                    <slot name="footer">

                    </slot>
                </div>
            </div>

        </div>

    </transition>
</template>

<script>
    export default {
        name: "mm-lightbox",


        created: function () {
            // `this` points to the vm instance

        },

        mounted: function () {
            this.$nextTick(function () {
                this.$refs.closeButton.focus();
            })
        }
    }
</script>