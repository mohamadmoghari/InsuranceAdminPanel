<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">گزارش بیمه شده</p>
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
              <span>ثبت بیمه</span>
            </button>
            <report-insurance-list
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
      title="افزودن گزارش جدید"
      :footer="false"
    >
      <loader :loading="addSingleInsuranceLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>کد مرکز</label>
                  <input
                    v-validate="'required'"
                    name="membershipCode"
                    type="number"
                    v-model="insuranceSingleInformation.membershipCode"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('membershipCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام والد</label>
                  <input
                    v-validate="'required'"
                    name="parentName"
                    type="number"
                    v-model="insuranceSingleInformation.parentName"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('parentName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>علت</label>
                  <textarea
                    v-validate="'required'"
                    name="ellat"
                    v-model="insuranceSingleInformation.ellat"
                    class="form-control form-control-lg">
                  </textarea>
                  <label v-show="vErrors.has('ellat')" class="error mt-8 mr-5 pink">اجباری</label>
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
import ReportInsuranceList from "./ReportInsuranceList";

export default {
  name: "Car",
  components: {
    ReportInsuranceList
  },
  data() {
    return {
      addSingleInsuranceLoading: false,
      insuranceSingleInformation: {
        travelId: 0,
        cityId: 0,
        membershipCode: 0,
        parentName: "",
        ellat: ""
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
          this.$store.dispatch('ReportInsurance/addSingleCarReportInsurance', this.insuranceSingleInformation)
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
        membershipCode: singleRowParam.membershipCode,
        parentName: singleRowParam.parentName,
        ellat: singleRowParam.ellat
      }
      this.$refs.addSingleInsuranceModal.show()
    },
    updateSinglePerformance() {
      this.$store.dispatch('ReportInsurance/updateSingleCarReportInsurance', this.insuranceSingleInformation)
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
