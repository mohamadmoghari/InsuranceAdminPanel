<template>
  <div>
    <transition name="popup">
      <div
        v-if="isVisible"
        :id="id"
        class="modal"
        role="dialog"
        :class="[{ 'is-loading': loading }, 'variant-' + color]"
        @click.self="close('backdrop')"
      >
        <div
          class="modal-dialog"
          :class="['modal-' + size]"
          :style="{ width: size }"
        >
          <div class="modal-content">
            <section v-if="header">
              <header
                v-if="$slots['modal-header'] || icon || title"
                class="modal-header"
              >
                <span
                  v-if="closeBtn"
                  role="button"
                  aria-label="Close"
                  class="md-close"
                  @click="close()"
                >
                  <i aria-hidden="true" class="fa fa-times"/>
                </span>

                <slot name="modal-header">
                  <i v-if="icon" class="modal-header-icon" :class="icon"/>
                  <p v-if="title" class="mb-0 modal-header-title">{{ title }}</p>
                </slot>
                <!--</div>-->
              </header>
            </section>
            <div class="modal-body">
              <loader :loading="loading">
                <slot/>
              </loader>
            </div>
            <footer
              v-if="footer"
              class="modal-footer pt-20 pb-20 text-center"
              :classes="{ 'text-left': !simple, 'text-center': simple }"
            >
              <slot name="modal-footer">
                <template v-if="simple">
                  <button
                    class="btn"
                    :class="['btn-' + color]"
                    @click.prevent="close"
                  >
                    {{ simpleText }}
                  </button>
                </template>
                <template v-else>
                  <button
                    v-if="canSkip"
                    class="btn btn-default"
                    @click.prevent="close"
                  >
                    {{ backText }}
                  </button>
                  <button
                    v-focus="nextFocus"
                    class="btn"
                    :class="'btn-' + (color == 'default' ? 'primary' : color)"
                    :disabled="loading"
                    @click.prevent="next"
                  >
                    {{ nextText }}
                  </button>
                </template>
              </slot>
            </footer>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="isVisible" class="modal-backdrop"/>
    </transition>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: {
    color: {default: 'default', type: String},
    title: {default: false},
    icon: {default: false},
    id: {},
    size: {default: 'md'},
    simple: {default: true},
    simpleText: {default: 'بستن'},
    backText: {default: 'بستن'},
    nextText: {default: 'تایید و ادامه'},
    nextClass: {default: 'btn-primary'},
    nextFocus: {type: Boolean, default: false},
    canSkip: {type: Boolean, default: true},
    header: {type: Boolean, default: true},
    footer: {type: Boolean, default: true},
    closeBtn: {type: Boolean, default: false},
    hasValidate: {type: Boolean, default: undefined},
    visible: {default: false},
    appendToBody: {type: Boolean, default: false}
  },
  data() {
    return {
      loading: false,
      isVisible: false
    }
  },
  computed: {},
  watch: {
    isVisible(val) {
      //let html = document.querySelector('html');
      //let body = document.querySelector('body');
      //html.style.overflow = val ? 'hidden':'';
      //body.style.overflow = val ? 'hidden':'';
      if (!val) this.$emit('update:visible', !!val)
      this.$nextTick(() => {
        if (this.appendToBody) {
          try {
            document.body.appendChild(this.$el)
          } catch (er) {
            // eslint-disable-next-line
            console.warn(`Cannot append to body!`)
          }
        }
      })
    },
    visible: {
      immediate: true,
      handler(val) {
        this.isVisible = !!val
      }
    }
  },
  created() {
    if (window.modal === undefined) window.modal = {}
    window.modal[this.id] = this
  },
  mounted() {
  },
  methods: {
    show() {
      this.isVisible = true
      this.$emit('show', this)
    },
    close(frm) {
      if (frm === 'backdrop' && (this.loading || !this.canSkip)) {
        return
      }
      this.isVisible = false
      this.$emit('close', this)
    },
    next() {
      this.$emit('next', this)
    },
    toggle() {
      this[this.isVisible ? 'close' : 'show']()
    }
  }
}
</script>
