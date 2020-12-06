<template>
  <div>
    <vue-topprogress ref="topProgress"></vue-topprogress>

    <md-empty-state
      v-if="isEmpty === true"
      md-icon="devices_other"
      md-label="Oh! Looks like you don't have any notes yet"
      md-description="Start taking notes now and manage it all here"
    >
      <md-button class="md-primary md-raised">Take my First Note</md-button>
    </md-empty-state>

    <div v-if="isEmpty === false" class="md-layout md-alignment-center">
      <div
        v-for="(note, i) in notes"
        :key="i"
        class="md-layout-item md-medium-size-50 md-small-size-100 mt-1"
      >
        <div class="p-2">
          <md-card class="p-1">
            <md-card-header>
              <h1>{{ note.title }}</h1>
            </md-card-header>

            <md-card-content>
              <p>{{ note.content }}</p>
            </md-card-content>

            <md-card-actions>
              <md-badge
                v-if="note.is_completed === true"
                class="md-primary md-square"
                md-content="Completed"
              />
              <md-badge
                v-if="note.is_completed === false"
                class="md-square"
                md-content="Pending"
              />

              <md-button class="md-icon-button">
                <md-icon>article</md-icon>
                <md-tooltip md-direction="bottom">View Note</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="bottom">Edit Note</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="bottom">Delete Note</md-tooltip>
              </md-button>

              <md-button
                v-on:click="changeStatusHandler(note.id)"
                class="md-icon-button"
              >
                <span v-if="note.is_completed === true">
                  <md-icon>close</md-icon>

                  <md-tooltip md-direction="bottom">Mark as Pending</md-tooltip>
                </span>

                <span v-if="note.is_completed === false">
                  <md-icon>check</md-icon>

                  <md-tooltip md-direction="bottom">Mark as Completed</md-tooltip>
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

export default {
  name: "AllNotes",
  data() {
    return {
      notes: [],
      isEmpty: false,
    };
  },
  methods: {
    retrieveNotes() {
      this.$refs.topProgress.start();

      db.collection("notes")
        .where("user_id", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
          let size = querySnapshot.size;
          let responseData = [];

          if (size > 0) {
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
    changeStatusHandler(id) {
      this.$refs.topProgress.start();

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
                this.retrieveNotes();
                console.log("done");
              });
          });
        });

      this.$refs.topProgress.done();
    },
  },
  mounted() {
    this.retrieveNotes();
  },
};
</script>

<style scoped>
.md-empty-state-label {
  color: #ffffff;
}

.md-empty-state-description {
  color: #ffffff;
}

.md-badge {
  position: absolute;
  left: 20px;
}

.md-badge.md-square {
  width: fit-content;
}
</style>