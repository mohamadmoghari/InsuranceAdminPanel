<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">عملکرد فنی</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSinglePerformance"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت عملکرد فنی</span>
            </button>
            <amalkard-fani-list
              ref="table" @editSinglePerformance="handlerEditSinglePerformance"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add performance modal-->
    <modal
      id="addSinglePerformanceModal"
      ref="addSinglePerformanceModal"
      size="600px"
      icon="fas fa-cog mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن عملکرد جدید"
      :footer="false"
    >
      <loader :loading="addSinglePerformanceLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="performanceSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>

              <section class="col-md-4">
                <section class="form-group">
                  <label>کد شخصی</label>
                  <input
                    v-validate="'required'"
                    name="personelCode"
                    v-model="performanceSingleInformation.personelCode"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('personelCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>

            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>درصد پذیرش</label>
                  <input
                    v-validate="'required'"
                    name="pazireshDarsad"
                    v-model="performanceSingleInformation.pazireshDarsad"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('pazireshDarsad')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>درصد کارشناسی</label>
                  <input
                    v-validate="'required'"
                    name="karshenasiDarsad"
                    v-model="performanceSingleInformation.karshenasiDarsad"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('karshenasiDarsad')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>ثبت درصد</label>
                  <input
                    v-validate="'required'"
                    name="sabtDarsad"
                    v-model="performanceSingleInformation.sabtDarsad"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('sabtDarsad')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>

            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>بایگانی</label>
                  <input
                    v-validate="'required'"
                    name="baygani"
                    v-model="performanceSingleInformation.baygani"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('baygani')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>پرداخت</label>
                  <input
                    v-validate="'required'"
                    name="pardakht" v-model="performanceSingleInformation.pardakht"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('pardakht')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-12">
                <section class="form-group">
                  <label>توضیحات</label>
                  <textarea v-model="performanceSingleInformation.descrition"
                            class="form-control form-control-lg no-resize"></textarea>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSinglePerformanceAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSinglePerformanceModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import AmalkardFaniList from "./AmalkardFaniList";

export default {
  name: "DocumentRegistration",
  components: {
    AmalkardFaniList
  },
  data() {
    return {
      addSinglePerformanceLoading: false,
      performanceSingleInformation: {
        cityId: 0,
        personelCode: 0,
        pazireshDarsad: 0,
        karshenasiDarsad: 0,
        sabtDarsad: 0,
        baygani: "",
        pardakht: 0,
        description: ""
      }
    }
  },
  methods: {
    addSinglePerformance() {
      this.$refs.addSinglePerformanceModal.show()
    },
    addSinglePerformanceAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSinglePerformanceLoading = true
          this.$store.dispatch('Travel/addSingleTravel', this.performanceSingleInformation)
            .then(response => {
              this.addSinglePerformanceLoading = false
              this.$refs.addSinglePerformanceModal.close()
              this.$refs.table.getAllPerformanceList()
            })
            .catch(error => {
              this.addSinglePerformanceLoading = false
            })
        }
      })
    },
    closeSinglePerformanceModal() {
      this.$refs.addSinglePerformanceModal.close()
    },

    //emit from child
    handlerEditSinglePerformance(singleEditPerformanceInformation) {
      this.assignSinglePerformanceInformationEditing(singleEditPerformanceInformation)
    },
    assignSinglePerformanceInformationEditing(singleRowParam) {
      this.performanceSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        personelCode: singleRowParam.personelCode,
        pazireshDarsad: singleRowParam.pazireshDarsad,
        karshenasiDarsad: singleRowParam.karshenasiDarsad,
        sabtDarsad: singleRowParam.sabtDarsad,
        baygani: singleRowParam.baygani,
        pardakht: singleRowParam.pardakht,
        description: singleRowParam.description
      }
      this.$refs.addSinglePerformanceModal.show()
    },
    updateSinglePerformance() {
      this.$store.dispatch('TechnicalPerformance/updateSingleTechnicalPerformance', this.performanceSingleInformation)
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
