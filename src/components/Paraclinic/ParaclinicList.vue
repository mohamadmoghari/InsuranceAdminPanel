<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">استان</th>
          <th width="150">نام مرکز</th>
          <th width="150">تعداد سند</th>
          <th width="150">شماره پرونده</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleParaclinic in paraclinicLists" :key="singleParaclinic.id">
          <td>{{ singleParaclinic.id }}</td>
          <td>{{ singleParaclinic.cityId }}</td>
          <td>{{ singleParaclinic.markazName }}</td>
          <td>{{ singleParaclinic.sanadCount }}</td>
          <td>{{ singleParaclinic.parvandeNumber }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer"
               @click="$emit('editSingleParaclinicList',singleParaclinic)"></i>
            <i @click="confirmationDeleteCurrentParaclinic(singleParaclinic.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="paraclinicLists.length === 0">
          <td colspan="6" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllParaclinicList"></pagination>
    <!--    delete single Paraclinic confirmation-->
    <modal
      id="deleteSingleParaclinicModal"
      ref="deleteSingleParaclinicModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف"
      next-text="حذف"
      :next-focus="true"
      @next="removeSingleParaclinic"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleParaclinicLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این پاراکلینیک را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "ArchiveList",
  data() {
    return {
      loading: false,
      deleteSingleParaclinicLoading: false,
      removeSingleParaclinicId: '',
      paraclinicLists: [],
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
      this.$store.dispatch('Paraclinic/getAllParaclinicList', this.filter)
        .then(response => {
          this.paraclinicLists = response.data.list
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
      this.$store.dispatch('Paraclinic/deleteSingleParaclinic', this.removeSingleTravelId)
        .then(response => {
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
