<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th>شماره سفر</th>
          <th>استان</th>
          <th>نام کامل</th>
          <th>کد عضویت</th>
          <th>نام مرکز</th>
          <th>مبلغ کارشناسی</th>
          <th>مبلغ خسارت</th>
          <th>مغایرت</th>
          <th>نوع</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleInformation in paymentRow" :key="paymentRow.id">
          <td>{{ singleInformation.id }}</td>
          <td>{{ singleInformation.travelId }}</td>
          <td>{{ singleInformation.cityId }}</td>
          <td>{{ singleInformation.fullName }}</td>
          <td>{{ singleInformation.memberShipCode }}</td>
          <td>{{ singleInformation.markazName }}</td>
          <td>{{ singleInformation.karshenasiMab }}</td>
          <td>{{ singleInformation.khesaratMab }}</td>
          <td>{{ singleInformation.moghyerat }}</td>
          <td>{{ singleInformation.type }}</td>
          <td class="d-flex justify-content-around">
            <i
              @click="$emit('editSinglePayment',singleInformation)"
              class="far fa-edit i-btn font-15 pointer"></i>
            <i
              @click="confirmationDeleteCurrentPayment(singleInformation.id)"
              class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="paymentRow.length === 0">
          <td colspan="11" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllPaymentList"></pagination>
    <!--    delete single payment confirmation-->
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
      @next="removeSinglePayment"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <p class="font-13 mt-10">آیا مطمئن هستید که می خواید این صحت سنجی را حدف کنید ؟</p>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "PaymentList",
  data() {
    return {
      loading: false,
      removeSinglePaymentId: '',
      paymentRow: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllPaymentList()
  },
  methods: {
    getAllPaymentList() {
      this.loading = true
      this.$store.dispatch('PaymentValidation/getAllPaymentList', this.filter)
        .then(response => {
          this.paymentRow = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentPayment(currentInformation) {
      this.removeSinglePaymentId = currentInformation
      this.$refs.deleteSingleHospitalPaymentModal.show()
    },
    removeSinglePayment() {
      this.loading = true
      this.$store.dispatch('PaymentValidation/deleteSinglePayment', this.removeSinglePaymentId)
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
