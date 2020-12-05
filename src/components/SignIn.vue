<template>
    <div>
        <div class="md-layout md-alignment-center">
            <div class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"></div>
            <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 mt-5">
                <div class="p-4">
                    <md-card class="p-4">
                        <md-card-header>
                            <h1>Notes App</h1>
                        </md-card-header>

                        <md-card-content>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="username">Username</label>
                                        <md-input name="username" id="username"/>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="password">Password</label>
                                        <md-input type="password" name="password" id="password"/>
                                    </md-field>
                                </div>
                            </div>
                        </md-card-content>

                        <md-card-actions>
                            <md-button class="md-dense md-raised md-primary m-auto">Sign-In</md-button>
                        </md-card-actions>

                        <p>Don't have an account yet? <a href="#">Create your Account Now</a></p>
                    </md-card>
                </div>
            </div>
            <div class="md-layout-item md-medium-size-33 md-small-size-0 md-xsmall-size-0"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignIn'
}
</script>