<script setup lang="ts">
import {ref} from 'vue'
const email = ref('')
const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const registrationUrl = 'http://localhost:9090/register'

const createAccount = async () => {
  error.value = ''
  success.value = ''
  try {
    const response = await fetch(registrationUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email.value, username: username.value, password: password.value})
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    error.value = (error as Error).message
  } finally {
    success.value = 'Account created successfully.'
    redirect()
  }

  function redirect() {
    window.location.href="/login"
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
  padding: 2rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  background-color: #90ee90;
  max-width: 800px;
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
  background-color: #008000;
  transition: background-color 0.1s ease-out;
}

.register-or-login-redirect #submit:hover {
  cursor: pointer;
  background-color: #9acd32;
  transition: background-color 0.1s ease-in;
}

#existing-account-container p, a {
  margin: 0 auto;
}

#existing-account-container a {
  text-decoration: none;
  color: #008000;
}

#existing-account-container a:hover {
  color: #ffffff;
}

.account-input-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem;
  background-color: #90ee90;
  border: 5px solid #ffffff;
  border-radius: 10px;
  gap: 1rem;
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
</style>