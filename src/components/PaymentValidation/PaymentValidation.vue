<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">صحت سنجی پرداخت</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSinglePayment"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت صحت سنجی</span>
            </button>
            <payment-validation-list
              @editSinglePayment="handlerEditSinglePayment"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add single payment modal-->
    <modal
      id="addSinglePaymentModal"
      ref="addSinglePaymentModal"
      size="600px"
      icon="fas fa-money-bill-wave mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن صحت سنجی جدید"
      :footer="false"
    >
      <loader :loading="addSinglePaymentLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>سفر</label>
                  <travel
                    v-validate="'required'"
                    name="travelId"
                    v-model="PaymentValidationInformation.travelId"/>
                  <label v-show="vErrors.has('travelId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>cityId</label>
                  <province
                    v-validate="'required'"
                    name="cityId"
                    v-model="PaymentValidationInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام کامل</label>
                  <input
                    v-validate="'required'"
                    name="fullName"
                    v-model="PaymentValidationInformation.fullName" type="number"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('fullName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>کد عضویت</label>
                  <input
                    v-validate="'required'"
                    name="memberShipCode"
                    v-model="PaymentValidationInformation.memberShipCode" type="number"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('memberShipCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام مرکز</label>
                  <input
                    v-validate="'required'"
                    name="markazName"
                    v-model="PaymentValidationInformation.markazName" type="number"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('markazName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>مبلغ کارشناسی</label>
                  <input
                    v-validate="'required'"
                    name="karshenasiMab"
                    v-model="PaymentValidationInformation.karshenasiMab" type="number"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('karshenasiMab')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>مبلغ خسارت</label>
                  <date-picker
                    v-validate="'required'"
                    name="khesaratMab"
                    v-model="PaymentValidationInformation.khesaratMab"/>
                  <label v-show="vErrors.has('khesaratMab')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>مغایرت</label>
                  <input
                    v-validate="'required'"
                    name="moghyerat"
                    v-model="PaymentValidationInformation.moghyerat" class="form-control form-control-lg"/>
                  <label v-show="vErrors.has('moghyerat')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSinglePaymentAction">ثبت</button>
<!--            <button class="btn btn-primary" @click="editCurrentPaymentAction">ویرایش</button>-->
            <button class="btn btn-danger" @click="closePaymentAdd">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>

<script>
import PaymentValidationList from "./PaymentValidationList";

export default {
  name: "PaymentValidation",
  components: {
    PaymentValidationList
  },
  data() {
    return {
      addSinglePaymentLoading: false,
      PaymentValidationInformation: {
        travelId: 0,
        cityId: 0,
        fullName: "",
        memberShipCode: 0,
        markazName: "",
        karshenasiMab: 0,
        khesaratMab: 0,
        moghyerat: 0,
      }
    }
  },
  methods: {
    addSinglePayment() {
      this.$refs.addSinglePaymentModal.show()
    },
    addSinglePaymentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSinglePaymentLoading = true
          this.$store.dispatch('PaymentValidation/addSinglePayment', this.PaymentValidationInformation)
            .then(response => {
              this.addSinglePaymentLoading = false
            })
            .catch(error => {
              this.addSinglePaymentLoading = false
            })
        }
      })
    },
    editCurrentPaymentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSinglePaymentLoading = true
          this.$store.dispatch('PaymentValidation/updateSinglePayment', this.PaymentValidationInformation)
            .then(response => {
              console.log(response, 'response edit')
              this.addSinglePaymentLoading = false
            })
            .catch(error => {
              this.addSinglePaymentLoading = false
            })
        }
      })
    },
    //emit from child
    handlerEditSinglePayment(singleEditPaymentInformation) {
      let flagEditInfo = singleEditPaymentInformation
      this.PaymentValidationInformation = {
        id: flagEditInfo.id,
        travelId: flagEditInfo.travelId,
        cityId: flagEditInfo.cityId,
        fullName: flagEditInfo.fullName,
        memberShipCode: flagEditInfo.memberShipCode,
        markazName: flagEditInfo.markazName,
        karshenasiMab: flagEditInfo.karshenasiMab,
        khesaratMab: flagEditInfo.khesaratMab,
        moghyerat: flagEditInfo.moghyerat,
        type: flagEditInfo.type
      }
      this.$refs.addSinglePaymentModal.show()
    },
    closePaymentAdd() {
      this.$refs.addSinglePaymentModal.close()
    }
  }
}
</script>

<style scoped>

</style>
