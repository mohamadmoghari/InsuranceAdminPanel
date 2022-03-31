<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">بیمه عمر</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleInsurance"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت بیمه عمر</span>
            </button>
            <car-list
              ref="table" @editSingleInsurance="handlerEditSingleInsurance"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add performance modal-->
    <modal
      id="addSingleInsuranceModal"
      ref="addSingleInsuranceModal"
      size="600px"
      icon="fas fa-cog mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن بیمه جدید"
      :footer="false"
    >
      <loader :loading="addSingleInsuranceLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ شروع</label>
                  <date-picker
                    v-validate="'required'"
                    name="sDate"
                    v-model="insuranceSingleInformation.sDate"
                  />
                  <label v-show="vErrors.has('sDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ پایان</label>
                  <date-picker
                    v-validate="'required'"
                    name="eDate"
                    v-model="insuranceSingleInformation.eDate"
                  />
                  <label v-show="vErrors.has('eDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>q1</label>
                  <input
                    v-validate="'required'"
                    name="q1"
                    type="number"
                    v-model="insuranceSingleInformation.q1"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q1')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>q2</label>
                  <input
                    v-validate="'required'"
                    name="q2"
                    type="number"
                    v-model="insuranceSingleInformation.q2"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q2')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>q3</label>
                  <input
                    v-validate="'required'"
                    name="q3"
                    type="number"
                    v-model="insuranceSingleInformation.q3"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q3')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>q4</label>
                  <input
                    v-validate="'required'"
                    name="q4"
                    v-model="insuranceSingleInformation.q4"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q4')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>q5</label>
                  <input
                    v-validate="'required'"
                    name="q5"
                    type="number"
                    v-model="insuranceSingleInformation.q5"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q5')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>q6</label>
                  <input
                    v-validate="'required'"
                    name="q6"
                    type="number"
                    v-model="insuranceSingleInformation.q6"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q6')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>q7</label>
                  <input
                    v-validate="'required'"
                    name="q7"
                    type="number"
                    v-model="insuranceSingleInformation.q7"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q7')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>q8</label>
                  <input
                    v-validate="'required'"
                    name="q8"
                    type="number"
                    v-model="insuranceSingleInformation.q8"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('q8')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-12">
                <section class="form-group">
                  <label>توضیحات</label>
                  <textarea v-model="insuranceSingleInformation.description"
                            class="form-control form-control-lg no-resize"></textarea>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleInsuranceAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleInsuranceModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import CarList from "./LifeiList";

export default {
  name: "Car",
  components: {
    CarList
  },
  data() {
    return {
      addSingleInsuranceLoading: false,
      insuranceSingleInformation: {
        travelId: 0,
        cityId: 0,
        sDate: '',
        eDate: '',
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        q6: 0,
        q7: 0,
        q8: 0,
        description: ''
      },
    }
  },
  methods: {
    addSingleInsurance() {
      this.$refs.addSingleInsuranceModal.show()
    },
    addSingleInsuranceAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleInsuranceLoading = true
          this.$store.dispatch('LifeInsurance/addSingleCarInsurance', this.insuranceSingleInformation)
            .then(response => {
              this.addSingleInsuranceLoading = false
              this.$refs.addSingleInsuranceModal.close()
              this.$refs.table.getAllInsuranceList()
            })
            .catch(error => {
              this.addSingleInsuranceLoading = false
            })
        }
      })
    },
    closeSingleInsuranceModal() {
      this.$refs.addSingleInsuranceModal.close()
    },

    //emit from child
    handlerEditSingleInsurance(singleEditInsuranceInformation) {
      this.assignSingleInsuranceInformationEditing(singleEditInsuranceInformation)
    },
    assignSingleInsuranceInformationEditing(singleRowParam) {
      this.insuranceSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        sDate: singleRowParam.sDate,
        eDate: singleRowParam.eDate,
        q1: singleRowParam.q1,
        q2: singleRowParam.q2,
        q3: singleRowParam.q3,
        q4: singleRowParam.q4,
        q5: singleRowParam.q5,
        q6: singleRowParam.q6,
        q7: singleRowParam.q7,
        q8: singleRowParam.q8,
        description: singleRowParam.description
      }
      this.$refs.addSingleInsuranceModal.show()
    },
    updateSinglePerformance() {
      this.$store.dispatch('LifeInsurance/updateSingleCarInsurance', this.insuranceSingleInformation)
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
