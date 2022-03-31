<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">معرفی بیمارستان</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleIntroduction"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت</span>
            </button>
            <introduction-hospital-list ref="table" @editSingleIntroduction="handlerEditSingleIntroduction"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Introduction modal-->
    <modal
      id="addSingleIntroductionModal"
      ref="addSingleIntroductionModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="ثبت"
      :footer="false"
    >
      <loader :loading="addSingleIntroductionLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <province
                    name="cityId"
                    v-validate="'required'"
                    v-model="introductionSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>موضوع</label>
                  <input
                    v-validate="'required'"
                    class="form-control" name="subject" v-model="introductionSingleInformation.subject">
                  <label v-show="vErrors.has('subject')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تعداد</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    class="form-control" name="count" v-model="introductionSingleInformation.count">
                  <label v-show="vErrors.has('count')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleIntroductionAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleIntroductionModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import IntroductionHospitalList from './IntroductionHospitalList'

export default {
  name: "AcceptedDocument",
  components: {
    IntroductionHospitalList
  },
  data() {
    return {
      addSingleIntroductionLoading: false,
      introductionSingleInformation: {
        travelId: 0,
        cityId: 0,
        subject: "",
        count: 0
      }
    }
  },
  methods: {
    addSingleIntroduction() {
      this.$refs.addSingleIntroductionModal.show()
    },
    addSingleIntroductionAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleIntroductionLoading = true
          this.$store.dispatch('IntroductionHospital/addSingleIntroductionHospital', this.introductionSingleInformation)
            .then(response => {
              this.addSingleIntroductionLoading = false
              this.$refs.addSingleIntroductionModal.close()
              this.$refs.table.getAllIntroductionList()
            })
            .catch(error => {
              this.addSingleIntroductionLoading = false
            })
        }
      })
    },
    closeSingleIntroductionModal() {
      this.$refs.addSingleIntroductionModal.close()
    },

    //emit from child
    handlerEditSingleArchive(singleEditIntroductionInformation) {
      this.assignSingleIntroductionEditing(singleEditIntroductionInformation)
    },
    assignSingleIntroductionEditing(singleRowParam) {
      this.introductionSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        subject: singleRowParam.subject,
        count: singleRowParam.count
      }
      this.$refs.addSingleIntroductionModal.show()
    },
    updateSingleIntroduction() {
      this.$store.dispatch('IntroductionHospital/updateSingleIntroductionHospital', this.introductionSingleInformation)
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
