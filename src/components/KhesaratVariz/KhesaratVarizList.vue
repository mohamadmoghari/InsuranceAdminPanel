<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">شهر</th>
          <th width="150">تاریخ</th>
          <th width="150">زمان تسویه</th>
          <th width="150">زمان صدور</th>
          <th width="150">زمان واریز</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleKhesarat in KhesaratLists" :key="singleKhesarat.id">
          <td>{{ singleKhesarat.id }}</td>
          <td>{{ singleKhesarat.travelId }}</td>
          <td>{{ singleKhesarat.cityId }}</td>
          <td>{{ singleKhesarat.date }}</td>
          <td>{{ singleKhesarat.tasvieTime }}</td>
          <td>{{ singleKhesarat.sodorTime }}</td>
          <td>{{ singleKhesarat.varizTime }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleKhesarat',singleKhesarat)"></i>
            <i @click="confirmationDeleteCurrentKhesarat(singleKhesarat.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="KhesaratLists.length == 0">
          <td colspan="6" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllKhesaratList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleKhesaratModal"
      ref="deleteSingleKhesaratModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف خسارت"
      next-text="حذف خسارت"
      :next-focus="true"
      @next="removeSingleKhesarat"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleKhesaratLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این خسارت را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "KhesaratVarizList",
  data() {
    return {
      loading: false,
      deleteSingleKhesaratLoading: false,
      removeSingleKhesaratId: '',
      KhesaratLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllKhesaratList()
  },
  methods: {
    getAllKhesaratList() {
      this.loading = true
      this.$store.dispatch('KhesaratVariz/getAllKhesaratVarizList', this.filter)
        .then(response => {
          this.KhesaratLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentKhesarat(currentKhesaratId) {
      this.removeSingleKhesaratId = currentKhesaratId
      this.$refs.deleteSingleKhesaratModal.show()
    },
    removeSingleKhesarat() {
      this.deleteSingleKhesaratLoading = true
      this.$store.dispatch('KhesaratVariz/deleteSingleKhesaratVariz', this.removeSingleKhesaratId)
        .then(response => {
          this.deleteSingleKhesaratLoading = false
          //update travel list
          this.getAllKhesaratList()
        })
        .catch(error => {
          this.deleteSingleKhesaratLoading = false
        })
    },
    closeDeleteSingleTravelConfirmation() {
      //this.$refs.deleteSingleTravelModal.close()
    }
  }
}
</script>

<style scoped>

</style>
