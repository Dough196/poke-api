import { ref } from 'vue'
import api from '@/services/api'

const user = ref(null)

export default () => {
  const checkAuth = async () => {
    if (user.value) {
      return true
    }

    try {
      let { data } = await api.get('/user/profile')

      // if user is returned, it means that the cookie is valid,
      //  and we are logged in
      if (data) {
        // set the user for later use
        user.value = data
        return true
      }
    } catch (err) {
      console.log(err)
    }

    // if we get here, it means we are not logged in
    user.value = null
    return false
  }

  return {
    user,
    checkAuth
  }
}
