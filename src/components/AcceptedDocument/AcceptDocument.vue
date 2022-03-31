<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">پذیرش اسناد</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleAcceptDocument"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت اسناد</span>
            </button>
            <accept-document-list ref="table" @editSingleDocument="handlerEditSingleArchive"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add travel modal-->
    <modal
      id="addSingleDocumentModal"
      ref="addSingleDocumentModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="ثبت پدیرش"
      :footer="false"
    >
      <loader :loading="addSingleDocumentLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز</label>
                  <input
                    name="score"
                    v-validate="'required'"
                    v-model="archiveSingleInformation.score" class="form-control form-control-lg">
                  <label v-show="vErrors.has('score')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="archiveSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-12">
                <section class="form-group">
                  <label>توضیحات</label>
                  <textarea v-model="archiveSingleInformation.descrition"
                            class="form-control form-control-lg no-resize"></textarea>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleDocumentAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleDocumentModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import AcceptDocumentList from './AcceptDocumentList'

export default {
  name: "AcceptedDocument",
  components: {
    AcceptDocumentList
  },
  data() {
    return {
      addSingleDocumentLoading: false,
      acceptDocumentSingleInformation: {
        travelId: 0,
        cityId: 0,
        nazmDaryaftScore: 0,
        nazmDaryaftDesc: "",
        residEraeeScore: 0,
        residEraeeDesc: "",
        pazireshSanadScore: 0,
        pazireshSanadDesc: "",
        kharejTahodCount: 0,
        naghsCount: 0,
        saghfCount: 0,
        sabtNashode: 0,
        pardakhtShodaniCount: 0,
        sayerCount: 0,
        sCore: 0,
        desc: "",
        moratabSaziScore: 0,
        moratabSaziDesc: "",
        travelBefore: 0,
        taklifAsnadScore: 0,
        taklifAsnadDesc: "",
      }
    }
  },
  methods: {
    addSingleAcceptDocument() {
      this.$refs.addSingleDocument.show()
    },
    addSingleDocumentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleDocumentLoading = true
          this.$store.dispatch('AcceptedDocument/addSingleAcceptedDocument', this.acceptDocumentSingleInformation)
            .then(response => {
              this.addSingleDocumentLoading = false
              this.$refs.addSingleDocumentModal.close()
              this.$refs.table.getAllArchiveList()
            })
            .catch(error => {
              this.addSingleDocumentLoading = false
            })
        }
      })
    },
    closeSingleDocumentModal() {
      this.$refs.addSingleDocumentModal.close()
    },

    //emit from child
    handlerEditSingleArchive(singleEditTravelInformation) {
      this.assignSingleArchiveInformationEditing(singleEditTravelInformation)
    },
    assignSingleArchiveInformationEditing(singleRowParam) {
      this.acceptDocumentSingleInformation = {
        cityId:singleRowParam.cityId,
        nazmDaryaftScore:singleRowParam.nazmDaryaftScore,
        nazmDaryaftDesc: singleRowParam.nazmDaryaftDesc,
        residEraeeScore:singleRowParam.residEraeeScore,
        residEraeeDesc: singleRowParam.residEraeeDesc,
        pazireshSanadScore:singleRowParam.pazireshSanadScore,
        pazireshSanadDesc: singleRowParam.pazireshSanadDesc,
        kharejTahodCount:singleRowParam.kharejTahodCount,
        naghsCount:singleRowParam.naghsCount,
        saghfCount:singleRowParam.saghfCount,
        sabtNashode:singleRowParam.sabtNashode,
        pardakhtShodaniCount:singleRowParam.pardakhtShodaniCount,
        sayerCount:singleRowParam.sayerCount,
        sCore:singleRowParam.sCore,
        desc: singleRowParam.desc,
        moratabSaziScore:singleRowParam.moratabSaziScore,
        moratabSaziDesc: singleRowParam.moratabSaziDesc,
        travelBefore:singleRowParam.travelBefore,
        taklifAsnadScore:singleRowParam.taklifAsnadScore,
        taklifAsnadDesc: singleRowParam.taklifAsnadDesc,
      }
      this.$refs.addSingleDocumentModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('Archive/updateSingleArchive', this.acceptDocumentSingleInformation)
        .then(response => {

        })
        .catch(error => {

        })
    }
  }
}
</script>

<style scoped>

</style>
