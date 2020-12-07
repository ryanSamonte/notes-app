<template>
  <div>
    <vue-topprogress ref="topProgress"></vue-topprogress>

    <md-empty-state
      v-if="isEmpty === true"
      md-icon="article"
      :md-label="emptyNotesStateLabel"
      :md-description="emptyNotesStateDescription"
    >
      <md-button
        v-if="filterBy === 'all'"
        v-on:click="isNewNoteDialogVisible = true"
        class="md-primary md-raised"
        >Add my First Note</md-button
      >
    </md-empty-state>

    <!-- Modal for Note Details -->

    <notes-add
      v-if="isNewNoteDialogVisible"
      @close="isNewNoteDialogVisible = false"
    ></notes-add>

    <notes-view
      v-if="isViewModalVisible"
      @close="isViewModalVisible = false"
      :data="noteModalData"
    ></notes-view>

    <notes-edit
      v-if="isEditModalVisible"
      @close="isEditModalVisible = false"
      :data="noteModalData"
    ></notes-edit>

    <md-dialog-confirm
      :md-active.sync="isConfirmDeleteActive"
      md-title="Are you sure you want to delete this note?"
      md-content=""
      md-confirm-text="Yes"
      md-cancel-text="Cancel"
      @md-confirm="onConfirmDeleteHandler(noteIdToDelete)"
    />

    <div v-if="isEmpty === false" class="md-layout md-alignment-center">
      <div
        v-for="(note, i) in notes"
        :key="i"
        class="md-layout-item md-medium-size-50 md-small-size-100 mt-1"
      >
        <div class="p-2">
          <md-card class="p-1">
            <md-card-header>
              <h1>{{ noteContentFormatted(note.title, 35) }}</h1>
            </md-card-header>

            <md-card-content>
              <p class="word-wrap">
                {{ noteContentFormatted(note.content, 90) }}
              </p>
            </md-card-content>

            <md-card-actions>
              <md-badge
                v-if="note.is_completed === true"
                class="md-primary md-square"
                md-content="COMPLETED"
              />
              <md-badge
                v-if="note.is_completed === false"
                class="md-primary md-square"
                md-content="PENDING"
              />

              <md-button
                v-on:click="openViewModalHandler(note)"
                class="md-icon-button"
              >
                <md-icon>article</md-icon>
                <md-tooltip md-direction="bottom">View Note</md-tooltip>
              </md-button>

              <md-button
                v-on:click="openEditModalHandler(note)"
                class="md-icon-button"
              >
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="bottom">Edit Note</md-tooltip>
              </md-button>

              <md-button
                v-on:click="toggleConfirmDelete(note.id)"
                class="md-icon-button"
              >
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="bottom">Delete Note</md-tooltip>
              </md-button>

              <md-button
                v-on:click="changeStatusHandler(note.id)"
                class="md-icon-button"
                :disabled="isChangeStatusLoading"
              >
                <span v-if="note.is_completed === true">
                  <md-icon>close</md-icon>

                  <md-tooltip md-direction="bottom">Mark as Pending</md-tooltip>
                </span>

                <span v-if="note.is_completed === false">
                  <md-icon>check</md-icon>

                  <md-tooltip md-direction="bottom"
                    >Mark as Completed</md-tooltip
                  >
                </span>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../firebaseInit";
import { event_bus } from "../EventBus";
import NotesAdd from "./NotesAdd";
import NotesView from "./NotesView";
import NotesEdit from "./NotesEdit";

export default {
  name: "NotesItemList",
  components: {
    "notes-add": NotesAdd,
    "notes-view": NotesView,
    "notes-edit": NotesEdit,
  },
  props: {
    filterByStatus: String,
    emptyStateLabel: String,
    emptyStateDescription: String,
  },
  data() {
    return {
      notes: [],
      isEmpty: false,
      filterBy: this.filterByStatus,
      emptyNotesStateLabel: this.emptyStateLabel,
      emptyNotesStateDescription: this.emptyStateDescription,
      isNewNoteDialogVisible: false,
      isViewModalVisible: false,
      isEditModalVisible: false,
      isConfirmDeleteActive: false,
      noteModalData: null,
      noteIdToDelete: null,
      isChangeStatusLoading: false,
    };
  },
  methods: {
    retrieveNotes() {
      this.$refs.topProgress.start();

      let queryResult;

      queryResult = db
        .collection("notes")
        .where("user_id", "==", firebase.auth().currentUser.uid);

      if (this.filterBy === "completed") {
        queryResult = queryResult.where("is_completed", "==", true);
      } else if (this.filterBy === "pending") {
        queryResult = queryResult.where("is_completed", "==", false);
      }

      queryResult.get().then((querySnapshot) => {
        let size = querySnapshot.size;
        let responseData = [];

        if (size > 0) {
          this.isEmpty = false;

          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              user_id: doc.data().user_id,
              title: doc.data().title,
              content: doc.data().content,
              is_completed: doc.data().is_completed,
            };

            responseData.push(data);
          });
        } else {
          this.isEmpty = true;
        }

        this.notes = responseData;

        this.$refs.topProgress.done();
      });
    },
    noteContentFormatted(content, maxLength) {
      let formattedContent;

      if (content.length > maxLength) {
        formattedContent = content.substr(0, maxLength) + "...";
      } else {
        formattedContent = content;
      }

      return formattedContent;
    },
    openViewModalHandler(noteData) {
      this.noteModalData = noteData;
      this.isViewModalVisible = true;
    },
    openEditModalHandler(noteData) {
      this.noteModalData = noteData;
      this.isEditModalVisible = true;
    },
    toggleConfirmDelete(id) {
      this.noteIdToDelete = id;
      this.isConfirmDeleteActive = true;
    },
    onConfirmDeleteHandler(id) {
      db.collection("notes")
        .where("__name__", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
              this.retrieveNotes();
              this.$toasted.info("Note Deleted", {
                position: "bottom-right",
                duration: 5000,
              });
            });
          });
        })
        .catch(() => {
          this.$toasted.error(
            "Somethings went wrong. Please try again later.",
            { position: "bottom-right", duration: 5000 }
          );
        });
    },
    changeStatusHandler(id) {
      this.isChangeStatusLoading = true;

      db.collection("notes")
        .where("__name__", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                is_completed: doc.data().is_completed === true ? false : true,
              })
              .then(() => {
                this.isChangeStatusLoading = false;
                this.retrieveNotes();
              });
          });
        })
        .catch(() => {
          this.isChangeStatusLoading = false;
          this.$toasted.error(
            "Somethings went wrong. Please try again later.",
            { position: "bottom-right", duration: 5000 }
          );
        });
    },
  },
  created() {
    event_bus.$on("trigger-retrieve", () => {
      this.retrieveNotes();
    });
  },
  mounted() {
    this.retrieveNotes();
  },
};
</script>

<style scoped>
.md-badge {
  position: absolute;
  left: 20px;
}

.md-badge.md-square {
  width: fit-content;
}
</style>