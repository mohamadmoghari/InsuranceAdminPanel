<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">مراجعه حضوری</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleMoraje"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت مراجعه</span>
            </button>
            <Moraje-list ref="table" @editSingleMoraje="handlerEditSingleMoraje"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Moraje modal-->
    <modal
      id="addSingleMorajeModal"
      ref="addSingleMorajeModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن مراجعه جدید"
      :footer="false"
    >
      <loader :loading="addSingleMorajeLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="morajeSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام مرکز</label>
                  <input
                    v-validate="'required'"
                    v-model="morajeSingleInformation.markazName"
                    name="markazName"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('markazName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نوع مرکز</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="morajeSingleInformation.markazType"
                    name="markazType"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('markazType')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>وضعیت معرفی نامه</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="morajeSingleInformation.moarefiStatus"
                    name="moarefiStatus"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('moarefiStatus')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>انطباق اجرا</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="morajeSingleInformation.isExec"
                    name="isExec"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('isExec')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نوع مرکز</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="morajeSingleInformation.Type"
                    name="Type"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('Type')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row">
              <section class="col-md-12">
                <section class="form-group">
                  <label>توضیحات</label>
                  <textarea
                    v-model="morajeSingleInformation.desc"
                    name="desc"
                    class="form-control form-control-lg"
                  ></textarea>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleMorajeAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleMorajeModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import MorajeList from "./MorajeList";

export default {
  name: "Moraje",
  components: {
    MorajeList
  },
  data() {
    return {
      addSingleMorajeLoading: false,
      morajeSingleInformation: {
        travelId: 0,
        cityId: 0,
        markazName: "",
        markazType: 0,
        moarefiStatus: 0,
        isExec: "",
        desc: "",
        type1: 0
      }
    }
  },
  methods: {
    addSingleMoraje() {
      this.$refs.addSingleMorajeModal.show()
    },
    addSingleMorajeAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('Moraje/addSingleMoraje', this.MorajeSingleInformation)
            .then(response => {
              this.addSingleMorajeLoading = false
              this.$refs.addSingleMorajeModal.close()
              this.$refs.table.getAllMorajeList()
            })
            .catch(error => {
              this.addSingleMorajeLoading = false
            })
        }
      })
    },
    closeSingleMorajeModal() {
      this.$refs.addSingleMorajeModal.close()
    },

    //emit from child
    handlerEditSingleMoraje(singleEditMorajeInformation) {
      this.assignSingleMorajeInformationEditing(singleEditMorajeInformation)
    },
    assignSingleMorajeInformationEditing(singleRowParam) {
      this.mettingSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        markazName: singleRowParam.markazName,
        markazType: singleRowParam.markazType,
        moarefiStatus: singleRowParam.moarefiStatus,
        isExec: singleRowParam.isExec,
        desc: singleRowParam.desc,
        type1: singleRowParam.type1,
      }
      this.$refs.addSingleMorajeModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('Moraje/updateSingleMoraje', this.mettingSingleInformation)
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
