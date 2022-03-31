<template>
  <nav class="text-center">
    <ul class="pagination vm">
      <li
        v-for="item in pages"
        :class="[item.cls, { disabled: !item.page }]"
        class="page-item"
      >
        <a href="#" @click.prevent="goTo(item.page)">{{ item.html }}</a>
      </li>
    </ul>
    <select
      v-if="total > 9"
      v-model="pageModel"
      class="form-control input-sm inline-block vm"
      style="margin: 18px 0"
    >
      <option v-for="n in total" :value="n">{{ n }}</option>
    </select>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  model: {
    prop: 'page',
    event: 'change'
  },
  props: {
    totalRows: { type: Number, default: 0 },
    page: { type: Number, default: 0 },
    balance: { type: Number, default: 3 },
    perPage: { type: Number, default: 10 }
  },
  data() {
    return {}
  },
  computed: {
    total() {
      return Math.ceil(this.totalRows / this.perPage)
    },
    pageModel: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        return this.page
      }
    },
    pages() {
      let pages = []
      if (this.total === 1) return pages
      let add = (num, html) => {
        pages.push({
          page: num,
          html: html,
          cls: num === this.page ? 'active' : ''
        })
      }
      let balance = this.balance,
        min = this.page - balance,
        max = this.page + balance

      if (min < 1) {
        max += Math.abs(min) + 1
        min = 1
      }
      if (max > this.total) {
        min -= max - this.total
        max = this.total
        if (min < 1) min = 1
      }
      if (min > 1) {
        add(1, 'صفحه اول')
        add(0, '...')
      }
      for (let i = min; i <= max; i++) add(i, i)
      if (max < this.total) {
        add(0, '...')
        add(this.total, 'صفحه آخر')
      }
      return pages
    }
  },
  methods: {
    goTo(page) {
      if (page === 0 || page === this.page) return
      this.$emit('change', page)
    },
    update() {}
  }
}
</script>
