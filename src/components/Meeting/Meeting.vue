<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">جلسات برگزار شده</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleMeeting"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت جلسه</span>
            </button>
            <meeting-list ref="table" @editSingleMeetingList="handlerEditSingleMeeting"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Meeting modal-->
    <modal
      id="addSingleMeetingModal"
      ref="addSingleMeetingModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن جلسه جدید"
      :footer="false"
    >
      <loader :loading="addSingleMeetingLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>استان</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="mettingSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام مدرسه</label>
                  <input
                    v-validate="'required'"
                    v-model="mettingSingleInformation.schoolName"
                    name="schoolName"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('schoolName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تعداد طلبه</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="mettingSingleInformation.talabeCount"
                    name="talabeCount"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('talabeCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>حوزه</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="mettingSingleInformation.houze"
                    name="houze"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('houze')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>تعداد حاظرین</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="mettingSingleInformation.hazerinCount"
                    name="hazerinCount"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('hazerinCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>تاریخ جلسه</label>
                  <date-picker
                    v-validate="'required'"
                    v-model="mettingSingleInformation.jalaseDate"
                    name="jalaseDate"
                  />
                  <label v-show="vErrors.has('jalaseDate')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>زمان شروع</label>
                  <time-picker
                    v-validate="'required'"
                    v-model="mettingSingleInformation.startDateTime"
                    name="jalaseDate"
                  />
                  <label v-show="vErrors.has('startDateTime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>زمان پایان</label>
                  <time-picker
                    v-validate="'required'"
                    v-model="mettingSingleInformation.endDateTime"
                    name="jalaseDate"
                  />
                  <label v-show="vErrors.has('endDateTime')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row">
              <section class="col-md-3">
                <section class="form-group">
                  <label>تعداد سوالات</label>
                  <input
                    v-validate="'required'"
                    name="questionCount"
                    type="number" v-model="mettingSingleInformation.questionCount">
                  <label v-show="vErrors.has('questionCount')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleMeetingAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleMeetingModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import MeetingList from "./MeetingList";

export default {
  name: "Meeting",
  components: {
    MeetingList
  },
  data() {
    return {
      addSingleMeetingLoading: false,
      mettingSingleInformation: {
        cityId: 0,
        schoolName: "",
        talabeCount: 0,
        houze: 0,
        hazerinCount: 0,
        jalaseDate: "",
        startDateTime: "",
        endDateTime: "",
        questionCount: 0
      }
    }
  },
  methods: {
    addSingleMeeting() {
      this.$refs.addSingleMeetingModal.show()
    },
    addSingleMeetingAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('Meeting/addSingleMeeting', this.meetingSingleInformation)
            .then(response => {
              this.addSingleMeetingLoading = false
              this.$refs.addSingleMeetingModal.close()
              this.$refs.table.getAllMeetingList()
            })
            .catch(error => {
              this.addSingleMeetingLoading = false
            })
        }
      })
    },
    closeSingleMeetingModal() {
      this.$refs.addSingleMeetingModal.close()
    },

    //emit from child
    handlerEditSingleMeeting(singleEditMeetingInformation) {
      this.assignSingleMeetingInformationEditing(singleEditMeetingInformation)
    },
    assignSingleMeetingInformationEditing(singleRowParam) {
      this.mettingSingleInformation = {
        cityId: singleRowParam.cityId,
        schoolName: singleRowParam.schoolName,
        talabeCount: singleRowParam.talabeCount,
        houze: singleRowParam.houze,
        hazerinCount: singleRowParam.hazerinCount,
        jalaseDate: singleRowParam.jalaseDate,
        startDateTime: singleRowParam.startDateTime,
        endDateTime: singleRowParam.endDateTime,
        questionCount: singleRowParam.questionCount
      }
      this.$refs.addSingleMeetingModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('Meeting/updateSingleMeeting', this.mettingSingleInformation)
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
