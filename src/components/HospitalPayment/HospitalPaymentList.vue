<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th>شماره سفر</th>
          <th>استان</th>
          <th>شماره پرونده</th>
          <th>تاریخ تحویل</th>
          <th>تاریخ تشکیل</th>
          <th>تاریخ کارشناسی</th>
          <th>تاریخ تسویه</th>
          <th>نوع</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleHospitalInformation in hospitalPaymentRow" :key="singleHospitalInformation.id">
          <td>{{ singleHospitalInformation.id }}</td>
          <td>{{ singleHospitalInformation.travelId }}</td>
          <td>{{ singleHospitalInformation.cityId }}</td>
          <td>{{ singleHospitalInformation.parvandeNumber }}</td>
          <td>{{ singleHospitalInformation.tahvilDate }}</td>
          <td>{{ singleHospitalInformation.tashkilDate }}</td>
          <td>{{ singleHospitalInformation.karshenasiDate }}</td>
          <td>{{ singleHospitalInformation.tasvieDate }}</td>
          <td>{{ singleHospitalInformation.type }}</td>
          <td class="d-flex justify-content-around">
            <i
              @click="$emit('editSingleHospitalPayment',singleHospitalInformation)"
              class="far fa-edit i-btn font-15 pointer"></i>
            <i
              @click="confirmationDeleteCurrentHospitalPayment(singleHospitalInformation.id)"
              class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="hospitalPaymentRow.length === 0">
          <td colspan="10" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllHospitalPaymentList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleHospitalPaymentModal"
      ref="deleteSingleHospitalPaymentModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف پرونده"
      next-text="حذف پرونده"
      :next-focus="true"
      @next="removeSingleHospitalPayment"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <p class="font-13 mt-10">آیا مطمئن هستید که می خواید این پرونده را حدف کنید ؟</p>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "HospitalPaymentList",
  data() {
    return {
      loading: false,
      removeSingleHospitalPaymentId: '',
      hospitalPaymentRow: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllHospitalPaymentList()
  },
  methods: {
    getAllHospitalPaymentList() {
      this.loading = true
      this.$store.dispatch('HospitalPayment/getAllHospitalPaymentList', this.filter)
        .then(response => {
          this.hospitalPaymentRow = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentHospitalPayment(currentHospitalInformation) {
      this.removeSingleHospitalPaymentId = currentHospitalInformation
      this.$refs.deleteSingleHospitalPaymentModal.show()
    },
    removeSingleHospitalPayment() {
      this.loading = true
      this.$store.dispatch('HospitalPayment/deleteSingleHospitalPayment', this.removeSingleHospitalPaymentId)
        .then(response => {
          this.loading = false
          //update travel list
          this.getAllTravelList()
        })
        .catch(error => {
          this.loading = false
        })
    },
  }
}
</script>

<style scoped>

</style>
