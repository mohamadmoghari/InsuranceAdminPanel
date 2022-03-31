<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">نام</th>
          <th width="190">استان</th>
          <th width="150">تاریخ سفر</th>
          <th width="150">تاریخ شروع</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleTravel in travelLists" :key="singleTravel.id">
          <td>{{ singleTravel.id }}</td>
          <td>{{ singleTravel.name === null ? '--' : singleTravel.travelName }}</td>
          <td>{{ singleTravel.pName }}</td>
          <td>{{ singleTravel.startDate }}</td>
          <td>{{ singleTravel.travelDate }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleTravel',singleTravel)"></i>
            <i @click="confirmationDeleteCurrentTravel(singleTravel.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="travelLists.length === 0">
          <td colspan="8" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllTravelList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleTravelModal"
      ref="deleteSingleTravelModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف سفر"
      next-text="حذف"
      :next-focus="true"
      @next="removeSingleTravel"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleTravelLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این سفر را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "TravelList",
  data() {
    return {
      loading: false,
      deleteSingleTravelLoading: false,
      removeSingleTravelId: '',
      travelLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllTravelList()
  },
  methods: {
    getAllTravelList() {
      this.loading = true
      this.$store.dispatch('Travel/getAllTravelList', this.filter)
        .then(response => {
          this.travelLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentTravel(currentTravelId) {
      this.removeSingleTravelId = currentTravelId
      this.$refs.deleteSingleTravelModal.show()
    },
    removeSingleTravel() {
      this.deleteSingleTravelLoading = true
      this.$store.dispatch('Travel/deleteSingleTravel', this.removeSingleTravelId)
        .then(response => {
          this.deleteSingleTravelLoading = false
          this.$refs.deleteSingleTravelModal.close()
          //update travel list
          this.getAllTravelList()
        })
        .catch(error => {
          this.deleteSingleTravelLoading = false
        })
    },

  }
}
</script>

<style scoped>

</style>
