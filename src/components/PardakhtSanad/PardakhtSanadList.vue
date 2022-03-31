<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="200">شهر</th>
          <th width="190">امتیاز کنترل فرایند</th>
          <th width="150">توضیحات کنترل فرایند</th>
          <th width="150">امتیاز مطلوبیت</th>
          <th width="150">توضیحات مطلوبیت</th>
          <th width="150">محل عملیات مالی</th>
          <th width="150">مسول عملیات مالی</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singlePardakhtSanad in PardakhtSanadLists" :key="singlePardakhtSanad.id">
          <td>{{ singlePardakhtSanad.id }}</td>
          <td>{{ singlePardakhtSanad.travelId }}</td>
          <td>{{ singlePardakhtSanad.cityId }}</td>
          <td>{{ singlePardakhtSanad.farayandControlScore }}</td>
          <td>{{ singlePardakhtSanad.farayandControlDesc }}</td>
          <td>{{ singlePardakhtSanad.matlobiatScore }}</td>
          <td>{{ singlePardakhtSanad.matlobiatDesc }}</td>
          <td>{{ singlePardakhtSanad.maliActionMahal }}</td>
          <td>{{ singlePardakhtSanad.maliActionMasol }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSinglePardakht',singlePardakhtSanad)"></i>
            <i @click="confirmationDeleteCurrentPardakhtSanad(singlePardakhtSanad.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="PardakhtSanadLists.length == 0">
          <td colspan="11" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllPardakhtSanadList"></pagination>
    <!--        delete single performance confirmation-->
    <modal
      id="deleteSinglePardakhtSanadModal"
      ref="deleteSinglePardakhtSanadModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف پرداخت"
      next-text="حذف پرداخت"
      :next-focus="true"
      @next="removeSinglePardakhtSanad"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSinglePardakhtSanadLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این پرداخت را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "PardakhtSanadList",
  data() {
    return {
      loading: false,
      deleteSinglePardakhtSanadLoading: false,
      removeSinglePardakhtSanadId: '',
      PardakhtSanadLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllPardakhtSanadList()
  },
  methods: {
    getAllPardakhtSanadList() {
      this.loading = true
      this.$store.dispatch('PardakhtSanad/getAllPardakhtSanadList', this.filter)
        .then(response => {
          this.PardakhtSanadLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentPardakhtSanad(currentPardakhtSanadId) {
      this.removeSinglePardakhtSanadId = currentPardakhtSanadId
      this.$refs.deleteSinglePardakhtSanadModal.show()
    },
    removeSinglePardakhtSanad() {
      this.deleteSinglePardakhtSanadLoading = true
      this.$store.dispatch('PardakhtSanad/deleteSinglePardakhtSanad', this.removeSinglePardakhtSanadId)
        .then(response => {
          this.$refs.deleteSinglePardakhtSanadModal.close()
          this.deleteSinglePardakhtSanadLoading = false
          //update travel list
          this.getAllPardakhtSanadList()
        })
        .catch(error => {
          this.deleteSinglePardakhtSanadLoading = false
        })
    },
    closeDeleteSinglePerformanceConfirmation() {
      //this.$refs.deleteSingleTravelModal.close()
    }
  }
}
</script>

<style scoped>

</style>
