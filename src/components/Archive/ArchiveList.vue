<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">استان</th>
          <th width="150">امتیاز</th>
          <th width="150">توضیحات</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleArchive in archiveLists" :key="singleArchive.id">
          <td>{{ singleArchive.id }}</td>
          <td>{{ singleArchive.travelId }}</td>
          <td>{{ singleArchive.cityId }}</td>
          <td>{{ singleArchive.score }}</td>
          <td>{{ singleArchive.descrition }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleArchive',singleArchive)"></i>
            <i @click="confirmationDeleteCurrentArchive(singleArchive.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="archiveLists.length === 0">
          <td colspan="6" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllArchiveList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleArchiveModal"
      ref="deleteSingleArchiveModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف سند بایگانی"
      next-text="حذف سند بایگانی"
      :next-focus="true"
      @next="removeSingleArchive"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleArchiveLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این بایگانی را حدف کنید ؟</p>
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
      deleteSingleArchiveLoading: false,
      removeSingleTravelId: '',
      archiveLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllArchiveList()
  },
  methods: {
    getAllArchiveList() {
      this.loading = true
      this.$store.dispatch('Archive/getAllArchiveList', this.filter)
        .then(response => {
          this.archiveLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentArchive(currentTravelId) {
      this.removeSingleTravelId = currentTravelId
      this.$refs.deleteSingleTravelModal.show()
    },
    removeSingleArchive() {
      this.deleteSingleTravelLoading = true
      this.$store.dispatch('Travel/deleteSingleTravel', this.removeSingleTravelId)
        .then(response => {
          this.deleteSingleTravelLoading = false
          //update travel list
          this.getAllTravelList()
        })
        .catch(error => {
          this.deleteSingleTravelLoading = false
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
