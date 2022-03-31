<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">سفر</th>
          <th width="190">شهر</th>
          <th width="150">امتیاز تعرفه</th>
          <th width="150">توضیحات تعرفه</th>
          <th width="150">امتیاز کسر فرانشیز</th>
          <th width="150">توضیحات کسر فرانشیز</th>
          <th width="150">امتیاز کارشناسی دارو</th>
          <th width="150">توضیحات کارشاسی دارو</th>
          <th width="150">امتیاز یارانه سلامت</th>
          <th width="150">توضیحات یارانه سلامت</th>
          <th width="150">امتیاز خیریه</th>
          <th width="150">توضیحات خیریه</th>
          <th width="150">محل بیمارستان خصوصی</th>
          <th width="150">محل بیمارستان دولتی</th>
          <th width="150">محل دندان پزشک</th>
          <th width="150">محل دریافت عینک</th>
          <th width="150">محل دریافت داروی خاص</th>
          <th width="150">محل دریافت داروی عمومی</th>
          <th width="150">ای دی محل تصویر برداری</th>
          <th width="150">محل آزمایشگاه</th>
          <th width="150">محل جراحی</th>
          <th width="150">توضیحات محل</th>
          <th width="150">کارشناسی بیمارستان خصوصی</th>
          <th width="150">کارشناسی بیمارستان دولتی</th>
          <th width="150">کارشناسی دندان پزشکی</th>
          <th width="150">کارشناسی عینک</th>
          <th width="150">کارشناسی دارو خاص</th>
          <th width="150">کارشناسی دارو عمومی</th>
          <th width="150">کارشناسی تصویر برداری</th>
          <th width="150">کارشناسی محل آزمایشگاه</th>
          <th width="150">کارشناسی جراحی</th>
          <th width="150">توضیحات کارشناسی</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleKarshnasi in karshnasiLists" :key="singleKarshnasi.id">
          <td>{{ singleKarshnasi.id }}</td>
          <td>{{ singleKarshnasi.travelId }}</td>
          <td>{{ singleKarshnasi.cityId }}</td>
          <td>{{ singleKarshnasi.tarefeScore }}</td>
          <td>{{ singleKarshnasi.tarefeDesc }}</td>
          <td>{{ singleKarshnasi.kasrFeranshizScore }}</td>
          <td>{{ singleKarshnasi.kasrFeranshizDesc }}</td>
          <td>{{ singleKarshnasi.karshenasiDaroScore }}</td>
          <td>{{ singleKarshnasi.karshenasiDaroDesc }}</td>
          <td>{{ singleKarshnasi.yaraneSalamatScore }}</td>
          <td>{{ singleKarshnasi.yaraneSalamatDesc }}</td>
          <td>{{ singleKarshnasi.kheyrieScore }}</td>
          <td>{{ singleKarshnasi.kheyrieDesc }}</td>
          <td>{{ singleKarshnasi.mahalBimsarestanKhososi }}</td>
          <td>{{ singleKarshnasi.mahalBimarestaDolati }}</td>
          <td>{{ singleKarshnasi.mahalDandanPezeshk }}</td>
          <td>{{ singleKarshnasi.mahalEynak }}</td>
          <td>{{ singleKarshnasi.mahalDaroKhas }}</td>
          <td>{{ singleKarshnasi.mahalDaroOmomi }}</td>
          <td>{{ singleKarshnasi.mahalTasvirType }}</td>
          <td>{{ singleKarshnasi.mahalAzmayeshgah }}</td>
          <td>{{ singleKarshnasi.mahalJarahi }}</td>
          <td>{{ singleKarshnasi.mahalDesc }}</td>
          <td>{{ singleKarshnasi.karshenasBimarestanKhososi }}</td>
          <td>{{ singleKarshnasi.karshenasBimarestanDolati }}</td>
          <td>{{ singleKarshnasi.karshenadDandanPezeshk }}</td>
          <td>{{ singleKarshnasi.karshenadEyak }}</td>
          <td>{{ singleKarshnasi.karshenadDariKhas }}</td>
          <td>{{ singleKarshnasi.karshenasDaroOmomi }}</td>
          <td>{{ singleKarshnasi.karshenasTasvirType }}</td>
          <td>{{ singleKarshnasi.karshenasMahalAzmayesh }}</td>
          <td>{{ singleKarshnasi.karshenasJarahi }}</td>
          <td>{{ singleKarshnasi.karshenasDesc }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSingleKarshnasi',singleKarshnasi)"></i>
            <i @click="confirmationDeleteCurrentKarshnasi(singleKarshnasi.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="karshnasiLists.length == 0">
          <td colspan="6" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllKarshnasiList"></pagination>
    <!--    delete single document confirmation-->
    <modal
      id="deleteSingleKarshnasiModal"
      ref="deleteSingleKarshnasiModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف سند"
      next-text="حذف سند"
      :next-focus="true"
      @next="removeSingleKarshnasi"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleKarshnasiLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این سند را حدف کنید ؟</p>
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
      deleteSingleKarshnasiLoading: false,
      removeSingleKarshnasiId: '',
      karshnasiLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllKarshnasiList()
  },
  methods: {
    getAllKarshnasiList() {
      this.loading = true
      this.$store.dispatch('Karshenasi/getAllKarshnasiList', this.filter)
        .then(response => {
          this.karshnasiLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentKarshnasi(currentKarshnasiId) {
      this.removeSingleKarshnasiId = currentKarshnasiId
      this.$refs.deleteSingleKarshnasiModal.show()
    },
    removeSingleKarshnasi() {
      this.deleteSingleKarshnasiLoading = true
      this.$store.dispatch('Karshenasi/deleteSingleKarshnasi', this.removeSingleKarshnasiId)
        .then(response => {
          this.deleteSingleKarshnasiLoading = false
          //update travel list
          this.getAllKarshnasiList()
        })
        .catch(error => {
          this.deleteSingleKarshnasiLoading = false
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
