<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفز</th>
          <th width="190">شهر</th>
          <th width="150">نام مرکز</th>
          <th width="150">نوع مرکز</th>
          <th width="150">وضعیت معرفی نامه</th>
          <th width="150">انطباق اجرا</th>
          <th width="150">نوع مرکز</th>
          <th width="150">توضیحات</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleMoraje in MorajeLists" :key="singleMoraje.id">
          <td>{{ singleMoraje.id }}</td>
          <td>{{ singleMoraje.travelId }}</td>
          <td>{{ singleMoraje.cityId }}</td>
          <td>{{ singleMoraje.markazName }}</td>
          <td>{{ singleMoraje.markazType }}</td>
          <td>{{ singleMoraje.moarefiStatus }}</td>
          <td>{{ singleMoraje.isExec }}</td>
          <td>{{ singleMoraje.type1 }}</td>
          <td>{{ singleMoraje.desc }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleMoraje',singleMoraje)"></i>
            <i @click="confirmationDeleteCurrentMoraje(singleMoraje.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="MorajeLists.length == 0">
          <td colspan="10" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllMorajeList"></pagination>
    <!--        delete single performance confirmation-->
    <modal
      id="deleteSingleMorajeModal"
      ref="deleteSingleMorajeModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف مراجعه"
      next-text="حذف جلسه"
      :next-focus="true"
      @next="removeSingleMoraje"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleMorajeLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این جلسه را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "MorajeList",
  data() {
    return {
      loading: false,
      deleteSingleMorajeLoading: false,
      removeSingleMorajeId: '',
      MorajeLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllMorajeList()
  },
  methods: {
    getAllMorajeList() {
      this.loading = true
      this.$store.dispatch('Moraje/getAllMorajeList', this.filter)
        .then(response => {
          this.MorajeLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentMoraje(currentMorajeId) {
      this.removeSingleMorajeId = currentMorajeId
      this.$refs.deleteSingleMorajeModal.show()
    },
    removeSingleMoraje() {
      this.deleteSingleMorajeLoading = true
      this.$store.dispatch('Moraje/deleteSingleMoraje', this.removeSingleMorajeId)
        .then(response => {
          this.$refs.deleteSingleMorajeModal.close()
          this.deleteSingleMorajeLoading = false
          //update travel list
          this.getAllMorajeList()
        })
        .catch(error => {
          this.deleteSingleMorajeLoading = false
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
