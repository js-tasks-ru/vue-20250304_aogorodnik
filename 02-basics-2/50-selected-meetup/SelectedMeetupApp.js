import { defineComponent, ref, computed, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {

    const position = ref(1)

    const meetup = ref(null)
    
    function isMinAchieved() {
      return position.value <= 1
    }

    function isMaxAchieved() {
      return position.value >= 5
    }

    function changePositionByButton(increment) {
      position.value += increment
    }

    watch(position, async () => {
       meetup.value = await getMeetup(position.value)
    }, { immediate: true})

    return {
      position,
      meetup,
      isMinAchieved,
      isMaxAchieved,
      changePositionByButton,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="isMinAchieved()" @click="changePositionByButton(-1)">Предыдущий</button>

        <div class="radio-group" role="radiogroup">

          <div v-for="pos in 5" class="radio-group__button">
            <input
              :id="'meetup-id-' + pos"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="pos"
              v-model="position"
            />
            <label :for="'meetup-id-' + pos" class="radio-group__label">{{ pos }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="isMaxAchieved()" @click="changePositionByButton(1)">Следующий</button>
      </div>

      <div v-if="meetup !== null" class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
