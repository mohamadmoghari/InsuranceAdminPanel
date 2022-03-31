<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">ثبت اسناد</p>
    <section class="box">
      <section class="body">

        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addDocument"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت سند</span>
            </button>
            <document-registration-list
              @editing="handlerEditingSingleDocument"
            />
          </section>
        </section>
      </section>
    </section>

    <!--    add and edit single document modal-->
    <modal
      id="addSingleDocumentModal"
      ref="addSingleDocumentModal"
      size="800px"
      icon="fas fa-folder-plus mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      :title="registerSingleDocument.id === 0 ? 'افزودن سند جدید': 'ویرایش سند'"
      :footer="false"
    >
      <loader :loading="addSingleDocumentLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>استان</label>
                  <Province
                    v-model="registerSingleDocument.cityId"
                    v-validate="'required'"
                    name="cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>ثبت اولیه اسناد تا 48 ساعت بعد از پذیرش</label>
                  <input
                    v-validate="'required'"
                    name="sabt48hourScore"
                    v-model="registerSingleDocument.sabt48hourScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabt48hourScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات ثبت اولیه تا 48 ساعات بعد از پذیرش</label>
                  <input
                    v-validate="'required'"
                    name="sabt48hourDesc"
                    v-model="registerSingleDocument.sabt48hourDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabt48hourDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>امتیاز تعداد سند ثبت شده در هر پرونده</label>
                  <input
                    v-validate="'required'"
                    name="sanadSabtCountScore"
                    v-model="registerSingleDocument.sanadSabtCountScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sanadSabtCountScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات تعداد سند ثبت شده در هر پرونده</label>
                  <input
                    v-validate="'required'"
                    name="sanadSabtCountDesc"
                    v-model="registerSingleDocument.sanadSabtCountDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sanadSabtCountScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>امتیاز ثبت صحیح و بدون اشتباه - جا افتادگی</label>
                  <input
                    name="sabtSahihJaScore"
                    v-validate="'required'"
                    v-model="registerSingleDocument.sabtSahihJaScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabtSahihJaScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات ثبت صحیح و بدون اشتباه - جا افتادگی</label>
                  <input
                    name="sabteSahihJaDesc"
                    v-validate="'required'"
                    v-model="registerSingleDocument.sabteSahihJaDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabteSahihJaDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>امتیاز ثبت صحیح ثبت نام</label>
                  <input
                    name="sabtSahihNameScore"
                    v-validate="'required'"
                    v-model="registerSingleDocument.sabtSahihNameScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabtSahihNameScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات ثبت صحیح ثبت نام</label>
                  <input
                    name="sabteSahihNameDesc"
                    v-validate="'required'"
                    v-model="registerSingleDocument.sabteSahihNameDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabteSahihNameDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>امتیاز ثبت مبلغ بدون اشتباه</label>
                  <input
                    name="sabteSahihMablaghScore"
                    v-validate="'required'"
                    v-model="registerSingleDocument.sabteSahihMablaghScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabteSahihMablaghScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات ثبت مبلغ بدون اشتباه</label>
                  <input
                    name="sabteSahihMablaghDesc"
                    v-validate="'required'"
                    v-model="registerSingleDocument.sabteSahihMablaghDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabteSahihMablaghDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="registerCurrentDocumentAction">ثبت</button>
            <button class="btn btn-danger" @click="closeDocumentRegister">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>

<script>
import DocumentRegistrationList from "./DocumentRegistrationList";

export default {
  name: "DocumentRegistration",
  components: {
    DocumentRegistrationList
  },
  data() {
    return {
      addSingleDocumentFlag: false,
      addSingleDocumentLoading: false,
      registerSingleDocument: {
        cityId: 0,
        sabt48hourScore: 0,
        sabt48hourDesc: "",
        sanadSabtCountScore: 0,
        sanadSabtCountDesc: "",
        sabtSahihJaScore: 0,
        sabteSahihJaDesc: "",
        sabtSahihNameScore: 0,
        sabteSahihNameDesc: "",
        sabteSahihMablaghScore: 0,
        sabteSahihMablaghDesc: "",
      }
    }
  },
  methods: {
    addDocument() {
      this.$refs.addSingleDocumentModal.show()
    },
    registerCurrentDocumentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleDocumentLoading = true
          this.$store.dispatch('DocumentRegister/addSingleDocument', this.registerSingleDocument)
            .then(response => {
              this.addSingleDocumentLoading = false
              this.clearSingleDocumentInformation()
            })
            .catch(error => {
              this.addSingleDocumentLoading = false
            })
        }
      })
    },
    editCurrentDocumentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleDocumentLoading = true
          this.$store.dispatch('DocumentRegister/updateSingleDocument', this.registerSingleDocument)
            .then(response => {
              this.addSingleDocumentLoading = false
              this.clearSingleDocumentInformation()
            })
            .catch(error => {
              this.addSingleDocumentLoading = false
            })
        }
      })
    },
    closeDocumentRegister() {
      this.$refs.addSingleDocumentModal.close()
    },


    //editing single document
    handlerEditingSingleDocument(currentDocumentInfo) {
      this.assignParameterToListSingleDocument(currentDocumentInfo)
    },
    assignParameterToListSingleDocument(parameter) {
      let flagEditingParams = parameter
      this.registerSingleDocument = {
        cityId: flagEditingParams.cityId,
        sabt48hourScore: flagEditingParams.sabt48hourScore,
        sabt48hourDesc: flagEditingParams.sabt48hourDesc,
        sanadSabtCountScore: flagEditingParams.sanadSabtCountScore,
        sanadSabtCountDesc: flagEditingParams.sanadSabtCountDesc,
        sabtSahihJaScore: flagEditingParams.sabtSahihJaScore,
        sabteSahihJaDesc: flagEditingParams.sabteSahihJaDesc,
        sabtSahihNameScore: flagEditingParams.sabtSahihNameScore,
        sabteSahihNameDesc: flagEditingParams.sabteSahihNameDesc,
        sabteSahihMablaghScore: flagEditingParams.sabteSahihMablaghScore,
        sabteSahihMablaghDesc: flagEditingParams.sabteSahihMablaghDesc,
        type: flagEditingParams.type
      }
      this.$refs.addSingleDocumentModal.show()
    },
    clearSingleDocumentInformation() {
      this.registerSingleDocument = {
        id: "",
        cityId: "",
        sabt48hourScore: "",
        sabt48hourDesc: "",
        sanadSabtCountScore: "",
        sanadSabtCountDesc: "",
        sabtSahihJaScore: "",
        sabteSahihJaDesc: "",
        sabtSahihNameScore: "",
        sabteSahihNameDesc: "",
        sabteSahihMablaghScore: "",
        sabteSahihMablaghDesc: "",
        type: ""
      }
    }
  }
}
</script>

<style scoped>

</style>
