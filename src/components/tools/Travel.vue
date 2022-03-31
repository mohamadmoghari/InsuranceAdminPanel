<template>
  <b-select
    v-model="selected"
    :items="rows"
    :loading="loading"
    label="انتخاب سفر"
    @change="$emit('change', $event)"
    @open="checkUpdate"
  ></b-select>
</template>

<script>
export default {
  name: 'TravelSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    showAll: {type: Boolean, default: true},
    value: {type: [String, Number], default: ''}
  },
  data() {
    return {
      loading: false,
      rows: [],
      selected: ''
    }
  },
  watch: {
    value(val) {
      this.selected = val
      this.checkUpdate()
    }
  },
  created() {
    this.selected = this.value
    this.checkUpdate()
  },
  methods: {
    update() {
      this.$store.dispatch('Global/getAllTravelList')
        .then(response => {
          this.rows = response.data.map(p => ({
            name: p.travelName,
            value: p.id,
          }))
        })
    },
    checkUpdate() {
      if (this.rows.length === 0) this.update()
    }
  }
}
</script>
