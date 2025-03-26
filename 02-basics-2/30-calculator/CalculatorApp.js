import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0)
    const secondOperand = ref(0)
    const calResult = computed(() => {
      let res = "undefined"
      switch (picked.value) {
        case "sum" : res = firstOperand.value + secondOperand.value
          break
        case "subtract" : res = firstOperand.value - secondOperand.value
          break
        case "multiply" : res = firstOperand.value * secondOperand.value
          break
        case "divide" : res = firstOperand.value / secondOperand.value
          break
      }
      return res
    })

    const picked = ref('sum')

    return {
      firstOperand,
      secondOperand,
      calResult,
      picked
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="picked"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="picked"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="picked"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="picked"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{ calResult }}</output>
    </div>
  `,
})
