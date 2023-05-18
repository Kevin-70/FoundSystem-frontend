<template>
    <span>
      <slot v-if="success"></slot>
    </span>
  </template>
  
  <script>
  export default {
    name: 'lazy-load',
    props: {
      time: {
        required: false,
        type: Number,
        default: 200,
      },
    },
    data() {
      return {
        success: false,
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let vm = this;
        vm.clearId = setTimeout(() => {
          vm.success = true;
          vm.$emit('done');
        }, vm.time);
      },
    },
    beforeDestroy() {
      clearTimeout(this.clearId);
    },
  };
  </script>
  
  <style lang="sass" scoped>
  </style>
  