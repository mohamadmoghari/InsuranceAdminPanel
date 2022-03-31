<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">بیمه خودرو</p>
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
              <span>ثبت بیمه خودرو</span>
            </button>
            <car-list
              ref="table" @editSingleInsurance="handlerEditSingleInsurance"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add performance modal-->
    <modal
      id="addSingleInsuranceModal"
      ref="addSingleInsuranceModal"
      size="600px"
      icon="fas fa-cog mb-3 font-20"
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
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ شروع</label>
                  <date-picker
                    v-validate="'required'"
                    name="sDate"
                    v-model="insuranceSingleInformation.sDate"
                  />
                  <label v-show="vErrors.has('sDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تاریخ پایان</label>
                  <date-picker
                    v-validate="'required'"
                    name="eDate"
                    v-model="insuranceSingleInformation.eDate"
                  />
                  <label v-show="vErrors.has('eDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>بیمه شخص ثالث</label>
                  <b-select
                    v-model="insuranceSingleInformation.hasSalesBime"
                    name="hasSalesBime"
                    :items="booleanItems"
                  ></b-select>
                  <label v-show="vErrors.has('hasSalesBime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تعداد بیمه ثالث</label>
                  <input
                    v-validate="'required'"
                    name="salesBimeCount"
                    type="number"
                    v-model="insuranceSingleInformation.salesBimeCount"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('salesBimeCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>بیمه بدنه</label>
                  <b-select
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.hasBadaneBime"
                    name="hasBadaneBime"
                    :items="booleanItems"
                  ></b-select>
                  <label v-show="vErrors.has('hasBadaneBime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>تعداد بیمه بدنه</label>
                  <input
                    v-validate="'required'"
                    name="badaneBimeCount" v-model="insuranceSingleInformation.badaneBimeCount"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('badaneBimeCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>تشخیص</label>
                  <b-select
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.hasTaghsit"
                    name="hasTaghsit"
                    :items="booleanItems"
                  ></b-select>
                  <label v-show="vErrors.has('hasTaghsit')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>خسارت</label>
                  <b-select
                    v-validate="'required'"
                    v-model="insuranceSingleInformation.hasKhesarat"
                    name="hasKhesarat"
                    :items="booleanItems"
                  ></b-select>
                  <label v-show="vErrors.has('hasKhesarat')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-12">
                <section class="form-group">
                  <label>توضیحات</label>
                  <textarea v-model="insuranceSingleInformation.description"
                            class="form-control form-control-lg no-resize"></textarea>
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
import CarList from "./CariList";

export default {
  name: "Car",
  components: {
    CarList
  },
  data() {
    return {
      addSingleInsuranceLoading: false,
      insuranceSingleInformation: {
        travelId: 0,
        cityId: 0,
        sDate: "",
        eDate: "",
        hasSalesBime: 0,
        salesBimeCount: 0,
        hasBadaneBime: 0,
        badaneBimeCount: 0,
        hasTaghsit: 0,
        hasKhesarat: 0,
        description: ""
      },
      booleanItems: [
        {
          id: 1,
          name: 'خیر',
          value: 0,
        },
        {
          id: 2,
          name: 'بله',
          value: 1,
        }
      ]
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
          this.$store.dispatch('CarInsurance/addSingleCarInsurance', this.insuranceSingleInformation)
            .then(response => {
              this.addSingleInsuranceLoading = false
              this.$refs.addSingleInsuranceModal.close()
              this.$refs.table.getAllInsuranceList()
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
      this.assignSingleInsuranceInformationEditing(singleEditInsuranceInformation)
    },
    assignSingleInsuranceInformationEditing(singleRowParam) {
      this.insuranceSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        sDate: singleRowParam.sDate,
        eDate: singleRowParam.eDate,
        hasSalesBime: singleRowParam.hasSalesBime,
        salesBimeCount: singleRowParam.salesBimeCount,
        hasBadaneBime: singleRowParam.hasBadaneBime,
        badaneBimeCount: singleRowParam.badaneBimeCount,
        hasTaghsit: singleRowParam.hasTaghsit,
        hasKhesarat: singleRowParam.hasKhesarat,
        description: singleRowParam.description
      }
      this.$refs.addSingleInsuranceModal.show()
    },
    updateSinglePerformance() {
      this.$store.dispatch('CarInsurance/updateSingleCarInsurance', this.insuranceSingleInformation)
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
