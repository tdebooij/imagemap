<template>
  <vue-context ref="menu">
    <li>
      <a @click.prevent="$emit('addElement', 'rect', event)">Add Rectangle</a>
    </li>
    <li>
      <a @click.prevent="$emit('addElement', 'circle', event)">Add Circle</a>
    </li>
    <li>
      <a @click.prevent="$emit('addElement', 'ellipse', event)">Add Ellipse</a>
    </li>
    <li>
      <a @click.prevent="$emit('addElement', 'polygon', event)">Add Polygon</a>
    </li>
  </vue-context>
</template>
<script>
import VueContext from "vue-context";
export default {
  data() {
    return {
      event: undefined
    };
  },
  methods: {
    open(event) {
      this.event = event;
      this.$refs.menu.open(event);
    }
  },
  components: {
    VueContext
  }
};
</script>
