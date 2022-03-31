<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">معرفی پاراکلینیک</p>
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
            <paraclinic-morefi-list ref="table" @editSingleParaclinicList="handlerEditSingleParaclinic"/>
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
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="paraclinicSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>موضوع</label>
                  <input
                    v-validate="'required'"
                    v-model="paraclinicSingleInformation.subject"
                    name="subject"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('subject')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
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
import ParaclinicMorefiList from "./ParaclinicMorefiList";

export default {
  name: "DocumentRegistration",
  components: {
    ParaclinicMorefiList
  },
  data() {
    return {
      addSingleParaclinicLoading: false,
      paraclinicSingleInformation: {
        travelId: 0,
        cityId: 0,
        subject: "",
        count: 0
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
          this.$store.dispatch('ParaclinicMorefi/addSingleParaclinicMorefi', this.paraclinicSingleInformation)
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
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        subject: singleRowParam.subject,
        count: singleRowParam.count
      }
      this.$refs.addSingleParaclinicModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('ParaclinicMorefi/updateSingleParaclinicMorefi', this.paraclinicSingleInformation)
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
