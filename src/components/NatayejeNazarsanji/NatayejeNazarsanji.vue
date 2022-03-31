<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">نتایج نظر سنجی</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleNazar"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت نظر سنجی</span>
            </button>
            <Nazar-list ref="table" @editSingleNtayej="handlerEditSingleNazar"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Nazar modal-->
    <modal
      id="addSingleNazarModal"
      ref="addSingleNazarModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن نطر سنجی جدید"
      :footer="false"
    >
      <loader :loading="addSingleNazarLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>شهر</label>
                  <Province
                    name="cityId"
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.cityId"
                  />
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نام مرکز</label>
                  <input
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.markazName"
                    name="markazName"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('markazName')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>کد مرکز</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.membershipCode"
                    name="membershipCode"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('membershipCode')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>نوع بیماری</label>
                  <input
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.bimaryType"
                    name="bimaryType"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('bimaryType')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>مبلغ</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.mablagh"
                    name="mablagh"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('mablagh')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>درصد کیفی</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.keyfiDarsad"
                    name="keyfiDarsad"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('keyfiDarsad')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>محل صدور</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.MahalSodor"
                    name="MahalSodor"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalSodor')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>مازاد پرداخت</label>
                  <input
                    type="number"
                    v-validate="'required'"
                    v-model="natayejeSingleInformation.MazadPardakht"
                    name="MazadPardakht"
                    class="form-control form-control-lg">
                  <label v-show="vErrors.has('MazadPardakht')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-3">
                <section class="form-group">
                  <label>عامل هدایت</label>
                  <input
                    class="form-control form-control-lg"
                    v-validate="'required'"
                    name="AmelHedayat"
                    type="number" v-model="natayejeSingleInformation.AmelHedayat">
                  <label v-show="vErrors.has('AmelHedayat')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-3">
                <section class="form-group">
                  <label>راهنما</label>
                  <input
                    class="form-control form-control-lg"
                    v-validate="'required'"
                    name="Rahnama"
                    type="number" v-model="natayejeSingleInformation.Rahnama">
                  <label v-show="vErrors.has('Rahnama')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleNazarAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleNazarModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import NazarList from "./NatayejeNazarsanjiList";

export default {
  name: "Nazar",
  components: {
    NazarList
  },
  data() {
    return {
      addSingleNazarLoading: false,
      natayejeSingleInformation: {
        travelId: 0,
        cityId: 0,
        markazName: "",
        membershipCode: 0,
        bimaryType: "",
        mablagh: 0,
        keyfiDarsad: 0,
        mahalSodor: 0,
        mazadPardakh: 0,
        amelHedayat: 0,
        rahnama: 0
      }
    }
  },
  methods: {
    addSingleNazar() {
      this.$refs.addSingleNazarModal.show()
    },
    addSingleNazarAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleTravelLoading = true
          this.$store.dispatch('NarayejNazarsanji/addSingleKhesaratVariz', this.natayejeSingleInformation)
            .then(response => {
              this.addSingleNazarLoading = false
              this.$refs.addSingleNazarModal.close()
              this.$refs.table.getAllNatayejList()
            })
            .catch(error => {
              this.addSingleNazarLoading = false
            })
        }
      })
    },
    closeSingleNazarModal() {
      this.$refs.addSingleNazarModal.close()
    },

    //emit from child
    handlerEditSingleNazar(singleEditNazarInformation) {
      this.assignSingleNazarInformationEditing(singleEditNazarInformation)
    },
    assignSingleNazarInformationEditing(singleRowParam) {
      this.mettingSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        markazName: singleRowParam.markazName,
        membershipCode: singleRowParam.membershipCode,
        bimaryType: singleRowParam.bimaryType,
        mablagh: singleRowParam.mablagh,
        keyfiDarsad: singleRowParam.keyfiDarsad,
        mahalSodor: singleRowParam.mahalSodor,
        mazadPardakh: singleRowParam.mazadPardakh,
        amelHedayat: singleRowParam.amelHedayat,
        rahnama: singleRowParam.rahnama
      }
      this.$refs.addSingleNazarModal.show()
    },
    updateSingleArchive() {
      this.$store.dispatch('NarayejNazarsanji/updateSingleKhesaratVariz', this.natayejeSingleInformation)
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
