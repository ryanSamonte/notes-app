<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!isMenuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Notes App</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="isMenuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>NAVIGATION</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>add</md-icon>
            <span class="md-list-item-text">New Note</span>
          </md-list-item>

          <md-list-item v-on:click="goToRouteHandler('/notes/all')">
            <md-icon>all_inbox</md-icon>
            <span class="md-list-item-text">All Notes</span>
          </md-list-item>

          <md-list-item v-on:click="goToRouteHandler('/notes/completed')">
            <md-icon>done</md-icon>
            <span class="md-list-item-text">Completed</span>
          </md-list-item>

          <md-list-item v-on:click="goToRouteHandler('/notes/pending')">
            <md-icon>clear</md-icon>
            <span class="md-list-item-text">Pending</span>
          </md-list-item>

          <md-list-item v-on:click="toggleConfirmLogout">
            <md-icon>exit_to_app</md-icon>
            <span class="md-list-item-text">Sign-out</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>

    <md-dialog-confirm
      :md-active.sync="isConfirmLogoutActive"
      md-title="Are you sure you want to sign-out?"
      md-content=""
      md-confirm-text="Yes"
      md-cancel-text="Cancel"
      @md-confirm="onConfirmLogoutHandler" />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {
      isMenuVisible: false,
      isConfirmLogoutActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    goToRouteHandler(path) {
      if (this.$route.path !== path) this.$router.push(path)
    },
    toggleConfirmLogout() {
      this.isConfirmLogoutActive = true;
    },
    onConfirmLogoutHandler() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/sign-in");
        });
    },
  },
};
</script>

<style scoped>
.md-app {
  height: 100vh;
}

.md-toolbar.md-theme-default.md-primary {
  background-color: #032140;
}

.md-toolbar.md-theme-default.md-transparent {
  color: #ffffff;
}

.md-toolbar.md-theme-default.md-transparent .md-icon {
  color: #ffffff;
}

.md-content.md-theme-default {
  background-color: #073a6e;
}

.md-drawer.md-theme-default {
  width: 230px;
  max-width: calc(100vw - 125px);
  background-color: #032140;
}

.md-list.md-theme-default {
  background-color: #032140;
}

.md-app-scroller {
  background-color: #032140;
}

.md-icon.md-theme-default.md-icon-font {
  color: #fff;
}

.md-list-item-text {
  color: #fff;
}
</style>
