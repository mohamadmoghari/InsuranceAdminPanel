<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">پرونده پرداخت پاراکلینیک</p>
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
            <parvande-pardekhte-paraclinic-list
              ref="table" @editSingleParaclinic="handlerEditSingleParaclinic"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add performance modal-->
    <modal
      id="addSingleParaclinicModal"
      ref="addSingleParaclinicModal"
      size="600px"
      icon="fas fa-cog mb-3 font-20"
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
                    v-model="ParaclinicSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>شماره پرونده</label>
                  <input
                    v-validate="'required'"
                    name="parvandeNumber"
                    type="number"
                    v-model="ParaclinicSingleInformation.parvandeNumber"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('parvandeNumber')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ تحویل</label>
                  <date-picker
                    v-validate="'required'"
                    name="tahvilDate"
                    v-model="ParaclinicSingleInformation.tahvilDate"
                  />
                  <label v-show="vErrors.has('tahvilDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ تشکیل پرونده</label>
                  <date-picker
                    v-validate="'required'"
                    name="tashkilDate"
                    v-model="ParaclinicSingleInformation.tashkilDate"
                  />
                  <label v-show="vErrors.has('tashkilDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ کارشناسی</label>
                  <date-picker
                    v-validate="'required'"
                    name="karshenasiDate"
                    v-model="ParaclinicSingleInformation.karshenasiDate"
                  />
                  <label v-show="vErrors.has('karshenasiDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ تسویه</label>
                  <date-picker
                    v-validate="'required'"
                    name="tasvieDate"
                    v-model="ParaclinicSingleInformation.tasvieDate"
                  />
                  <label v-show="vErrors.has('tasvieDate')" class="error mt-8 mr-5 pink">اجباری</label>
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
import ParvandePardekhteParaclinicList from "./ParvandePardekhteParaclinicList";

export default {
  name: "Car",
  components: {
    ParvandePardekhteParaclinicList
  },
  data() {
    return {
      addSingleParaclinicLoading: false,
      ParaclinicSingleInformation: {
        travelId: 0,
        cityId: 0,
        parvandeNumber: '',
        tahvilDate: '',
        tashkilDate: '',
        karshenasiDate: '',
        tasvieDate: '',
      },
    }
  },
  methods: {
    addSingleParaclinic() {
      this.$refs.addSingleParaclinicModal.show()
    },
    addSingleParaclinicAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleParaclinicLoading = true
          this.$store.dispatch('ParaclinicParvandePardakht/addSingleParaclinicParvandePardakht', this.ParaclinicSingleInformation)
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
      this.assignSingleParaclinicInformationEditing(singleEditParaclinicInformation)
    },
    assignSingleParaclinicInformationEditing(singleRowParam) {
      this.ParaclinicSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        parvandeNumber: singleRowParam.parvandeNumber,
        tahvilDate: singleRowParam.tahvilDate,
        tashkilDate: singleRowParam.tashkilDate,
        karshenasiDate: singleRowParam.karshenasiDate,
        tasvieDate: singleRowParam.tasvieDate,
      }
      this.$refs.addSingleParaclinicModal.show()
    },
    updateSinglePerformance() {
      this.$store.dispatch('LifeParaclinic/updateSingleCarParaclinic', this.ParaclinicSingleInformation)
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
