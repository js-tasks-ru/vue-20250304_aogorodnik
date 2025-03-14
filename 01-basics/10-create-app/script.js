import { defineComponent, createApp } from 'vue'

const App = defineComponent({
    name: 'App',

    template: `
        Сегодня {{ new Date().toLocaleDateString() }}
    `
})

const app = createApp(App)

const vm = app.mount('#app')

window.vm = vm