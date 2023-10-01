import { reactive } from 'vue'

// reactive state management
// store states to be managed accrossed different components here
export const store = reactive({
  token: "",
  user: {},
})