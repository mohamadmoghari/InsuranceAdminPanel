<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">پرداخت سند</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSinglePardakhtSanad"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت پرداخت سند</span>
            </button>
            <pardakht-sanad-list ref="table" @editSinglePardakht="handlerEditSinglePardakhtSanad"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add PardakhtSanad modal-->
    <modal
      id="addSinglePardakhtSanadModal"
      ref="addSinglePardakhtSanadModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن پرداخت جدید"
      :footer="false"
    >
      <loader :loading="addSinglePardakhtSanadLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>استان</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="PardakhtSanadSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>امتیاز کنترل فرایند</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="PardakhtSanadSingleInformation.farayandControlScore"
                    name="farayandControlScore"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('farayandControlScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات کنترل فرایند</label>
                  <input
                    v-model="PardakhtSanadSingleInformation.farayandControlDesc"
                    name="farayandControlDesc"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('farayandControlDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>امتیاز مطلوبیت</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="PardakhtSanadSingleInformation.MatlobiatScore"
                    name="MatlobiatScore"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('MatlobiatScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>توضیحات مطلوبیت</label>
                  <input
                    v-model="PardakhtSanadSingleInformation.MatlobiatDesc"
                    class="form-control form-control-lg">
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>محل عملیات مالی</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="PardakhtSanadSingleInformation.MaliActionMahal"
                    name="MaliActionMahal"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('MaliActionMahal')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>مسول عملیات مالی</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="PardakhtSanadSingleInformation.MaliActionMasol"
                    name="MaliActionMahal"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('MaliActionMasol')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSinglePardakhtSanadAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSinglePardakhtSanadModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import PardakhtSanadList from "./PardakhtSanadList";

export default {
  name: "PardakhtSanad",
  components: {
    PardakhtSanadList
  },
  data() {
    return {
      addSinglePardakhtSanadLoading: false,
      PardakhtSanadSingleInformation: {
        travelId: 0,
        cityId: 0,
        farayandControlScore: 0,
        farayandControlDesc: "",
        matlobiatScore: 0,
        matlobiatDesc: "",
        maliActionMahal: 0,
        maliActionMasol: 0,
      }
    }
  },
  methods: {
    addSinglePardakhtSanad() {
      this.$refs.addSinglePardakhtSanadModal.show()
    },
    addSinglePardakhtSanadAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('PardakhtSanad/addSinglePardakhtSanad', this.PardakhtSanadSingleInformation)
            .then(response => {
              this.addSinglePardakhtSanadLoading = false
              this.$refs.addSinglePardakhtSanadModal.close()
              this.$refs.table.getAllPardakhtSanadList()
            })
            .catch(error => {
              this.addSinglePardakhtSanadLoading = false
            })
        }
      })
    },
    closeSinglePardakhtSanadModal() {
      this.$refs.addSinglePardakhtSanadModal.close()
    },

    //emit from child
    handlerEditSinglePardakhtSanad(singleEditPardakhtSanadInformation) {
      this.assignSinglePardakhtSanadInformationEditing(singleEditPardakhtSanadInformation)
    },
    assignSinglePardakhtSanadInformationEditing(singleRowParam) {
      this.mettingSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        farayandControlScore: singleRowParam.farayandControlScore,
        farayandControlDesc: singleRowParam.farayandControlDesc,
        matlobiatScore: singleRowParam.matlobiatScore,
        matlobiatDesc: singleRowParam.matlobiatDesc,
        maliActionMahal: singleRowParam.maliActionMahal,
        maliActionMasol: singleRowParam.maliActionMasol,
      }
      this.$refs.addSinglePardakhtSanadModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('PardakhtSanad/updateSinglePardakhtSanad', this.PardakhtSanadSingleInformation)
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
