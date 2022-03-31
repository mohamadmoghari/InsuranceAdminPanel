<template>
  <loader :loading="loading">
    <section class="table-responsive">
      <table class="table table-stripped mb-0">
        <tbody>
        <tr>
          <th width="50">ردیف</th>
          <th width="200">استان</th>
          <th width="190">مدرسه</th>
          <th width="150">تعداد طلبه</th>
          <th width="150">حوزه</th>
          <th width="150">تعداد حاظرین</th>
          <th width="150">تاریخ جلسه</th>
          <th width="150">تاریخ شروع</th>
          <th width="150">تاریخ پایان</th>
          <th width="150">تعداد سوالات</th>
          <th width="80">عملیات</th>
        </tr>
        <tr v-for="singleMeeting in meetingLists" :key="singleMeeting.id">
          <td>{{ singleMeeting.id }}</td>
          <td>{{ singleMeeting.cityId }}</td>
          <td>{{ singleMeeting.schoolName }}</td>
          <td>{{ singleMeeting.talabeCount }}</td>
          <td>{{ singleMeeting.houze }}</td>
          <td>{{ singleMeeting.hazerinCount }}</td>
          <td>{{ singleMeeting.jalaseDate }}</td>
          <td>{{ singleMeeting.startDateTime }}</td>
          <td>{{ singleMeeting.endDateTime }}</td>
          <td>{{ singleMeeting.questionCount }}</td>
          <td class="d-flex justify-content-around">
            <i class="far fa-edit i-btn font-15 pointer" @click="$emit('editSinglePerformance',singleMeeting)"></i>
            <i @click="confirmationDeleteCurrentMeeting(singleMeeting.id)"
               class="far fa-trash-alt i-btn font-15 pointer"></i>
          </td>
        </tr>
        <tr v-if="meetingLists.length == 0">
          <td colspan="11" class="text-center pt-30 pb-30">در حال حاظر اطلاعاتی برای نمایش وجود ندارد</td>
        </tr>
        </tbody>
      </table>
    </section>
    <pagination
      v-model="filter.PageNumber"
      :total-rows="totalRows"
      @change="getAllMeetingList"></pagination>
    <!--        delete single performance confirmation-->
    <modal
      id="deleteSingleMeetingModal"
      ref="deleteSingleMeetingModal"
      size="350px"
      icon="fa fa-trash mb-3 font-20"
      :simple="false"
      color="danger"
      title="حذف جلسه"
      next-text="حذف جلسه"
      :next-focus="true"
      @next="removeSingleMeeting"
    >
      <form ref="deleteForm" class="text-center text-danger">
        <loader :loading="deleteSingleMeetingLoading">
          <p class="font-13 mt-10">آیا مطمئن هستید که می خواید اطلاعات این جلسه را حدف کنید ؟</p>
        </loader>
      </form>
    </modal>
  </loader>
</template>


<script>
export default {
  name: "MeetingList",
  data() {
    return {
      loading: false,
      deleteSingleMeetingLoading: false,
      removeSingleMeetingId: '',
      meetingLists: [],
      filter: {
        PageNumber: 1,
        PageSize: 10
      },
      totalRows: 0
    }
  },
  created() {
    this.getAllMeetingList()
  },
  methods: {
    getAllMeetingList() {
      this.loading = true
      this.$store.dispatch('Meeting/getAllMeetingList', this.filter)
        .then(response => {
          this.meetingLists = response.data.list
          this.totalRows = response.data.totalRows
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    confirmationDeleteCurrentMeeting(currentMeetingId) {
      this.removeSingleMeetingId = currentMeetingId
      this.$refs.deleteSingleMeetingModal.show()
    },
    removeSingleMeeting() {
      this.deleteSingleMeetingLoading = true
      this.$store.dispatch('Meeting/deleteSingleMeeting', this.removeSingleMeetingId)
        .then(response => {
          this.$refs.deleteSingleMeetingModal.close()
          this.deleteSingleMeetingLoading = false
          //update travel list
          this.getAllMeetingList()
        })
        .catch(error => {
          this.deleteSingleMeetingLoading = false
        })
    },
    closeDeleteSinglePerformanceConfirmation() {
      //this.$refs.deleteSingleTravelModal.close()
    }
  }
}
</script>

<style scoped>

</style>
