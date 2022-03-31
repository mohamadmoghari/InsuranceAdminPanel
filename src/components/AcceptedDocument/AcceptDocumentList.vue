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
          <td>{{ singleArchive.nazmDaryaftScore }}</td>
          <td>{{ singleArchive.nazmDaryaftDesc }}</td>
          <td>{{ singleArchive.residEraeeScore }}</td>
          <td>{{ singleArchive.residEraeeDesc }}</td>
          <td>{{ singleArchive.pazireshSanadScore }}</td>
          <td>{{ singleArchive.pazireshSanadDesc }}</td>
          <td>{{ singleArchive.kharejTahodCount }}</td>
          <td>{{ singleArchive.sabtNashode }}</td>
          <td>{{ singleArchive.pardakhtShodaniCount }}</td>
          <td>{{ singleArchive.sayerCount }}</td>
          <td>{{ singleArchive.sCore }}</td>
          <td>{{ singleArchive.desc }}</td>
          <td>{{ singleArchive.moratabSaziScore }}</td>
          <td>{{ singleArchive.moratabSaziDesc }}</td>
          <td>{{ singleArchive.travelBefore }}</td>
          <td>{{ singleArchive.taklifAsnadScore }}</td>
          <td>{{ singleArchive.taklifAsnadDesc }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleDocument',singleArchive)"></i>
            <i @click="confirmationDeleteCurrentDocument(singleArchive.id)"
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
      @change="getAllDocumentList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleDocumentModal"
      ref="deleteSingleDocumentModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف سند"
      next-text="حذف سند"
      :next-focus="true"
      @next="removeSingleDocument"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleDocumentLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این بایگانی را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "AcceptDocumentList",
  data() {
    return {
      loading: false,
      deleteSingleDocumentLoading: false,
      removeSingleDocumentId: '',
      documentLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllDocumentList()
  },
  methods: {
    getAllDocumentList() {
      this.loading = true
      this.$store.dispatch('AcceptedDocument/getAllAcceptedDocumentList', this.filter)
        .then(response => {
          this.documentLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentDocument(currentTravelId) {
      this.removeSingleTravelId = currentTravelId
      this.$refs.deleteSingleDocumentModal.show()
    },
    removeSingleDocument() {
      this.deleteSingleDocumentLoading = true
      this.$store.dispatch('AcceptedDocument/deleteSingleAcceptedDocument', this.removeSingleTravelId)
        .then(response => {
          this.deleteSingleDocumentLoading = false
          //update travel list
          this.getAllDocumentList()
        })
        .catch(error => {
          this.deleteSingleDocumentLoading = false
        })
    },
  }
}
</script>

<style scoped>

</style>
