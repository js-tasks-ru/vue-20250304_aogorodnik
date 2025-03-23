import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {

    const counter = ref(0)
    const step = 1

    function changeCounter(value) {
      counter.value += value
    }

    function isMinAchived() {
      return counter.value <= 0
    }

    function isMaxAchived() {
      return counter.value >= 5
    }
  
    return {
      counter,
      step,
      changeCounter,
      isMinAchived,
      isMaxAchived
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="isMinAchived()"
        @click="changeCounter(-step)"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="isMaxAchived()"
        @click="changeCounter(step)"
      >➕</button>
    </div>
  `,
})
