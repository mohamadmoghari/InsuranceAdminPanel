<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">بایگانی ها</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleArchive"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت یابگانی</span>
            </button>
            <ArchiveList ref="table" @editSingleArchive="handlerEditSingleArchive"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add travel modal-->
    <modal
      id="addSingleArchiveModal"
      ref="addSingleArchiveModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن بایگانی جدید"
      :footer="false"
    >
      <loader :loading="addSingleArchiveLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز</label>
                  <input
                    name="score"
                    v-validate="'required'"
                    v-model="archiveSingleInformation.score" class="form-control form-control-lg">
                  <label v-show="vErrors.has('score')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    v-validate="'required'"
                    name="cityId"
                    v-model="archiveSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>

            </section>
            <section class="row mt-20">
              <section class="col-md-12">
                <section class="form-group">
                  <label>توضیحات</label>
                  <textarea v-model="archiveSingleInformation.descrition"
                            class="form-control form-control-lg no-resize"></textarea>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleArchiveAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleArchiveModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import ArchiveList from "./ArchiveList";

export default {
  name: "DocumentRegistration",
  components: {
    ArchiveList
  },
  data() {
    return {
      addSingleArchiveLoading: false,
      archiveSingleInformation: {
        travelId: 0,
        cityId: 0,
        score: 0,
        descrition: "",
        type: 0
      }
    }
  },
  methods: {
    addSingleArchive() {
      this.$refs.addSingleArchiveModal.show()
    },
    addSingleArchiveAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('Archive/addSingleArchive', this.archiveSingleInformation)
            .then(response => {
              this.addSingleTravelLoading = false
              this.$refs.addSingleArchiveModal.close()
              this.$refs.table.getAllArchiveList()
            })
            .catch(error => {
              this.addSingleTravelLoading = false
            })
        }
      })
    },
    editCurrentDocumentAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('Travel/updateSingleTravel', this.archiveSingleInformation)
            .then(response => {
              this.addSingleTravelLoading = false
            })
            .catch(error => {
              this.addSingleTravelLoading = false
            })
        }
      })
    },
    closeSingleArchiveModal() {
      this.$refs.addSingleArchiveModal.close()
    },

    //emit from child
    handlerEditSingleArchive(singleEditTravelInformation) {
      this.assignSingleArchiveInformationEditing(singleEditTravelInformation)
    },
    assignSingleArchiveInformationEditing(singleRowParam) {
      this.archiveSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        score: singleRowParam.score,
        descrition: singleRowParam.descrition,
        type: singleRowParam.type
      }
      this.$refs.addSingleArchiveModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('Archive/updateSingleArchive', this.archiveSingleInformation)
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
