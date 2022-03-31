<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">نظارت بیمه شده</p>
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
            <bime-shode-list ref="table" @editSingleInsuranceList="handlerEditSingleInsurance"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Bime shode modal-->
    <modal
      id="addSingleInsuranceModal"
      ref="addSingleInsuranceModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
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
              <section class="col-md-3">
                <section class="form-group">
                  <label>شماره شهر</label>
                  <input
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.cityId"
                    name="cityId"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>کد مرکز</label>
                  <input
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.membershipCode"
                    name="membershipCode"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('membershipCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام وارد</label>
                  <input
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.parentName"
                    name="parentName"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('parentName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>مبلغ کلی خسارت</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.totalKhesatatMablagh"
                    name="totalKhesatatMablagh"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('totalKhesatatMablagh')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>تعداد خسارت</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.khesaratCount"
                    name="khesaratCount"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('khesaratCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>شماره پرونده  بررسی شده</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.baresiParvandeNumber"
                    name="baresiParvandeNumber"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('baresiParvandeNumber')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>شماره پرونده  مشکل دار</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.moshkelParvandeNumber"
                    name="moshkelParvandeNumber"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('moshkelParvandeNumber')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نتیجه</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.result"
                    name="result"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('result')" class="error mt-8 mr-5 pink">اجباری</label>
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
import BimeShodeList from "./BimeShodeList";

export default {
  name: "Meeting",
  components: {
    BimeShodeList
  },
  data() {
    return {
      addSingleInsuranceLoading: false,
      insuranceSingleInformation: {
        travelId: 0,
        cityId: 0,
        membershipCode: 0,
        parentName: "",
        totalKhesatatMablagh: 0,
        khesaratCount: 0,
        baresiParvandeNumber: "",
        moshkelParvandeNumber: "",
        result: 0
      }
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
          this.$store.dispatch('BimeShode/addSingleBimeShode', this.insuranceSingleInformation)
            .then(response => {
              this.addSingleInsuranceLoading = false
              this.$refs.addSingleMeetingModal.close()
              this.$refs.table.getAllMeetingList()
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
      this.assignSingleMeetingInformationEditing(singleEditInsuranceInformation)
    },
    assignSingleInsuranceInformationEditing(singleRowParam) {
      this.mettingSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        membershipCode: singleRowParam.membershipCode,
        parentName: singleRowParam.parentName,
        totalKhesatatMablagh: singleRowParam.totalKhesatatMablagh,
        khesaratCount: singleRowParam.khesaratCount,
        baresiParvandeNumber: singleRowParam.baresiParvandeNumber,
        moshkelParvandeNumber: singleRowParam.moshkelParvandeNumber,
        result: singleRowParam.result
      }
      this.$refs.addSingleInsuranceModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('BimeShode/updateSingleBimeShode', this.insuranceSingleInformation)
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
