<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">خسارت واریز</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleKhesarat"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت خسارت</span>
            </button>
            <Khesarat-variz-list ref="table" @editSingleKhesarat="handlerEditSingleKhesarat"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Khesarat modal-->
    <modal
      id="addSingleKhesaratModal"
      ref="addSingleKhesaratModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن خسارت جدید"
      :footer="false"
    >
      <loader :loading="addSingleKhesaratLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <input
                    name="cityId"
                    v-validate="'required'"
                    v-model="KhesaratSingleInformation.cityId" class="form-control form-control-lg">
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ</label>
                  <date-picker
                    name="date"
                    v-validate="'required'"
                    v-model="KhesaratSingleInformation.date"
                  />
                  <label v-show="vErrors.has('date')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>زمان تسویه</label>
                  <time-picker
                    name="tasvieTime"
                    v-validate="'required'"
                    v-model="KhesaratSingleInformation.tasvieTime"
                  />
                  <label v-show="vErrors.has('tasvieTime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>زمان صدور</label>
                  <time-picker
                    name="sodorTime"
                    v-validate="'required'"
                    v-model="KhesaratSingleInformation.sodorTime"
                  />
                  <label v-show="vErrors.has('sodorTime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>زمان واریز</label>
                  <time-picker
                    name="varizTime"
                    v-validate="'required'"
                    v-model="KhesaratSingleInformation.varizTime"
                  />
                  <label v-show="vErrors.has('varizTime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleKhesaratAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleKhesaratModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import KhesaratVarizList from "./KhesaratVarizList";

export default {
  name: "DocumentRegistration",
  components: {
    KhesaratVarizList
  },
  data() {
    return {
      addSingleKhesaratLoading: false,
      KhesaratSingleInformation: {
        travelId: 0,
        cityId: 0,
        date: "",
        tasvieTime: "",
        sodorTime: "",
        varizTime: ""
      }
    }
  },
  methods: {
    addSingleKhesarat() {
      this.$refs.addSingleKhesaratModal.show()
    },
    addSingleKhesaratAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleKhesaratLoading = true
          this.$store.dispatch('KhesaratVariz/getAllKhesaratVarizList', this.KhesaratSingleInformation)
            .then(response => {
              this.addSingleKhesaratLoading = false
              this.$refs.addSingleKhesaratModal.close()
              this.$refs.table.getAllKhesaratList()
            })
            .catch(error => {
              this.addSingleKhesaratLoading = false
            })
        }
      })
    },
    closeSingleKhesaratModal() {
      this.$refs.addSingleKhesaratModal.close()
    },

    //emit from child
    handlerEditSingleKhesarat(singleEditKhesaratInformation) {
      this.assignSingleKhesaratEditing(singleEditKhesaratInformation)
    },
    assignSingleKhesaratEditing(singleRowParam) {
      this.KhesaratSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        date: singleRowParam.date,
        tasvieTime: singleRowParam.tasvieTime,
        sodorTime: singleRowParam.sodorTime,
        varizTime: singleRowParam.varizTime
      }
      this.$refs.addSingleKhesaratModal.show()
    },
    updateSingleKhesarat() {
      this.$store.dispatch('KhesaratVariz/updateSingleKhesaratVariz', this.KhesaratSingleInformation)
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
