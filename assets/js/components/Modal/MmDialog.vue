<template>
    <transition name="mm-lightbox">
        <dialog class="mm-lightbox-wrapper">
            <div class="mm-lightbox-container">
                <button slot="header"
                        class="mm-lightbox-close"
                        @click="$emit('close')">
                    x
                </button>
                <slot name="header"></slot>
                <slot name="main-content"></slot>
                <slot name="footer"></slot>
            </div>
        </dialog>
    </transition>
</template>

<script>
    export default {
        name: "mm-dialog"
    }
</script>
