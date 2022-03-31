<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">شهر</th>
          <th width="150">شماره پرونده</th>
          <th width="150">تاریخ تحویل</th>
          <th width="150">تاریخ تشکیل پرونده</th>
          <th width="150">تاریخ کارشناسی</th>
          <th width="150">تاریخ تسویه</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleParaclinic in ParaclinicLists" :key="singleParaclinic.id">
          <td>{{ singleParaclinic.id }}</td>
          <td>{{ singleParaclinic.travelId }}</td>
          <td>{{ singleParaclinic.cityId }}</td>
          <td>{{ singleParaclinic.parvandeNumber }}</td>
          <td>{{ singleParaclinic.tahvilDate }}</td>
          <td>{{ singleParaclinic.tashkilDate }}</td>
          <td>{{ singleParaclinic.karshenasiDate }}</td>
          <td>{{ singleParaclinic.tasvieDate }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleParaclinic',singleParaclinic)"></i>
            <i @click="confirmationDeleteCurrentParaclinic(singleParaclinic.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="ParaclinicLists.length === 0">
          <td colspan="9" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllParaclinicList"></pagination>
    <!--    delete single performance confirmation-->
    <modal
      id="deleteSingleParaclinicModal"
      ref="deleteSingleParaclinicModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف پرونده"
      next-text="حذف پرونده"
      :next-focus="true"
      @next="removeSingleParaclinic"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleParaclinicLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این پرنده را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "CarList",
  data() {
    return {
      loading: false,
      deleteSingleParaclinicLoading: false,
      removeSingleParaclinicId: '',
      ParaclinicLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllParaclinicList()
  },
  methods: {
    getAllParaclinicList() {
      this.loading = true
      this.$store.dispatch('ParaclinicParvandePardakht/getAllParaclinicParvandePardakhtList', this.filter)
        .then(response => {
          this.ParaclinicLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentParaclinic(currentParaclinicId) {
      this.removeSingleParaclinicId = currentParaclinicId
      this.$refs.deleteSingleParaclinicModal.show()
    },
    removeSingleParaclinic() {
      this.deleteSingleParaclinicLoading = true
      this.$store.dispatch('ParaclinicParvandePardakht/deleteSingleParaclinicParvandePardakht', this.removeSingleParaclinicId)
        .then(response => {
          this.$refs.deleteSingleParaclinicModal.close()
          this.deleteSingleParaclinicLoading = false
          //update travel list
          this.getAllParaclinicList()
        })
        .catch(error => {
          this.deleteSingleParaclinicLoading = false
        })
    },
    closeDeleteSingleParaclinicConfirmation() {
      //this.$refs.deleteSingleTravelModal.close()
    }
  }
}
</script>

<style scoped>

</style>
