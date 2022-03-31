<template>
  <aside id="sidebar" ref="sidebar" v-bar="vbOptions" class="vb-on-left">
    <div ref="content" class="sidebar-content">
      <section>
        <nav class="navigation">
          <ul class="c-scroll custom-navbar">
            <!--            document-->
            <li class="classes">
              <router-link
                to="/doc_register"
                exact-active-class="active"
                active-class="active"
              >
                <i class="far fa-file-word"/>
                <span>سند</span>
              </router-link>
            </li>
            <!--            travel-->
            <li class="classes">
              <router-link
                to="/travel"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-plane"/>
                <span>سفر</span>
              </router-link>
            </li>

            <!--            travel-->
            <li class="classes">
              <router-link
                to="/hospital_payment"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-procedures"/>
                <span>پرونده های بیمارستانی</span>
              </router-link>
            </li>

            <!--            payment validation-->
            <li class="classes">
              <router-link
                to="/payment_validation"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-money-bill-wave"/>
                <span>صحت سنجی</span>
              </router-link>
            </li>
            <!--            Archive-->
            <li class="classes">
              <router-link
                to="/archive"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-file-archive"/>
                <span>بایگانی</span>
              </router-link>
            </li>
            <!-- technical_performance-->
            <li class="classes">
              <router-link
                to="/technical_performance"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-cog"/>
                <span>عملکرد فنی</span>
              </router-link>
            </li>

            <!-- Paraclinic -->
            <li class="classes">
              <router-link
                to="/paraclinic"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-hospital-user"/>
                <span>پاراکلینیک</span>
              </router-link>
            </li>

            <!-- Meeting -->
            <li class="classes">
              <router-link
                to="/meeting"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-hospital-user"/>
                <span>جلسات برگزار شده</span>
              </router-link>
            </li>

            <!-- Car Insurance -->
            <li class="classes">
              <router-link
                to="/car"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-car"/>
                <span>بیمه خودرو</span>
              </router-link>
            </li>

            <!-- Life Insurance -->
            <li class="classes">
              <router-link
                to="/life"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-car"/>
                <span>بیمه عمر</span>
              </router-link>
            </li>

            <!-- Insurance -->
            <li class="classes">
              <router-link
                to="/bimeShode"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-hospital-user"/>
                <span>بیمه شده</span>
              </router-link>
            </li>

            <!-- Insurance Report -->
            <li class="classes">
              <router-link
                to="/report_insurance"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fas fa-hospital-user"/>
                <span>گزارش بیمه شده</span>
              </router-link>
            </li>

            <!-- Introduction Hospital -->
            <li class="classes">
              <router-link
                to="/introduction-hospital"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>معرفی بیمارستان</span>
              </router-link>
            </li>

            <!-- Karshenasi Asnad -->
            <li class="classes">
              <router-link
                to="/karshenasi_asnad"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>کارشناسی اسناد</span>
              </router-link>
            </li>

            <!-- KhesaratVariz -->
            <li class="classes">
              <router-link
                to="/Khesarat_variz"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>خسارت واریز</span>
              </router-link>
            </li>
            <!-- Paraclinik Morefi -->
            <li class="classes">
              <router-link
                to="/paraclinic_morefi"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>معرفی پاراکلینیک</span>
              </router-link>
            </li>

            <!-- natayejeNazarsanji -->
            <li class="classes">
              <router-link
                to="/natayeje_nazarsanji"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>نتایح نظرسنجی</span>
              </router-link>
            </li>

            <!-- parvandePardekhteParaclinic -->
            <li class="classes">
              <router-link
                to="/parvande_pardekhte_paraclinic"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>پرونده پرداخت پاراکلینیک</span>
              </router-link>
            </li>

            <!-- PardakhtSanad -->
            <li class="classes">
              <router-link
                to="/pardakht_sanad"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>پرداخت سند</span>
              </router-link>
            </li>

            <!-- raftar -->
            <li class="classes">
              <router-link
                to="/raftar"
                exact-active-class="active"
                active-class="active"
              >
                <i class="fab fa-sketch"/>
                <span>رفتار</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sticky: false,
      vbOptions: {
        overrideFloatingScrollbar: true,
        preventParentScroll: true,
        scrollThrottle: 30
      },
      menu: {
        items: [],
        options: {}
      }
    }
  },
  watch: {},
  updated() {

  },
  mounted() {

  },
  methods: {}
}
</script>

<style lang="scss">
.custom-navbar {
  height: 365px;
  overflow: scroll;
  overflow-x: unset;
}
</style>
