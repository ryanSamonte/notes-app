<template>
    <div>
        <div class="md-layout md-alignment-center">
            <div class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"></div>
            <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 mt-1">
                <div class="p-4">
                    <form @submit.prevent="submitHandler">
                        <md-card class="p-4">
                            <md-card-header>
                                <h2>Notes App- Create your Account</h2>
                            </md-card-header>

                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-small-size-100">
                                        <md-field :class="{ 'md-invalid': submitted && $v.user.first_name.$error }">
                                            <label for="first_name">First Name</label>
                                            <md-input v-model="user.first_name" name="first_name" id="first_name" />
                                            
                                            <span v-if="!$v.user.first_name.required" class="md-error">First Name is required</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-small-size-100">
                                        <md-field :class="{ 'md-invalid': submitted && $v.user.last_name.$error }">
                                            <label for="last_name">Last Name</label>
                                            <md-input v-model="user.last_name" name="last_name" id="last_name" />
                                            
                                            <span v-if="!$v.user.last_name.required" class="md-error">Last Name is required</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-small-size-100">
                                        <md-field :class="{ 'md-invalid': submitted && $v.user.username.$error }">
                                            <label for="username">Username</label>
                                            <md-input v-model="user.username" name="username" id="username" />
                                            
                                            <span v-if="!$v.user.username.required" class="md-error">Username is required</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-small-size-100">
                                        <md-field :class="{ 'md-invalid': submitted && $v.user.password.$error }">
                                            <label for="password">Password</label>
                                            <md-input v-model="user.password" type="password" name="password" id="password" />
                                            
                                            <span v-if="!$v.user.password.required" class="md-error">Password is required</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-small-size-100">
                                        <md-field :class="{ 'md-invalid': submitted && $v.user.confirm_password.$error }">
                                            <label for="confirm_password">Confirm Password</label>
                                            <md-input v-model="user.confirm_password" type="password" name="confirm_password" id="confirm_password"/>

                                            <span v-if="!$v.user.confirm_password.required" class="md-error">Password is required</span>
                                            <span v-if="!$v.user.confirm_password.sameAsPassword" class="md-error">Password must match</span>
                                        </md-field>
                                    </div>
                                </div>
                            </md-card-content>

                            <md-card-actions>
                                <md-button type="submit" class="md-dense md-raised md-primary m-auto">Sign-Up</md-button>
                            </md-card-actions>

                            <p>Already have an account? <router-link to="/">Login</router-link></p>
                        </md-card>
                    </form>
                </div>
            </div>
            <div class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"></div>
        </div>
    </div>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'SignUp',
    data() {
        return {
            user: {
                first_name: "",
                last_name: "",
                username: "",
                password: "",
                confirm_password: ""
            },
            submitted: false
        }
    },
    validations: {
        user: {
            first_name: {
                required
            },
            last_name: {
                required
            },
            username: {
                required
            },
            password: {
                required
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
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
        }
    }
};
</script>