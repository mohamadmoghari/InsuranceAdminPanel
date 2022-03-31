<template>
  <div
    class="beh-loading"
    :class="[{ 'beh-loading-active': loading }, 'beh-loading-' + size]"
  >
    <slot></slot>
    <div class="beh-spinner">
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
        perspectiveAspectRato="none"
      >
        <circle
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
          class="circle"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: ['loading', 'size']
}
</script>
