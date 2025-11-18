<script setup lang="ts">
import {ref} from 'vue'
const email = ref('')
const username = ref('')
const password = ref('')
const feedback = ref({
  error: '',
  success: '',
  attempt: ''
})

const registrationUrl = 'http://localhost:9090/register'

const createAccount = async () => {
  showMessage('error', '')
  showMessage('success', '')
  showMessage('attempt', 'Attempting to register...')
  try {
    await registerRequest(email.value, username.value, password.value)
    showMessage('attempt', '', 0)
    showMessage('success', 'Account created successfully! Redirecting to login...', 1500)
    setTimeout(() => redirect(), 2000)
  } catch (err) {
    showMessage('attempt', '', 0)
    showMessage('error', (err as Error).message)
  }

  function redirect() {
    window.location.href="/login"
  }

  function showMessage(type: 'error' | 'success' | 'attempt', message: string, duration = 1500) {
    feedback.value[type] = message
    if (duration > 0) {
      setTimeout(() => {
        feedback.value[type] = ''
      }, duration)
    }
  }

  async function registerRequest(email: string, username: string, password: string) {
    if(email === null || username === null || username === '') {
      throw new Error('One or more fields are empty')
    }
    const response = await fetch(registrationUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    })

    let data: any = {}
    try {
      const text = await response.text()
      if (text) data = JSON.parse(text)
    } catch (_) {
      data = {}
    }

    if (!response.ok) {
      throw new Error(data.error || 'Unable to create account')
    }

    return data
  }
}

</script>

<template>
  <div class="container">
    <div class="main-container">
      <h1>Sign Up</h1>

      <div class="account-input-container">
        <div id="input">
          <p>Account Email</p>
          <input type="email" placeholder="Email" v-model="email" required />
        </div>
        <div id="input">
          <p>Account Username</p>
          <input type="string" placeholder="Username" v-model="username" required />
        </div>
        <div id="input">
          <p>Account Password</p>
          <input type="password" placeholder="Password" v-model="password" required />
        </div>

        <div v-if="feedback.attempt" id="attempt-div">{{ feedback.attempt }}</div>
        <div v-if="feedback.error" id="error-div">{{ feedback.error }}</div>
        <div v-if="feedback.success" id="success-div">{{ feedback.success }}</div>
      </div>

      <div class="register-or-login-redirect">
        <button id="submit" @click="createAccount">Sign Up</button>
        <div id="existing-account-container">
          <p>Already have an account?</p>
          <a href="/login">Sign in</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
p, a {
  font-size: clamp(12pt, 2vw, 14pt);
}

.main-container {
  margin: 3rem auto;
  padding: 3rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  background-color: #d3d3d3;
  max-width: 25rem;
  border-radius: 20px;
}

.main-container h1 {
  margin: 0 auto;
  padding: 2rem;
  font-size: clamp(36px, 2vw, 48px);
  background-color: #333333;
}

.main-container .register-or-login-redirect {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.register-or-login-redirect #existing-account-container {
  display: flex;
  flex-direction: column;
}

.register-or-login-redirect #submit {
  margin: 0 auto;
  padding: 1rem;
  font-size: clamp(12pt, 2vw, 14pt);
  border: solid 3px #ffffff;
  border-radius: 20px;
  color: #ffffff;
  background-color: #00990075;
  transition: background-color 0.1s ease-out;
}

.register-or-login-redirect #submit:hover {
  cursor: pointer;
  background-color: #9acd32;
  transition: background-color 0.1s ease-in;
}

#existing-account-container p, a {
  margin: 0 auto;
  color: #008000;
}

#existing-account-container a {
  text-decoration: none;
}

#existing-account-container a:hover {
  color: #ffffff;
}

.account-input-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem;
  background-color: #00990075;
  border: 5px solid #ffffff;
  border-radius: 10px;
  gap: 1rem;
  height: 23rem;
}

.account-input-container #input {
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
}

.account-input-container #input p, input {
  margin: 0 auto;
  padding: 0.5rem;
}

#input input {
  width: 200px;
}

#error-div, #success-div, #attempt-div {
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
}

#attempt-div {
  color: #ffff00;
  background-color: #777700;
}

#error-div {
  color: #ff0000;
  background-color: #770000;
}

#success-div {
  color: #00ff00;
  background-color: #007700;
}
</style>