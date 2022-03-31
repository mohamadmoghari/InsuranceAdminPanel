<template>
  <section class="container-fluid pb-30">
    <p class="font-20 mt-40 mb-15">کارشناسی اسناد</p>
    <section class="box">
      <section class="body">
        <section class="row">
          <section class="col-md-12 col-lg-12">
            <button
              @click="addSingleKarshnasi"
              type="button"
              class="btn btn-success btn-sm pl-15 pr-15 mb-20"
            >
              <i class="fa fa-plus ml-5"></i>
              <span>ثبت کارشناسی</span>
            </button>
            <Karshenasi-List ref="table" @editSingleKarshnasi="handlerEditSingleKarshnasi"/>
          </section>
        </section>
      </section>
    </section>
    <!--    add Karshnasi modal-->
    <modal
      id="addSingleKarshnasiModal"
      ref="addSingleKarshnasiModal"
      size="600px"
      icon="fas fa-file-archive mb-3 font-20"
      :simple="false"
      color="primary"
      :next-focus="true"
      title="افزودن کارشناسی جدید"
      :footer="false"
    >
      <loader :loading="addSingleKarshnasiLoading">
        <section class="hero-add-single-document-information">
          <section class="container-fluid">
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>شهر</label>
                  <input
                    name="cityId"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.cityId" class="form-control form-control-lg">
                  <label v-show="vErrors.has('cityId')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز تعرفه</label>
                  <input
                    name="tarefeScore"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.tarefeScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('tarefeScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات تعرفه</label>
                  <input
                    name="tarefeDesc"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.tarefeDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('tarefeDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز کسر فرانشیز</label>
                  <input
                    type="number"
                    name="kasrFeranshizScore"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.kasrFeranshizScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('kasrFeranshizScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات کسر فرانشیز</label>
                  <input
                    name="KasrFranshizDesc"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KasrFranshizDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KasrFranshizDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز کارشناسی داور</label>
                  <input
                    name="KarshenasiDaroScore"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasiDaroScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasiDaroScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات کارشاسی دارو</label>
                  <input
                    name="KarshenasiDaroDesc"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasiDaroDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasiDaroDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز یارانه سلامت</label>
                  <input
                    type="number"
                    name="YaraneSalamatScore"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.YaraneSalamatScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('YaraneSalamatScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات یارانه سلامت</label>
                  <input
                    name="YaraneSalamatDecs"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.YaraneSalamatDecs" class="form-control form-control-lg">
                  <label v-show="vErrors.has('YaraneSalamatDecs')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>امتیاز خیریه</label>
                  <input
                    type="number"
                    name="KheyrieScore"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KheyrieScore" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KheyrieScore')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات خیریه</label>
                  <input
                    name="KheyrieDesc"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KheyrieDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KheyrieDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل بیمارستان خصوصی</label>
                  <input
                    name="MahalBimarestanKhososi"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalBimarestanKhososi" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalBimarestanKhososi')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل بیمارستان دولتی</label>
                  <input
                    name="MahalBimarestanDolati"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalBimarestanDolati" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalBimarestanDolati')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل دندان پزشک</label>
                  <input
                    name="MahalDandanPezeshk"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalDandanPezeshk" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalDandanPezeshk')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل دریافت عینک</label>
                  <input
                    name="MahalEynak"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalEynak" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalEynak')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل دریافت داروی خاص</label>
                  <input
                    type="number"
                    name="MahalDaroKhas"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalDaroKhas" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalDaroKhas')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل دریافت داروی عمومی</label>
                  <input
                    name="MahalDaroOmomi"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalDaroOmomi" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalDaroOmomi')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>ای دی محل تصویر برداری</label>
                  <input
                    name="MahalTasvirType"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalTasvirType" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalTasvirType')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل آزمایشگاه</label>
                  <input
                    type="number"
                    name="MahalAzmayeshgah"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalAzmayeshgah" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalAzmayeshgah')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>محل جراحی</label>
                  <input
                    name="MahalJarahi"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalJarahi" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalJarahi')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات محل</label>
                  <input
                    name="MahalDesc"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.MahalDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('MahalDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی بیمارستان خصوصی</label>
                  <input
                    type="number"
                    name="KarshenasiBimarestanKhsosi"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasiBimarestanKhsosi" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasiBimarestanKhsosi')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی بیمارستان دولتی</label>
                  <input
                    name="KarshenasiBimarestanDolati"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasiBimarestanDolati" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasiBimarestanDolati')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی دندان پزشکی</label>
                  <input
                    name="KarshenadDandanPezeshki"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenadDandanPezeshki" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenadDandanPezeshki')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی عینک</label>
                  <input
                    name="karshenadEynak"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.karshenadEynak" class="form-control form-control-lg">
                  <label v-show="vErrors.has('karshenadEynak')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی دارو خاص</label>
                  <input
                    name="KarshenadDariKhas"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenadDariKhas" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenadDariKhas')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی دارو عمومی</label>
                  <input
                    name="KarshenasDaropOmomi"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasDaropOmomi" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasDaropOmomi')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row mt-20">
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی تصویر برداری</label>
                  <input
                    name="KarshenasDTasvirType"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasDTasvirType" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasDTasvirType')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی محل آزمایشگاه</label>
                  <input
                    name="KarshenasMahalAzmayesh"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshenasMahalAzmayesh" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshenasMahalAzmayesh')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
              <section class="col-md-4">
                <section class="form-group">
                  <label>کارشناسی جراحی</label>
                  <input
                    name="KarshnasJarahi"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshnasJarahi" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshnasJarahi')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
            <section class="row">
              <section class="col-md-4">
                <section class="form-group">
                  <label>توضیحات کارشناسی</label>
                  <input
                    name="KarshnasDesc"
                    v-validate="'required'"
                    v-model="karshnasiSingleInformation.KarshnasDesc" class="form-control form-control-lg">
                  <label v-show="vErrors.has('KarshnasDesc')" class="error mt-8 mr-5 pink">اجباری</label>
                </section>
              </section>
            </section>
          </section>
          <section class="holder-action text-center mb-20 mt-20">
            <button class="btn btn-primary" @click="addSingleKarshnasiAction">ثبت</button>
            <button class="btn btn-danger" @click="closeSingleKarshnasiModal">بستن</button>
          </section>
        </section>
      </loader>
    </modal>
  </section>
</template>


<script>
import KarshenasiList from "./KarshenasiList";

export default {
  name: "DocumentRegistration",
  components: {
    KarshenasiList
  },
  data() {
    return {
      addSingleKarshnasiLoading: false,
      karshnasiSingleInformation: {
        travelId: 0,
        cityId: 0,
        tarefeScore: 0,
        tarefeDesc: "",
        kasrFeranshizScore: 0,
        kasrFeranshizDesc: "",
        karshenasiDaroScore: 0,
        karshenasiDaroDesc: "",
        yaraneSalamatScore: 0,
        yaraneSalamatDesc: "",
        kheyrieScore: 0,
        kheyrieDesc: "",
        mahalBimsarestanKhososi: 0,
        mahalBimarestaDolati: 0,
        mahalDandanPezeshk: 0,
        mahalEynak: 0,
        mahalDaroKhas: 0,
        mahalDaroOmomi: 0,
        mahalTasvirType: 0,
        mahalAzmayeshgah: 0,
        mahalJarahi: 0,
        mahalDesc: "",
        karshenasBimarestanKhososi: 0,
        karshenasBimarestanDolati: 0,
        karshenadDandanPezeshk: 0,
        karshenadEyak: 0,
        karshenadDariKhas: 0,
        karshenasDaroOmomi: 0,
        karshenasTasvirType: 0,
        karshenasMahalAzmayesh: 0,
        karshenasJarahi: 0,
        karshenasDesc: ""
      }
    }
  },
  methods: {
    addSingleKarshnasi() {
      this.$refs.addSingleKarshnasiModal.show()
    },
    addSingleKarshnasiAction() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.addSingleKarshnasiLoading = true
          this.$store.dispatch('Karshenasi/addSingleKarshnasi', this.karshnasiSingleInformation)
            .then(response => {
              this.addSingleKarshnasiLoading = false
              this.$refs.addSingleKarshnasiModal.close()
              this.$refs.table.getAllKarshnasiList()
            })
            .catch(error => {
              this.addSingleKarshnasiLoading = false
            })
        }
      })
    },
    closeSingleKarshnasiModal() {
      this.$refs.addSingleKarshnasiModal.close()
    },

    //emit from child
    handlerEditSingleKarshnasi(singleEditkarshnasiInformation) {
      this.assignSinglekarshnasiEditing(singleEditkarshnasiInformation)
    },
    assignSinglekarshnasiEditing(singleRowParam) {
      this.karshnasiSingleInformation = {
        travelId: singleRowParam.travelId,
        cityId: singleRowParam.cityId,
        tarefeScore: singleRowParam.tarefeScore,
        tarefeDesc: singleRowParam.tarefeDesc,
        kasrFeranshizScore: singleRowParam.kasrFeranshizScore,
        kasrFeranshizDesc: singleRowParam.kasrFeranshizDesc,
        karshenasiDaroScore: singleRowParam.karshenasiDaroScore,
        karshenasiDaroDesc: singleRowParam.karshenasiDaroDesc,
        yaraneSalamatScore: singleRowParam.yaraneSalamatScore,
        yaraneSalamatDesc: singleRowParam.yaraneSalamatDesc,
        kheyrieScore: singleRowParam.kheyrieScore,
        kheyrieDesc: singleRowParam.kheyrieDesc,
        mahalBimsarestanKhososi: singleRowParam.mahalBimsarestanKhososi,
        mahalBimarestaDolati: singleRowParam.mahalBimarestaDolati,
        mahalDandanPezeshk: singleRowParam.mahalDandanPezeshk,
        mahalEynak: singleRowParam.mahalEynak,
        mahalDaroKhas: singleRowParam.mahalDaroKhas,
        mahalDaroOmomi: singleRowParam.mahalDaroOmomi,
        mahalTasvirType: singleRowParam.mahalTasvirType,
        mahalAzmayeshgah: singleRowParam.mahalAzmayeshgah,
        mahalJarahi: singleRowParam.mahalJarahi,
        mahalDesc: singleRowParam.mahalDesc,
        karshenasBimarestanKhososi: singleRowParam.karshenasBimarestanKhososi,
        karshenasBimarestanDolati: singleRowParam.karshenasBimarestanDolati,
        karshenadDandanPezeshk: singleRowParam.karshenadDandanPezeshk,
        karshenadEyak: singleRowParam.karshenadEyak,
        karshenadDariKhas: singleRowParam.karshenadDariKhas,
        karshenasDaroOmomi: singleRowParam.karshenasDaroOmomi,
        karshenasTasvirType: singleRowParam.karshenasTasvirType,
        karshenasMahalAzmayesh: singleRowParam.karshenasMahalAzmayesh,
        karshenasJarahi: singleRowParam.karshenasJarahi,
        karshenasDesc: singleRowParam.karshenasDesc
      }
      this.$refs.addSingleArchiveModal.show()
    },
    updateSinglekarshnasi() {
      this.$store.dispatch('Karshenasi/updateSingleKarshnasi', this.karshnasiSingleInformation)
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
