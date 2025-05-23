import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function changeCountBy(value) {
      emit('update:count', props.count + value)
    }

    function isMinAchieved() {
      return props.count <= props.min
    }

    function isMaxAchieved() {
      return props.max !== Infinity && props.count >= props.max
    }

    return {
      changeCountBy,
      isMinAchieved,
      isMaxAchieved,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="isMinAchieved()" @click="changeCountBy(-1)">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="isMaxAchieved()" @click="changeCountBy(1)">➕</UiButton>
    </div>
  `,
})
