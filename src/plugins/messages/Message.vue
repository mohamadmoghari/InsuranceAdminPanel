<template>
  <transition-group name="list-complete" tag="div" class="notify-notifications">
    <div
      v-for="item in $message.items"
      :key="item.id"
      class="list-complete-item"
    >
      <div class="notify" :class="'notify-' + item.type" @click="item.remove()">
        <span class="notify-label">
          <v-icon :name="iconName(item.type)" width="26px"></v-icon>
        </span>
        <span class="notify-text">{{ item.text }}</span>
        <button type="button" class="close">&times;</button>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  methods: {
    iconName(type) {
      return {
        success: 'check',
        info: 'info',
        warning: 'alert-triangle',
        danger: 'x-circle'
      }[type]
    }
  }
}
</script>
