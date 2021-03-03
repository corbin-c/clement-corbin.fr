<template>
  <section>
    <form v-on:submit="submit" novalidate autocomplete="off" :class="submited">
      <h3>{{ title }}</h3>
      <p><slot></slot></p>
      <label id="name" :class="getLabelClasses('name')">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          v-model="name"
          required>
        <span :class="getSpanClasses('name')">Your name is required</span>
      </label>
      <label id="firstname" :class="getLabelClasses('name')">
        <input
          type="text"
          name="firstname"
          tabindex="-1"
          placeholder="Your first name"
          v-model="firstname">
      </label>
      <label id="email" :class="getLabelClasses('email')">
        <input
          name="email"
          type="email"
          v-model="email"
          v-on:change="validateEmail"
          value=""
          placeholder="your.address@email.com"
          required>
        <span :class="getSpanClasses('email')">Your email is required</span>
      </label>
      <label id="message" :class="getLabelClasses('message')">
        <textarea
          v-model="message"
          name="message"
          rows="5"
          placeholder="How can I help you?"
          required>
        </textarea>
        <span :class="getSpanClasses('message')">A message is required</span>
      </label>
      <button type="submit" id="submitbutton">Send
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 350 350" xml:space="preserve">
        <g id="icon" transform="translate(0 -1.9444444444444287) scale(3.89 3.89)" >
          <path d="M 89.981 6.2 C 90 6.057 90.001 5.915 89.979 5.775 c -0.003 -0.021 -0.001 -0.041 -0.005 -0.062 c -0.033 -0.163 -0.098 -0.317 -0.183 -0.462 c -0.009 -0.016 -0.01 -0.033 -0.019 -0.049 c -0.015 -0.024 -0.039 -0.036 -0.055 -0.059 c -0.034 -0.048 -0.06 -0.102 -0.101 -0.146 c -0.051 -0.056 -0.113 -0.097 -0.17 -0.144 c -0.031 -0.025 -0.058 -0.054 -0.09 -0.076 c -0.134 -0.093 -0.28 -0.164 -0.436 -0.209 c -0.028 -0.008 -0.056 -0.009 -0.084 -0.015 c -0.132 -0.03 -0.267 -0.041 -0.404 -0.034 c -0.046 0.002 -0.089 0.006 -0.135 0.012 c -0.039 0.006 -0.079 0.002 -0.118 0.01 l -87 19.456 c -0.611 0.137 -1.073 0.639 -1.159 1.259 c -0.085 0.62 0.224 1.229 0.775 1.525 l 23.523 12.661 l 7.327 23.36 c 0.008 0.025 0.025 0.043 0.034 0.067 c 0.021 0.056 0.052 0.106 0.08 0.16 c 0.059 0.114 0.127 0.218 0.211 0.312 c 0.022 0.025 0.03 0.057 0.054 0.08 c 0.022 0.021 0.05 0.028 0.073 0.048 c 0.099 0.086 0.207 0.155 0.325 0.213 c 0.047 0.023 0.088 0.053 0.136 0.07 c 0.164 0.061 0.336 0.1 0.517 0.1 c 0.011 0 0.022 0 0.033 0 c 0.179 -0.004 0.349 -0.044 0.509 -0.107 c 0.041 -0.016 0.075 -0.044 0.114 -0.063 c 0.127 -0.063 0.244 -0.139 0.349 -0.235 c 0.02 -0.018 0.046 -0.024 0.065 -0.044 l 12.009 -12.209 l 23.18 12.477 c 0.221 0.119 0.466 0.18 0.711 0.18 c 0.188 0 0.378 -0.035 0.557 -0.107 c 0.412 -0.164 0.73 -0.504 0.869 -0.926 L 89.93 6.473 c 0.014 -0.044 0.015 -0.09 0.025 -0.135 C 89.966 6.292 89.975 6.247 89.981 6.2 z M 77.435 10.018 L 25.58 36.717 L 5.758 26.047 L 77.435 10.018 z M 74.32 14.997 L 36.813 43.768 c -0.003 0.002 -0.005 0.006 -0.007 0.008 c -0.112 0.087 -0.209 0.194 -0.294 0.314 c -0.018 0.025 -0.035 0.05 -0.051 0.076 c -0.017 0.028 -0.039 0.052 -0.055 0.081 c -0.054 0.1 -0.093 0.204 -0.122 0.309 c -0.001 0.005 -0.005 0.009 -0.006 0.014 L 32.96 56.977 l -5.586 -17.809 L 74.32 14.997 z M 35.992 57.249 l 2.693 -10.072 l 4.717 2.539 L 35.992 57.249 z M 69.177 60.184 L 40.479 44.737 l 45.09 -34.588 L 69.177 60.184 z"
          stroke="none"
          fill="black"
          stroke-linecap="round" />
        </g>
        </svg>
      </button>
    </form>
    <p class="thankyou" :class="submited">Thanks for contacting me! I'll get back to you soon!</p>
  </section>
</template>
<style scoped src="../assets/mail-form.css"></style>
<script>
export default {
  data: function() {
    return {
      endpoint: "https://script.google.com/macros/s/AKfycby-beOx8UxlMkBEfK-eIejqFUILUCsruACfrZl9K0NQBT-giC9C/exec",
      name:"",
      firstname:"",
      email:"",
      message:"",
      testing: true,
      validEmail: true,
      freshError: false,
      isSuccess: false,
      validity: {
        name: true,
        email: true,
        message: true
      }
    }
  },
  computed: {
    submited() {
      return this.isSuccess ? "success":"";
    },
  },
  mounted: function() {
  },
  methods: {
    wait(t) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        },t);
      });
    },
    getSpanClasses(element) {
      return (this.validity[element]) ? "":"shown";
    },
    getLabelClasses(element) {
      return (this.validity[element] || !this.freshError) ? "":"error";
    },
    success() {
      //we hide the form & show a thank you message
      this.isSuccess = true;
    },
    async submit(e) {
      e.preventDefault();
      if (this.verifyForm()) {
        if (this.testing) {
          this.success();
        } else {
          let formData = new FormData();
          let data = {
            name: this.name,
            message: this.message,
            email: this.email,
            firstname: this.firstname,
            formGoogleSheetName: "responses",
            formDataNameOrder: JSON.stringify(["name","message","email"])
          };
          Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
          });
          let response = await fetch(this.endpoint, { method: "POST", body: formData });
          response = await response.json();
          this.success(response);
        }
      }
      await this.wait(300);
      this.freshError = false;
    },
    verifyForm() {
      let success = true;
      this.freshError = true;
      let elements = [
        {input:"email",test: (value) => (!this.invalidEmail && /\S+/.test(value))},
        {input:"name", test:(value) => /\S+/.test(value)},
        {input:"message", test:(value) => /\S+/.test(value)},
      ];
      elements.forEach(element => {
        if (!this.verifyInput(element.input,element.test)) {
          success = false;
        }
      }); 
      return success;
    },
    verifyInput(element,test) {
      let success = test(this[element]);
      this.validity[element] = success;
      return success;
    },
    validateEmail(e) {
      this.invalidEmail = e.target.validity.typeMismatch;
    }
  },
  props: ["title"]
}
</script>
