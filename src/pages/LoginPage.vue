<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from "@/stores/authStore";

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

const authenticateUrl = 'http://localhost:9090/authenticate'

const submitLogin = async () => {
  isLoading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await fetch(authenticateUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email.value, password: password.value}),
    })

    if (!response.ok) {
      throw new Error('Login failed.');
    }

    const data = await response.json();
    const token = data.token;

    authStore.login(token)

    success.value = 'Login successful!'

    redirect()
  } catch (error) {
    error.value = (error as Error).message;
  } finally {
    isLoading.value = false;
  }

  function redirect() {
    window.location.href = '/'
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
          <input type="text" id="email-input" name="email" placeholder="Email Address" v-model="email"/>
        </div>
        <div class="sub-field">
          <p>Password</p>
          <input type="password" id="password-input" name="password" placeholder="Password" v-model="password"/>
        </div>
        <div id="sub-options">
          <a href="#">Forgot Password?</a>
          <button id="submit-button" @click="submitLogin" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Submit' }}
          </button>
        </div>
        <div v-if="error" style="color:red; margin-top: 10px;">
          {{ error }}
        </div>
        <div v-if="success" style="color:green; margin-top: 10px;">
          {{ success }}
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
  border-radius: 5px;
  margin: 3rem auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #d3d3d3;
  max-width: 800px;
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
  justify-content: space-around;
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

</style>