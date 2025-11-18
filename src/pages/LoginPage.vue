<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from "@/stores/authStore";

const email = ref('')
const password = ref('')
const isActive = ref(false)

const feedback = ref({
  error: '',
  success: '',
  attempt: ''
})

const authStore = useAuthStore()

const submitLogin = async () => {
  showMessage('error', '')
  showMessage('success', '')
  showMessage('attempt', 'Attempting to login...')

  try {
    if (!email.value || !password.value) {
      throw new Error('Missing email or password')
    }
    isActive.value = true
    await authStore.loginRequest(email.value, password.value)
    showMessage('success', 'Success! Redirecting...', 1500)
    showMessage('attempt', '', 0) // clear attempt immediately

    //redirect()
    setTimeout(() => redirect(), 2000)
  } catch (err) {
    showMessage('attempt', '', 0)
    showMessage('error', (err as Error).message, 3000)

  } finally {
    isActive.value = false
  }

  function redirect() {
    window.location.href = '/'
  }

  function showMessage(type: 'error' | 'success' | 'attempt', message: string, duration = 1500) {
    feedback.value[type] = message
    if (duration > 0) {
      setTimeout(() => {
        feedback.value[type] = ''
      }, duration)
    }
  }
}
</script>

<template>

  <div id="container">
    <div class="main">
      <a id="header-img" href="/"><img src="/celtic-knot.png" alt="Click to return home"></a>
      <h1>Sign In</h1>

      <div class="sub">
        <div class="sub-field">
          <p>Email</p>
          <input type="text" id="email-input" name="email" placeholder="Email Address" v-model="email" required />
        </div>
        <div class="sub-field">
          <p>Password</p>
          <input type="password" id="password-input" name="password" placeholder="Password" v-model="password" required />
        </div>
        <div id="sub-options">
          <a href="#">Forgot Password?</a>
          <button id="submit-button" @click="submitLogin" :disabled="isActive">Submit</button>
        </div>
        <div id="box">
          <div id="feedback-type">
            <div v-if="feedback.attempt" id="attempt">
              {{ feedback.attempt }}
            </div>
            <div v-if="feedback.error" id="error">
              {{ feedback.error }}
            </div>
            <div v-if="feedback.success" id="success">
              {{ feedback.success }}
            </div>
          </div>
        </div>
      </div>

      <div class="low">
        <p>Don't have an account yet?</p>
        <a href="/register" id="to-account-create">Sign up!</a>
      </div>

    </div>

  </div>

</template>

<style scoped>

p, h1, a {
  color: #008000;
  font-size: clamp(12pt, 2vw, 14pt);
}

#header-img {
  text-decoration: none;
  margin: 0 auto;
  width: auto;
  display: block;
}

#header-img img {
  width: 128px;
  height: 128px;
  margin: 0 auto;
  animation-name: spin;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

#header-img img:hover {
  filter: opacity(0.5) drop-shadow(0 0 0 #90ee90) saturate(1000%);
  transition: 0.2s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359.9deg);
  }
}

h1 {
  margin: 0 auto;
  padding-bottom: 2rem;
  font-weight: bold;
  font-size: 30pt;
}

.main {
  border-radius: 20px;
  margin: 3rem auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #d3d3d3;
  max-width: 25rem;
}

.sub {
  border-color: #9acd32;
  border-style: solid;
  border-width: 5px;
  border-radius: 20px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sub p {
  margin: 0 1rem;
}

.sub input {
  margin: 0 1rem;
}

.sub .sub-field {
  margin: 0;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.sub #sub-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sub input {
  width: 200px;
  padding: 0.5rem;
}

.sub a {
  transition: color 0.1s ease-out;
}

.sub a:hover {
  color: #ffffff;
  transition: color 0.1s ease-in;
}

#submit-button {
  border: solid 1px #ffffff;
  border-radius: 5px;
  padding: 0.5rem;
  color: #ffffff;
  font-weight: bold;
  background-color: #008000;
  font-size: clamp(12pt, 2vw, 14pt);
  transition: background-color 0.1s ease-out;
}

#submit-button:hover {
  cursor: pointer;
  color: #ffffff;
  background-color: #9acd32;
}

.low {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.low p {
  margin: 0 auto;
}

.low a {
  margin: 0 auto;
  color: #008000;
  text-decoration: none;
}

.low a:hover {
  color: #ffffff;
}

#box {
  position: relative;
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  justify-content: center;
}

#feedback-type {
  position: absolute;
  display: inline-flex;
  justify-content: center;
  margin: 0 auto;
  z-index: 1;
  top: -1rem
}

#attempt, #success, #error {
  border-radius: 10px;
  padding: 5px;
  top: 0;
  left: 0;
}

#attempt {
  color: #ffff00;
  background-color: #777700;
}

#success {
  color: #00ff00;
  background-color: #007700;
}

#error {
  color: #ff0000;
  background-color: #770000;
}

</style>