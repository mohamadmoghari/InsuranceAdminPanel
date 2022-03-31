<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">شماره سفر</th>
          <th width="190">شماره شهر</th>
          <th width="150">کد مرکز</th>
          <th width="150">نام وارد</th>
          <th width="150">مبلغ کلی خسارت</th>
          <th width="150">تعداد خسارت</th>
          <th width="150">شماره پرونده بررسی شده</th>
          <th width="150">شماره پرونده مشکل دار</th>
          <th width="150">نتیجه</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleInsurance in insuranceLists" :key="singleInsurance.id">
          <td>{{ singleInsurance.id }}</td>
          <td>{{ singleInsurance.travelId }}</td>
          <td>{{ singleInsurance.cityId }}</td>
          <td>{{ singleInsurance.membershipCode }}</td>
          <td>{{ singleInsurance.parentName }}</td>
          <td>{{ singleInsurance.totalKhesatatMablagh }}</td>
          <td>{{ singleInsurance.khesaratCount }}</td>
          <td>{{ singleInsurance.baresiParvandeNumber }}</td>
          <td>{{ singleInsurance.moshkelParvandeNumber }}</td>
          <td>{{ singleInsurance.result }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleInsurance',singleInsurance)"></i>
            <i @click="confirmationDeleteCurrentInsurance(singleInsurance.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="insuranceLists.length == 0">
          <td colspan="11" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllInsuranceList"></pagination>
    <!--        delete single performance confirmation-->
    <modal
      id="deleteSingleInsuranceModal"
      ref="deleteSingleInsuranceModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف بیمه"
      next-text="حذف بیمه"
      :next-focus="true"
      @next="removeSingleInsurance"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleInsuranceLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این بیمه را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "BimeShodeList",
  data() {
    return {
      loading: false,
      deleteSingleInsuranceLoading: false,
      removeSingleMeetingId: '',
      insuranceLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllInsuranceList()
  },
  methods: {
    getAllInsuranceList() {
      this.loading = true
      this.$store.dispatch('BimeShode/getAllBimeShodeList', this.filter)
        .then(response => {
          this.insuranceLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentInsurance(currentInsuranceId) {
      this.removeSingleInsuranceId = currentInsuranceId
      this.$refs.deleteSingleInsuranceModal.show()
    },
    removeSingleInsurance() {
      this.deleteSingleInsuranceLoading = true
      this.$store.dispatch('BimeShode/deleteSingleBimeShode', this.removeSingleInsuranceId)
        .then(response => {
          this.$refs.deleteSingleInsuranceModal.close()
          this.deleteSingleInsuranceLoading = false
          //update travel list
          this.getAllMeetingList()
        })
        .catch(error => {
          this.deleteSingleInsuranceLoading = false
        })
    },
    closeDeleteSingleInsuranceConfirmation() {
      //this.$refs.deleteSingleTravelModal.close()
    }
  }
}
</script>

<style scoped>

</style>
