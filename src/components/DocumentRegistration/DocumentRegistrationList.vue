<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th>کدسفر</th>
          <th>استان</th>
          <th>ثبت اولیه اسناد تا 48 ساعت بعد از پذیرش</th>
          <th>توضیحات ثبت اولیه تا 48 ساعات بعد از پذیش</th>
          <th>امتیاز ثبت صحیح ثبت نام</th>
          <th>توضیحات ثبت مبلغ بدون اشتباه</th>
          <th>توضیحات ثبت صحیح و بدون اشتباه - جا افتادگی</th>
          <th>امتیاز ثبت مبلغ بدون اشتباه</th>
          <th>توضیحات ثبت صحیح ثبت نام</th>
          <th>توضیحات تعداد سند ثبت شده در هر پرونده</th>
          <th>امتیاز تعداد سند ثبت شده در هر پرونده</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleDoc in documentRegisterRow" :key="singleDoc.id">
          <td>{{ singleDoc.id }}</td>
          <td>{{ singleDoc.cityId }}</td>
          <td>{{ singleDoc.sabt48hourDesc }}</td>
          <td>{{ singleDoc.sabt48hourScore }}</td>
          <td>{{ singleDoc.sabtSahihJaScore }}</td>
          <td>{{ singleDoc.sabtSahihNameScore }}</td>
          <td>{{ singleDoc.sabteSahihJaDesc }}</td>
          <td>{{ singleDoc.sabteSahihMablaghDesc }}</td>
          <td>{{ singleDoc.sabteSahihMablaghScore }}</td>
          <td>{{ singleDoc.sabteSahihNameDesc }}</td>
          <td>{{ singleDoc.sanadSabtCountDesc }}</td>
          <td>{{ singleDoc.sanadSabtCountScore }}</td>
          <td class="d-flex justify-content-around">
            <i
              @click="$emit('editing',singleDoc)"
              class="far fa-edit i-btn font-15 pointer"></i>
            <i @click="confirmationUserDeleteSingleDocument(singleDoc.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="documentRegisterRow.length === 0">
          <td colspan="14" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
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
      id="deleteModal"
      ref="deleteModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف سند"
      next-text="حذف"
      :next-focus="true"
      @next="removeSingleDocument"
      @close="closeConfirmDeleteSingleDocument"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید این سند را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "DocumentRegistrationList",
  data() {
    return {
      loading: false,
      deleteLoading: false,
      deleteSingleDocumentId: undefined,
      documentRegisterRow: [],
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
      this.$store.dispatch('DocumentRegister/getAllDocumentRegisterList', this.filter)
        .then(response => {
          this.loading = false
          this.documentRegisterRow = response.data.list
          this.totalRows = response.data.totalRows
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationUserDeleteSingleDocument(currentDocId) {
      this.deleteSingleDocumentId = currentDocId
      this.$refs.deleteModal.show()
    },
    removeSingleDocument() {
      this.deleteLoading = true
      this.$store.dispatch('DocumentRegister/deleteSingleDocument', this.deleteSingleDocumentId)
        .then(response => {
          this.deleteLoading = false
          this.$refs.deleteModal.close()
          this.getAllDocumentList()
        })
        .catch(error => {
            this.deleteLoading = false
          })
    },
    closeConfirmDeleteSingleDocument() {
      this.$refs.deleteModal.close()
    }
  }
}
</script>

<style scoped>

</style>
