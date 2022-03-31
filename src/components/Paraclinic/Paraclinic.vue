<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">بررسی پاراکلینیک</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleParaclinic"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت پاراکلینیک</span>
            </button>
            <ParaclinicList ref="table" @editSingleParaclinicList="handlerEditSingleParaclinic"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Paraclinic modal-->
    <modal
      id="addSingleParaclinicModal"
      ref="addSingleParaclinicModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن پاراکلینیک جدید"
      :footer="false"
    >
      <loader :loading="addSingleParaclinicLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>استان</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="paraclinicSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام مرکز</label>
                  <input
                    v-validate="'required'"
                    v-model="paraclinicSingleInformation.markazName"
                    name="markazName"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('markazName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تعداد سند</label>
                  <input
                    v-validate="'required'"
                    v-model="paraclinicSingleInformation.sanadCount"
                    name="sanadCount"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('sanadCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>شماره پرونده</label>
                  <input
                    v-validate="'required'"
                    v-model="paraclinicSingleInformation.parvandeNumber"
                    name="parvandeNumber"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('parvandeNumber')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleParaclinicAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleParaclinicModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import ParaclinicList from "./ParaclinicList";

export default {
  name: "DocumentRegistration",
  components: {
    ParaclinicList
  },
  data() {
    return {
      addSingleParaclinicLoading: false,
      paraclinicSingleInformation: {
        cityId: 0,
        markazName: "",
        sanadCount: 0,
        parvandeNumber: ""
      }
    }
  },
  methods: {
    addSingleParaclinic() {
      this.$refs.addSingleParaclinicModal.show()
    },
    addSingleParaclinicAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('Paraclinic/addSingleParaclinic', this.paraclinicSingleInformation)
            .then(response => {
              this.addSingleParaclinicLoading = false
              this.$refs.addSingleParaclinicModal.close()
              this.$refs.table.getAllParaclinicList()
            })
            .catch(error => {
              this.addSingleParaclinicLoading = false
            })
        }
      })
    },
    closeSingleParaclinicModal() {
      this.$refs.addSingleParaclinicModal.close()
    },

    //emit from child
    handlerEditSingleParaclinic(singleEditParaclinicInformation) {
      this.assignSingleArchiveInformationEditing(singleEditParaclinicInformation)
    },
    assignSingleParaclinicInformationEditing(singleRowParam) {
      this.paraclinicSingleInformation = {
        cityId: singleRowParam.cityId,
        markazName: singleRowParam.markazName,
        sanadCount: singleRowParam.sanadCount,
        parvandeNumber: singleRowParam.parvandeNumber
      }
      this.$refs.addSingleParaclinicModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('PaymentValidation/updateSinglePayment', this.paraclinicSingleInformation)
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
