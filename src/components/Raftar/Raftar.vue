<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">رفتار</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleRaftar"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت رفتار</span>
            </button>
            <raftar-list
              ref="table" @editSingleRaftar="handlerEditSingleRaftar"
            />
          </section>
        </section>
      </section>
    </section>
    <!--    add raftar modal-->
    <modal
      id="addSingleRaftarModal"
      ref="addSingleRaftarModal"
      size="600px"
      icon="fas fa-cog mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن رفتار جدید"
      :footer="false"
    >
      <loader :loading="addSingleRaftarLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="RaftarSingleInformation.cityId"/>
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>کد مرکز</label>
                  <input
                    v-validate="'required'"
                    name="membershipCode"
                    type="number"
                    v-model="RaftarSingleInformation.membershipCode"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('membershipCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>شئونات اداری</label>
                  <input
                    v-validate="'required'"
                    name="shonatEdary"
                    type="number"
                    v-model="RaftarSingleInformation.shonatEdary"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('shonatEdary')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>پاسخگویی</label>
                  <input
                    v-validate="'required'"
                    name="pasokhgoie"
                    v-model="RaftarSingleInformation.pasokhgoie"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('pasokhgoie')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>پیگیری</label>
                  <input
                    v-validate="'required'"
                    name="peygiri"
                    type="number"
                    v-model="RaftarSingleInformation.peygiri"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('peygiri')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>دانش</label>
                  <input
                    v-validate="'required'"
                    name="danesh"
                    v-model="RaftarSingleInformation.danesh"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('danesh')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>حضور</label>
                  <input
                    v-validate="'required'"
                    name="hozor"
                    type="number"
                    v-model="RaftarSingleInformation.hozor"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('hozor')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>کد پرسنلی</label>
                  <input
                    v-validate="'required'"
                    name="personelCode"
                    type="number"
                    v-model="RaftarSingleInformation.personelCode"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('personelCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleRaftarAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleRaftarModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import RaftarList from "./RaftarList";

export default {
  name: "Raftar",
  components: {
    RaftarList
  },
  data() {
    return {
      addSingleRaftarLoading: false,
      RaftarSingleInformation: {
        travelId: 0,
        cityId: 0,
        membershipCode: 0,
        shonatEdary: "",
        peygiri: "",
        danesh: "",
        hozor: "",
        personelCode: "",
      },
    }
  },
  methods: {
    addSingleRaftar() {
      this.$refs.addSingleRaftarModal.show()
    },
    addSingleRaftarAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleRaftarLoading = true
          this.$store.dispatch('Raftar/addSingleRaftar', this.RaftarSingleInformation)
            .then(response => {
              this.addSingleRaftarLoading = false
              this.$refs.addSingleRaftarModal.close()
              this.$refs.table.getAllRaftarList()
            })
            .catch(error => {
              this.addSingleRaftarLoading = false
            })
        }
      })
    },
    closeSingleRaftarModal() {
      this.$refs.addSingleRaftarModal.close()
    },

    //emit from child
    handlerEditSingleRaftar(singleEditRaftarInformation) {
      this.assignSingleRaftarInformationEditing(singleEditRaftarInformation)
    },
    assignSingleRaftarInformationEditing(singleRowParam) {
      this.RaftarSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        membershipCode: singleRowParam.membershipCode,
        shonatEdary: singleRowParam.shonatEdary,
        pasokhgoie: singleRowParam.pasokhgoie,
        peygiri: singleRowParam.danesh,
        hozor: singleRowParam.hozor,
        personelCode: singleRowParam.personelCode,
      }
      this.$refs.addSingleRaftarModal.show()
    },
    updateSinglePerformance() {
      this.$store.dispatch('Raftar/updateSingleRaftar', this.RaftarSingleInformation)
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
