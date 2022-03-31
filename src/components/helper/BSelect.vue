<template>
  <div
    ref="wrapper"
    class="b-select b-select-soft"
    :class="_class"
    tabindex="1"
    @click="openEl"
    @blur="onWrapperBlur"
  >
    <div v-if="filterable && open" class="b-selected-item">
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        class="form-control"
        :placeholder="label"
        @keydown.up.prevent="hover--"
        @keydown.down.prevent="hover++"
        @keydown.enter.prevent="select(undefined)"
        @blur.stop.prevent="onInputBlur"
      />
    </div>
    <div v-else="" ref="el" class="b-selected-item">
      {{ selected.name ? selected.name : label }}
    </div>
    <ul class="c-scroll c-right">
      <li
        v-for="(item, i) in _items"
        ref="li"
        :key="i"
        :class="{
          disabled: item.disabled,
          selected: item.selected,
          'is-hover': i === hover
        }"
        @click="select(item.value)"
        @mouseover="hover = i"
      >
        {{ item.name }}
      </li>
    </ul>
    <input type="hidden" :name="name" :value="selected.value" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    items: { type: Array, default: () => [] },
    nameKey: { type: String, default: 'name' },
    valueKey: { type: String, default: 'value' },
    multiple: { type: Boolean, default: false },
    label: { type: String, default: '' },
    value: { type: [Number, String, Boolean], default: '' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    name: { type: String, default: '' },
    filterable: { type: Boolean, default: false }
  },
  data() {
    return {
      selected: {},
      open: false,
      search: '',
      hover: 0
    }
  },
  computed: {
    _items() {
      let items = []
      this.items.map(item => {
        let name = item[this.nameKey]
        let val = item[this.valueKey]
        if (
          this.filterable &&
          this.search !== '' &&
          this.search !== this.selected.name &&
          name.indexOf(this.search) === -1
        )
          return
        items.push({
          name: name === undefined ? item : name,
          value: val === undefined ? item : val,
          disabled: Boolean(item.disabled)
        })
      })
      if (!items.length)
        items.push({
          name: 'هیچ موردی وجود ندارد',
          value: '',
          disabled: true
        })
      return items
    },
    _class() {
      return {
        open: this.open,
        disabled: this.disabled,
        'loading loading-primary': this.loading,
        'b-select-multiple': this.multiple,
        selected: this.selected.value !== undefined
      }
    }
  },
  watch: {
    hover: {
      immediate: true,
      handler(val) {
        let max = this._items.length - 1
        if (val < 0) {
          this.hover = max
        } else if (val > max) {
          this.hover = 0
        }
        this.$nextTick(() => {
          this.$refs.li[this.hover].scrollIntoView({
            block: 'nearest',
            inline: 'nearest'
          })
        })
      }
    },
    search() {
      this.hover = 0
    },
    items() {
      this.select(this.value, false)
    },
    value: {
      handler() {
        this.select(this.value, false)
      },
      immediate: true
    },
    open(val) {
      if (!val) {
        this.$nextTick(() => {
          this.$refs.wrapper.blur()
        })
        this.$emit('close', this)
      } else {
        if (this.filterable) {
          this.$nextTick(() => {
            this.$refs.searchInput.focus()
            this.$refs.searchInput.select()
          })
          this.search = this.selected.name
        }
        this.$emit('open', this)
      }
    }
  },
  created() {
    //this.select(this.value, false)
  },
  methods: {
    openEl() {
      if (!this.disabled) this.open = !this.open
    },
    closeEl() {
      setTimeout(() => {
        this.open = false
      }, 20)
    },
    select(val, emit) {
      //if(this.disabled) return;
      //if(this.selected.value == val) return (emit !== false && this.closeEl());

      this.search = ''
      if (val === undefined) {
        let item = this._items[this.hover]
        val = item ? item.value : ''
      }

      let item = {}
      this._items.forEach(v => {
        v.selected = false
        if (v.value == val) item = v
      })

      if (item.disabled) return

      item.selected = true
      this.selected = item

      if (emit !== false) {
        this.$emit('change', this.selected.value)
        this.$emit('input', this.selected.value)
        this.closeEl()
      }
      //this.closeEl();
    },
    onWrapperBlur() {
      if (this.filterable) return
      this.open = false
    },
    onInputBlur() {
      this.$refs.wrapper.focus()
      setTimeout(() => {
        if (this.open) {
          this.$refs.wrapper.click()
        }
      }, 100)
    }
  }
}
</script>
