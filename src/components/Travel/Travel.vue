<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">سفرها</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleTravel"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت سفر</span>
            </button>
            <travel-list
              @editSingleTravel="handlerEditSingleTravel"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add travel modal-->
    <modal
      id="addSingleTravelModal"
      ref="addSingleTravelModal"
      size="600px"
      icon="fas fa-plane mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن سفر جدید"
      :footer="false"
    >
      <loader :loading="addSingleTravelLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام</label>
                  <input
                    name="name"
                    v-validate="'required'"
                    v-model="travelSingleInformation.name" class="form-control form-control-lg">
                  <label v-show="vErrors.has('name')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>استان</label>
                  <Province
                    name="province"
                    v-validate="'required'"
                    v-model="travelSingleInformation.province"/>
                  <label v-show="vErrors.has('province')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ سفر</label>
                  <date-picker
                    name="travelDate"
                    v-validate="'required'"
                    v-model="travelSingleInformation.travelDate"/>
                  <label v-show="vErrors.has('travelDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ شروع</label>
                  <date-picker
                    name="startDate"
                    v-validate="'required'"
                    v-model="travelSingleInformation.startDate"/>
                  <label v-show="vErrors.has('startDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ پایان</label>
                  <date-picker
                    name="endDate"
                    v-validate="'required'"
                    v-model="travelSingleInformation.endDate"/>
                  <label v-show="vErrors.has('endDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>شماره سفر</label>
                  <input
                    name="travelNumber"
                    v-validate="'required'"
                    v-model="travelSingleInformation.travelNumber" class="form-control form-control-lg"/>
                  <label v-show="vErrors.has('travelNumber')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleTravelAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleTravelModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>

<script>
import TravelList from "./TravelList";

export default {
  name: "DocumentRegistration",
  components: {
    TravelList
  },
  data() {
    return {
      addSingleTravelLoading: false,
      travelSingleInformation: {
        name: "",
        province: 0,
        travelDate: "",
        startDate: "",
        endDate: "",
        travelNumber: "",
      }
    }
  },
  methods: {
    addSingleTravel() {
      this.$refs.addSingleTravelModal.show()
    },
    addSingleTravelAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('Travel/addSingleTravel', this.travelSingleInformation)
            .then(response => {
              this.addSingleTravelLoading = false
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
          this.$store.dispatch('Travel/updateSingleTravel', this.travelSingleInformation)
            .then(response => {
              this.addSingleTravelLoading = false
            })
            .catch(error => {
              this.addSingleTravelLoading = false
            })
        }
      })
    },
    closeSingleTravelModal() {
      this.$refs.addSingleTravelModal.close()
    },

    //emit from child
    handlerEditSingleTravel(singleEditTravelInformation) {
     this.assignSingleTravelInformationEditing(singleEditTravelInformation)
    },
    assignSingleTravelInformationEditing(singleRowParam){
      this.travelSingleInformation = {
        name: singleRowParam.name,
        province: singleRowParam.province,
        travelDate: singleRowParam.travelDate,
        startDate: singleRowParam.startDate,
        endDate: singleRowParam.endDate,
        travelNumber: singleRowParam.travelNumber,
        type: singleRowParam.type
      }
      console.log(this.travelSingleInformation,'this.travelSingleInformation')
      this.$refs.addSingleTravelModal.show()
    },
    updateSingleTravel() {
      this.$store.dispatch('Travel/updateSingleTravel', this.travelSingleInformation)
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
