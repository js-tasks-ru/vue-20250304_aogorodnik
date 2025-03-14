import { defineComponent, createApp } from 'vue'

function formatAsLocalDate() {
    return new Date().toLocaleString(
        navigator.language, { dateStyle: 'long' }
    )
}

const App = defineComponent({
    name: 'App',

    setup() {
        return {
            formatAsLocalDate
        }
    },

    template: `
        Сегодня {{ formatAsLocalDate() }}
    `
})

const app = createApp(App)

const vm = app.mount('#app')

window.vm = vm