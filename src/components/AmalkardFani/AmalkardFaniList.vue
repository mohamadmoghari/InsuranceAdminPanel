<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">استان</th>
          <th width="150">کد شخصی</th>
          <th width="150">درصد پذیرش</th>
          <th width="150">درصد کارشناسی</th>
          <th width="150">درصد ثبت</th>
          <th width="150">بایگانی</th>
          <th width="150">پرداخت</th>
          <th width="150">توضیحات</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singlePerformance in performanceLists" :key="singlePerformance.id">
          <td>{{ singlePerformance.id }}</td>
          <td>{{ singlePerformance.travelId }}</td>
          <td>{{ singlePerformance.cityId }}</td>
          <td>{{ singlePerformance.personelCode }}</td>
          <td>{{ singlePerformance.pazireshDarsad }}</td>
          <td>{{ singlePerformance.karshenasiDarsad }}</td>
          <td>{{ singlePerformance.sabtDarsad }}</td>
          <td>{{ singlePerformance.baygani }}</td>
          <td>{{ singlePerformance.score }}</td>
          <td>{{ singlePerformance.pardakht }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSinglePerformance',singlePerformance)"></i>
            <i @click="confirmationDeleteCurrentPerformance(singlePerformance.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="performanceLists.length === 0">
          <td colspan="11" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllPerformanceList"></pagination>
    <!--    delete single performance confirmation-->
    <modal
      id="deleteSinglePerformanceModal"
      ref="deleteSinglePerformanceModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف عملکرد"
      next-text="حذف عملکرد"
      :next-focus="true"
      @next="removeSinglePerformance"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSinglePerformanceLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این عملکرد را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "AmalkardFaniList",
  data() {
    return {
      loading: false,
      deleteSinglePerformanceLoading: false,
      removeSinglePerformanceId: '',
      performanceLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllPerformanceList()
  },
  methods: {
    getAllPerformanceList() {
      this.loading = true
      this.$store.dispatch('TechnicalPerformance/getAllTechnicalPerformanceList', this.filter)
        .then(response => {
          this.performanceLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentPerformance(currentTravelId) {
      this.removeSingleTravelId = currentTravelId
      this.$refs.deleteSinglePerformanceModal.show()
    },
    removeSinglePerformance() {
      this.deleteSinglePerformanceLoading = true
      this.$store.dispatch('TechnicalPerformance/deleteSingleTechnicalPerformance', this.removeSingleTravelId)
        .then(response => {
          this.$refs.deleteSinglePerformanceModal.close()
          this.deleteSinglePerformanceLoading = false
          //update travel list
          this.getAllPerformanceList()
        })
        .catch(error => {
          this.deleteSinglePerformanceLoading = false
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
