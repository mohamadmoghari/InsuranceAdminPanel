<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">شهر</th>
          <th width="150">کد مرکز</th>
          <th width="150">شئونات اداری</th>
          <th width="150">پاسخگویی</th>
          <th width="150">پیگیری</th>
          <th width="150">دانش</th>
          <th width="150">حضور</th>
          <th width="150">کد پرسنلی</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleRaftar in RaftarLists" :key="singleRaftar.id">
          <td>{{ singleRaftar.id }}</td>
          <td>{{ singleRaftar.travelId }}</td>
          <td>{{ singleRaftar.cityId }}</td>
          <td>{{ singleRaftar.membershipCode }}</td>
          <td>{{ singleRaftar.shonatEdary }}</td>
          <td>{{ singleRaftar.pasokhgoie }}</td>
          <td>{{ singleRaftar.peygiri }}</td>
          <td>{{ singleRaftar.danesh }}</td>
          <td>{{ singleRaftar.hozor }}</td>
          <td>{{ singleRaftar.personelCode }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleRaftar',singleRaftar)"></i>
            <i @click="confirmationDeleteCurrentRaftar(singleRaftar.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="RaftarLists.length === 0">
          <td colspan="11" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllRaftarList"></pagination>
    <!--    delete single performance confirmation-->
    <modal
      id="deleteSingleRaftarModal"
      ref="deleteSingleRaftarModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف رفتار"
      next-text="حذف رفتار"
      :next-focus="true"
      @next="removeSingleRaftar"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleRaftarLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این رفتار را حدف کنید ؟</p>
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
      deleteSingleRaftarLoading: false,
      removeSingleRaftarId: '',
      RaftarLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllRaftarList()
  },
  methods: {
    getAllRaftarList() {
      this.loading = true
      this.$store.dispatch('Raftar/getAllRaftarList', this.filter)
        .then(response => {
          this.RaftarLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentRaftar(currentRaftarId) {
      this.removeSingleRaftarId = currentRaftarId
      this.$refs.deleteSingleRaftarModal.show()
    },
    removeSingleRaftar() {
      this.deleteSingleRaftarLoading = true
      this.$store.dispatch('Raftar/deleteSingleRaftar', this.removeSingleRaftarId)
        .then(response => {
          this.$refs.deleteSingleRaftarModal.close()
          this.deleteSingleRaftarLoading = false
          //update travel list
          this.getAllRaftarList()
        })
        .catch(error => {
          this.deleteSingleRaftarLoading = false
        })
    },
    closeDeleteSingleRaftarConfirmation() {
      //this.$refs.deleteSingleTravelModal.close()
    }
  }
}
</script>

<style scoped>

</style>
