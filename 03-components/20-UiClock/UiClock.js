import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

function formatAsLocalDate() {
  return new Date().toLocaleString(
      navigator.language, { timeStyle: 'medium' }
  )
}

export default defineComponent({
  name: 'UiClock',

  setup() {

    const printDate = ref(formatAsLocalDate())

    let intervalId
    
    onMounted(() => {
      intervalId = setInterval(() => {
        printDate.value = formatAsLocalDate()
      }, 1000)
    })

    onUnmounted(() => clearInterval(intervalId))

    return {
      printDate,
    }
  },

  template: `<div class="clock">{{ printDate }}</div>`,
})
