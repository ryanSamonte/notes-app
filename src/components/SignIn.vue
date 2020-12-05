<template>
  <div>
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"
      ></div>
      <div
        class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 mt-5"
      >
        <div class="p-4">
          <form @submit.prevent="submitHandler">
            <md-card class="p-4">
              <md-card-header>
                <h1>Notes App</h1>
              </md-card-header>

              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field
                      :class="{
                        'md-invalid': submitted && $v.user.email.$error,
                      }"
                    >
                      <label for="email">Email</label>
                      <md-input v-model="user.email" name="email" id="email" />

                      <span v-if="!$v.user.email.required" class="md-error"
                        >Email is required</span
                      >
                      <span v-if="!$v.user.email.email" class="md-error"
                        >Email must be valid</span
                      >
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field
                      :class="{
                        'md-invalid': submitted && $v.user.password.$error,
                      }"
                    >
                      <label for="password">Password</label>
                      <md-input
                        v-model="user.password"
                        type="password"
                        name="password"
                        id="password"
                      />

                      <span v-if="!$v.user.password.required" class="md-error"
                        >Password is required</span
                      >
                    </md-field>
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button
                  type="submit"
                  class="md-dense md-raised md-primary m-auto"
                  >Sign-In</md-button
                >
              </md-card-actions>

              <p>
                Don't have an account yet?
                <router-link to="/signup">Create your Account Now</router-link>
              </p>
            </md-card>
          </form>
        </div>
      </div>
      <div
        class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"
      ></div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "SignIn",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    submitHandler() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
    },
  },
};
</script>
