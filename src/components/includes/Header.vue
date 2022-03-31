<template>
  <header id="header">
    <i class="fa fa-navicon toggle-sidebar" @click="$emit('toggleSidebar')"/>
    <div class="logo-wrapper">
      <img src="" class="logo-img"/>
    </div>

    <ul class="notification-bar ml-10">
      <li>
        <a v-toggle-modal="'LogoutModal'" class="n-a" href="javascript:void(0)">
          <i class="fa fa-sign-out fa-flip-horizontal"/>
        </a>
      </li>
    </ul>
    <modal
      id="LogoutModal"
      ref="modal"
      size="sm"
      color="default"
      next-text="خروج"
      :simple="false"
      :append-to-body="true"
      @next="logout"
    >
      <div class="text-center">
        <div class="center-block">
          <i class="fa fa-sign-out fa-flip-horizontal fa-5x text-muted mt-20"/>
          <h4 class="mb-40">خروج از حساب کاربری</h4>
          <p>آیا میخواهید از حساب کاربری خود خارج شوید؟</p>
        </div>
      </div>
    </modal>
  </header>
</template>

<script>

export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    logout() {
    },
  }
}
</script>
