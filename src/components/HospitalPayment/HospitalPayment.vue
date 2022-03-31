<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">پرداخت های بیمارستانی</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleHospitalPayment"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت پرونده بیمارستانی</span>
            </button>
            <hospital-payment-list
              @editSingleHospitalPayment="handlerEditSingleHospitalPayment"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add single Hospital payment modal-->
    <modal
      id="addSingleHospitalPaymentModal"
      ref="addSingleHospitalPaymentModal"
      size="600px"
      icon="fas fa-procedures mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن پرونده جدید"
      :footer="false"
    >
      <loader :loading="addSingleHospitalPaymentLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
<!--              <section class="col-md-3">-->
<!--                <section class="form-group">-->
<!--                  <label>سفر</label>-->
<!--                  <travel-->
<!--                    name="travelId"-->
<!--                    v-model="hospitalPaymentSingleInformation.travelId"/>-->
<!--                </section>-->
<!--              </section>-->
              <section class="col-md-3">
                <section class="form-group">
                  <label>cityId</label>
                  <province
                    v-validate="'required'"
                    name="cityId"
                    v-model="hospitalPaymentSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>شماره پرونده</label>
                  <input
                    v-validate="'required'"
                    name="parvandeNumber"
                    v-model="hospitalPaymentSingleInformation.parvandeNumber" type="number"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('parvandeNumber')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ تحویل</label>
                  <date-picker
                    v-validate="'required'"
                    name="tahvilDate"
                    v-model="hospitalPaymentSingleInformation.tahvilDate"/>
                  <label v-show="vErrors.has('tahvilDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ تشکیل</label>
                  <date-picker
                    v-validate="'required'"
                    name="tashkilDate"
                    v-model="hospitalPaymentSingleInformation.tashkilDate"/>
                  <label v-show="vErrors.has('tashkilDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ کارشناسی</label>
                  <date-picker
                    v-validate="'required'"
                    name="karshenasiDate"
                    v-model="hospitalPaymentSingleInformation.karshenasiDate"/>
                  <label v-show="vErrors.has('karshenasiDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ تسویه</label>
                  <date-picker
                    v-validate="'required'"
                    name="tasvieDate"
                    v-model="hospitalPaymentSingleInformation.tasvieDate"/>
                  <label v-show="vErrors.has('tasvieDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleHospitalPaymentAction">ثبت</button>
            <button class="btn btn-danger" @click="closeHospitalPaymentAdd">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>

<script>
import HospitalPaymentList from "./HospitalPaymentList";

export default {
  name: "HospitalPayment",
  components: {
    HospitalPaymentList
  },
  data() {
    return {
      addSingleHospitalPaymentLoading: false,
      hospitalPaymentSingleInformation: {
        travelId: 0,
        cityId: 0,
        parvandeNumber: 0,
        tahvilDate: "",
        tashkilDate: "",
        karshenasiDate: "",
        tasvieDate: "",
        type: 0
      }
    }
  },
  methods: {
    addSingleHospitalPayment() {
      this.$refs.addSingleHospitalPaymentModal.show()
    },
    addSingleHospitalPaymentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleHospitalPaymentLoading = true
          this.$store.dispatch('HospitalPayment/addSingleHospitalPayment', this.hospitalPaymentSingleInformation)
            .then(response => {
              this.addSingleHospitalPaymentLoading = false
            })
            .catch(error => {
              this.addSingleHospitalPaymentLoading = false
            })
        }
      })
    },
    editCurrentHospitalPaymentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleHospitalPaymentLoading = true
          this.$store.dispatch('HospitalPayment/updateSingleHospitalPayment', this.hospitalPaymentSingleInformation)
            .then(response => {
              this.addSingleHospitalPaymentLoading = false
            })
            .catch(error => {
              this.addSingleHospitalPaymentLoading = false
            })
        }
      })
    },
    //emit from child
    handlerEditSingleHospitalPayment(singleEditHospitalPaymentInformation) {
      let flagEditInfo = singleEditHospitalPaymentInformation
      this.travelSingleInformation = {
        travelId: flagEditInfo.travelId,
        cityId: flagEditInfo.cityId,
        parvandeNumber: flagEditInfo.parvandeNumber,
        tahvilDate: flagEditInfo.tahvilDate,
        tashkilDate: flagEditInfo.tashkilDate,
        karshenasiDate: flagEditInfo.karshenasiDate,
        tasvieDate: flagEditInfo.tasvieDate,
        type: flagEditInfo.type
      }
    },
    updateSingleTravel() {
      this.$store.dispatch('HospitalPayment/updateSingleHospitalPayment', this.hospitalPaymentSingleInformation)
        .then(response => {

        })
        .catch(error => {

        })
    },
    closeHospitalPaymentAdd() {
      this.$refs.addSingleHospitalPaymentModal.close()
    }
  }
}
</script>

<style scoped>

</style>
