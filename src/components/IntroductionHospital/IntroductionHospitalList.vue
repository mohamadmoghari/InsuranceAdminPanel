<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">شهر</th>
          <th width="150">موضوع</th>
          <th width="150">تعداد</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleIntroduction in IntroductionLists" :key="singleIntroduction.id">
          <td>{{ singleIntroduction.id }}</td>
          <td>{{ singleIntroduction.travelId }}</td>
          <td>{{ singleIntroduction.cityId }}</td>
          <td>{{ singleIntroduction.subject }}</td>
          <td>{{ singleIntroduction.count }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer"
               @click="$emit('editSingleIntroduction',singleIntroduction)"></i>
            <i @click="confirmationDeleteCurrentIntroduction(singleIntroduction.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="IntroductionLists.length === 0">
          <td colspan="6" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllIntroductionList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleIntroductionModal"
      ref="deleteSingleIntroductionModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف"
      next-text="حذف"
      :next-focus="true"
      @next="removeSingleIntroduction"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleIntroductionLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این بیمارستان را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "IntroductionList",
  data() {
    return {
      loading: false,
      deleteSingleIntroductionLoading: false,
      removeSingleIntroductionId: '',
      IntroductionLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllIntroductionList()
  },
  methods: {
    getAllIntroductionList() {
      this.loading = true
      this.$store.dispatch('IntroductionHospital/getAllIntroductionHospitalList', this.filter)
        .then(response => {
          this.documentLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentIntroduction(currentIntroductionId) {
      this.removeSingleIntroductionId = currentIntroductionId
      this.$refs.deleteSingleIntroductionModal.show()
    },
    removeSingleIntroduction() {
      this.deleteSingleIntroductionLoading = true
      this.$store.dispatch('IntroductionHospital/deleteSingleIntroductionHospital', this.removeSingleIntroductionId)
        .then(response => {
          this.deleteSingleIntroductionLoading = false
          //update travel list
          this.getAllDocumentList()
        })
        .catch(error => {
          this.deleteSingleIntroductionLoading = false
        })
    },
  }
}
</script>

<style scoped>

</style>
