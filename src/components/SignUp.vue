<template>
  <div>
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"
      ></div>
      <div
        class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 mt-1"
      >
        <div class="p-4">
          <form @submit.prevent="submitHandler">
            <md-card class="p-4">
              <md-card-header>
                <h2>Notes App- Create your Account</h2>
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

                  <div class="md-layout-item md-small-size-100">
                    <md-field
                      :class="{
                        'md-invalid':
                          submitted && $v.user.confirm_password.$error,
                      }"
                    >
                      <label for="confirm_password">Confirm Password</label>
                      <md-input
                        v-model="user.confirm_password"
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                      />

                      <span
                        v-if="!$v.user.confirm_password.required"
                        class="md-error"
                        >Password is required</span
                      >
                      <span
                        v-if="!$v.user.confirm_password.sameAsPassword"
                        class="md-error"
                        >Password must match</span
                      >
                    </md-field>
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button
                  type="submit"
                  class="md-dense md-raised md-primary m-auto"
                  >Sign-Up</md-button
                >
              </md-card-actions>

              <p>
                Already have an account? <router-link to="/sign-in">Login</router-link>
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
import { required, email, sameAs } from "vuelidate/lib/validators";
import firebase from "firebase";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirm_password: "",
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
      confirm_password: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    submitHandler() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(
            () => {
              this.$router.push("/");
            },
            (err) => {
              this.$toasted.error(err.message, { duration: 5000 });
            }
          );
      }
    }
  }
};
</script>
