<template>
  <md-dialog
    :md-active.sync="isEditNoteDialogVisible"
    @md-clicked-outside="$emit('close')"
  >
    <md-dialog-title>Edit Note</md-dialog-title>

    <md-dialog-content class="md-scrollbar">
      <form @submit.prevent="submitHandler" class="p-2">
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
              <md-textarea
                class="md-scrollbar"
                v-model="note.content"
                md-autogrow
              ></md-textarea>

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
            v-on:click="isEditNoteDialogVisible = false"
            @click="$emit('close')"
            >Close</md-button
          >

          <md-button
            type="submit"
            class="md-dense md-raised md-primary"
            :disabled="isLoading"
            >Save</md-button
          >
        </md-dialog-actions>
      </form>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
const firebaseConfig = require("../firebaseInit");
import { required } from "vuelidate/lib/validators";
import { event_bus } from "../EventBus";

export default {
  name: "NotesView",
  props: {
    data: Object,
  },
  data() {
    return {
      isEditNoteDialogVisible: true,
      note: {
        id: this.data.id,
        title: this.data.title,
        content: this.data.content,
      },
      isSubmitted: false,
      isLoading: false,
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
    submitHandler() {
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        this.isLoading = true;

        firebaseConfig.notesCollection
          .where("__name__", "==", this.note.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref
                .update({
                  title: this.note.title,
                  content: this.note.content,
                  updated_at: firebaseConfig.firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                  this.isLoading = false;
                  this.$emit("close");
                  event_bus.$emit("trigger-retrieve");
                  this.$toasted.info("Note Updated", {
                    position: "bottom-right",
                    duration: 5000,
                  });
                });
            });
          })
          .catch(() => {
            this.isLoading = false;
            this.$emit("close");
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