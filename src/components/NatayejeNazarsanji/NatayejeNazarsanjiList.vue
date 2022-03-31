<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">شهر</th>
          <th width="150">نام مرکز</th>
          <th width="150">کد مرکز</th>
          <th width="150">نوع بیماری</th>
          <th width="150">مبلغ</th>
          <th width="150">درصد کیفی</th>
          <th width="150">محل صدور</th>
          <th width="150">مازاد پرداخت</th>
          <th width="150">عامل هدایت</th>
          <th width="150">راهنما</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleNatyje in NatayejLists" :key="singleNatyje.id">
          <td>{{ singleNatyje.id }}</td>
          <td>{{ singleNatyje.travelId }}</td>
          <td>{{ singleNatyje.cityId }}</td>
          <td>{{ singleNatyje.markazName }}</td>
          <td>{{ singleNatyje.membershipCode }}</td>
          <td>{{ singleNatyje.bimaryType }}</td>
          <td>{{ singleNatyje.mablagh }}</td>
          <td>{{ singleNatyje.keyfiDarsad }}</td>
          <td>{{ singleNatyje.mahalSodor }}</td>
          <td>{{ singleNatyje.mazadPardakh }}</td>
          <td>{{ singleNatyje.amelHedayat }}</td>
          <td>{{ singleNatyje.rahnama }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleNtayej',singleNatyje)"></i>
            <i @click="confirmationDeleteCurrentNazar(singleNatyje.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="NatayejLists.length == 0">
          <td colspan="13" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllNatayejList"></pagination>
    <!--        delete single performance confirmation-->
    <modal
      id="deleteSingleNazarModal"
      ref="deleteSingleNazarModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف جلسه"
      next-text="حذف جلسه"
      :next-focus="true"
      @next="removeSingleNazar"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleNazarLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این جلسه را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "NazarList",
  data() {
    return {
      loading: false,
      deleteSingleNazarLoading: false,
      removeSingleNazarId: '',
      NatayejLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllNatayejList()
  },
  methods: {
    getAllNatayejList() {
      this.loading = true
      this.$store.dispatch('NarayejNazarsanji/getAllKhesaratVarizList', this.filter)
        .then(response => {
          this.NatayejLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentNazar(currentNazarId) {
      this.removeSingleNazarId = currentNazarId
      this.$refs.deleteSingleNazarModal.show()
    },
    removeSingleNazar() {
      this.deleteSingleNazarLoading = true
      this.$store.dispatch('NarayejNazarsanji/deleteSingleKhesaratVariz', this.removeSingleNazarId)
        .then(response => {
          this.$refs.deleteSingleNazarModal.close()
          this.deleteSingleNazarLoading = false
          //update travel list
          this.getAllNatayejList()
        })
        .catch(error => {
          this.deleteSingleNazarLoading = false
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
