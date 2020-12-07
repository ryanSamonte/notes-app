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
                        'md-invalid': isSubmitted && $v.user.email.$error,
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
                        'md-invalid': isSubmitted && $v.user.password.$error,
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
                          isSubmitted && $v.user.confirmPassword.$error,
                      }"
                    >
                      <label for="confirmPassword">Confirm Password</label>
                      <md-input
                        v-model="user.confirmPassword"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                      />

                      <span
                        v-if="!$v.user.confirmPassword.required"
                        class="md-error"
                        >Password is required</span
                      >
                      <span
                        v-if="!$v.user.confirmPassword.sameAsPassword"
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
                  :disabled="isLoading"
                >
                  Sign-Up</md-button
                >
              </md-card-actions>

              <p>
                Already have an account?
                <router-link to="/sign-in">Login</router-link>
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
        confirmPassword: "",
      },
      isSubmitted: false,
      isLoading: false,
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
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    submitHandler() {
      this.isSubmitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.isLoading = true;

        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(
            () => {
              this.isLoading = false;

              this.$router.push("/notes/all");
            },
            (err) => {
              this.isLoading = false;

              this.$toasted.error(err.message, {
                position: "bottom-right",
                duration: 5000,
              });
            }
          );
      }
    },
  },
};
</script>
