<template>
  <div
    :class="[
      wrapperClass,
      { 'active-sidebar': sidebarOpen}
    ]"
    class="main-wrapper"
  >
    <transition name="slide-right">
      <router-view
        ref="sidebarOver"
        name="right-sidebar-o"
        @toggleSidebar="toggleSidebar"
      />
    </transition>

    <transition name="slide-right">
      <router-view ref="sidebar" name="right-sidebar"/>
    </transition>

    <div id="main" ref="container" :class="wrapperClass">
      <router-view
        ref="header"
        name="header"
        @toggleSidebar="toggleSidebar"
      />
      <transition name="fade-app">
        <div
          v-if="['Login', 'register'].indexOf($route.name) !== -1"
          class="login-bg"
        />
      </transition>

      <transition name="app-scale">
        <keep-alive>
          <router-view class="router-base"/>
        </keep-alive>
      </transition>

      <transition name="fade-app">
        <router-view ref="footer" name="footer"/>
      </transition>
    </div>

    <transition name="fade">
      <div
        v-if="this.$store.state.loadingQueue > 0"
        class="page-loader loading loading-primary loading-center"
      />
    </transition>
  </div>
</template>

<script>

const triggerScroll = () => window.dispatchEvent(new Event('scroll'))
const triggerResize = () => window.dispatchEvent(new Event('resize'))
export default {
  name: 'App',
  components: {},
  data() {
    return {
      timeout: false,
      sidebarOpen: false,
      windowWidth: window.innerWidth,
      routerTransitionName: 'slide-left',
      sidebarBreakpointNumber: "992px",
    }
  },
  computed: {
    wrapperClass() {
      switch (this.$route.name) {
        case '404':
          return 'page-404'
        case 'login':
          return 'login-register-page';
        default:
          return ''
      }
    },

  },
  watch: {
    windowWidth(val) {
      this.toggleSidebar(val > this.sidebarBreakpointNumber)
    },
    '$route.name'(after, before) {
      let ac = ['register', 'login']
      if (ac.indexOf(after) !== -1 || ac.indexOf(before) !== -1) {
        this.routerTransitionName = 'slide-right'
      } else {
        this.routerTransitionName = 'slide-left'
      }
      this.toggleSidebar(false)
      setTimeout(triggerResize, 100)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sidebarOpen = this.windowWidth > this.sidebarBreakpointNumber
      window.addEventListener('focus', triggerResize)
    })
    // update sticky and other listeners
    setInterval(triggerScroll, 1000)
  },
  created() {
  },
  methods: {
    toggleSidebar(show) {
      this.sidebarOpen = typeof show === 'boolean' ? show : !this.sidebarOpen
      if (this.sidebarOpen && this.windowWidth < this.sidebarBreakpointNumber + 1) {
        let x = window.scrollX
        let y = window.scrollY
        window.onscroll = () => window.scrollTo(x, y)
      } else {
        window.onscroll = () => {
        }
      }
    }
  }
}
</script>

<style></style>
