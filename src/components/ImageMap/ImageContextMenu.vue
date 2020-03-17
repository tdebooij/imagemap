<template>
  <vue-context ref="menu">
    <li>
      <a @click.prevent="onClick($event.target.innerText)">Option 1</a>
    </li>
    <li>
      <a @click.prevent="onClick($event.target.innerText)">Option 2</a>
    </li>
  </vue-context>
</template>
<script>
import VueContext from "vue-context";
import "~vue-context/dist/css/vue-context.css";
export default {
  components: {
    VueContext
  }
};
</script>
