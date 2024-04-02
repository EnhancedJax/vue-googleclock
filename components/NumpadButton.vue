<template>
    <button :class="`rounded-full text-ctext-100 ${special ? 'text-2xl bg-cblue-100' : 'text-4xl bg-cblue-700'} hover:rounded-[30px] hover:bg-ctext-500`">{{ label }}</button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        special: {
            type: Boolean,
            default: false
        }
    }
}
</script>