<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button
          class="md-icon-button"
          v-on:click="toggleMenu"
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
            <md-button class="md-icon-button md-dense" v-on:click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item v-on:click="isNewNoteDialogVisible = true">
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
        <router-view />
      </md-app-content>
    </md-app>

    <md-dialog :md-active.sync="isNewNoteDialogVisible">
      <md-dialog-title>Create New Note</md-dialog-title>

      <form @submit.prevent="submitHandler" class="p-4">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field
              :class="{
                'md-invalid': isSubmitted && $v.note.title.$error,
              }"
            >
              <label for="title">Title</label>
              <md-input v-model="note.title" name="title" id="title" />

              <span v-if="!$v.note.title.required" class="md-error"
                >Title is required</span
              >
            </md-field>

            <md-field
              :class="{
                'md-invalid': isSubmitted && $v.note.content.$error,
              }"
            >
              <label for="content">Content</label>
              <md-textarea v-model="note.content" md-autogrow></md-textarea>

              <span v-if="!$v.note.content.required" class="md-error"
                >Content is required</span
              >
            </md-field>
          </div>
        </div>

        <md-dialog-actions>
          <md-button
            type="button"
            class="md-dense md-raised md-danger"
            v-on:click="isNewNoteDialogVisible = false"
            >Close</md-button
          >
          <md-button type="submit" class="md-dense md-raised md-primary"
            >Save</md-button
          >
        </md-dialog-actions>
      </form>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="isConfirmLogoutActive"
      md-title="Are you sure you want to sign-out?"
      md-content=""
      md-confirm-text="Yes"
      md-cancel-text="Cancel"
      @md-confirm="onConfirmLogoutHandler"
    />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import firebase from "firebase";
import db from "../firebaseInit";
import { event_bus } from "../EventBus";

export default {
  name: "PageContainer",
  data() {
    return {
      isMenuVisible: false,
      isNewNoteDialogVisible: false,
      isConfirmLogoutActive: false,
      note: {
        title: "",
        content: "",
      },
      isSubmitted: false,
    };
  },
  validations: {
    note: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    goToRouteHandler(path) {
      if (this.$route.path !== path) this.$router.push(path);
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
    submitHandler() {
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        db.collection("notes")
          .add({
            user_id: firebase.auth().currentUser.uid,
            title: this.note.title,
            content: this.note.content,
            is_completed: false,
          })
          .then(() => {
            event_bus.$emit("trigger-retrieve");
            this.isNewNoteDialogVisible = false;
            this.$toasted.info("Note Added", {
              position: "bottom-right",
              duration: 5000,
            });
          })
          .catch(() => {
            this.isNewNoteDialogVisible = false;
            this.$toasted.error(
              "Somethings went wrong. Please try again later.",
              { position: "bottom-right", duration: 5000 }
            );
          });
      }
    },
  },
};
</script>

<style scoped>
.md-app {
  height: 100vh;
}

.md-toolbar {
  position: sticky;
  position: -webkit-sticky;
  left: 0;
  right: 0;
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
