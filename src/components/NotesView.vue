<template>
  <md-dialog
    :md-active.sync="isViewNoteDialogVisible"
    @md-clicked-outside="$emit('close')"
  >
    <md-dialog-title
      >View Note
      <span class="formatted-date"
        >{{ formattedUpdatedDate
        }}<md-tooltip v-if="note.updated_at != null" md-direction="bottom">{{
          formattedCreatedDate
        }}</md-tooltip></span
      ></md-dialog-title
    >

    <md-dialog-content class="md-scrollbar">
      <form class="p-2">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="title">Title</label>
              <md-input v-model="note.title" name="title" id="title" readonly />
            </md-field>

            <md-field>
              <label for="content">Content</label>
              <md-textarea
                class="md-scrollbar"
                v-model="note.content"
                md-autogrow
                readonly
              ></md-textarea>
            </md-field>
          </div>
        </div>

        <md-dialog-actions>
          <md-button
            type="button"
            class="md-dense md-raised md-danger"
            v-on:click="isViewNoteDialogVisible = false"
            @click="$emit('close')"
            >Close</md-button
          >
        </md-dialog-actions>
      </form>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
export default {
  name: "NotesView",
  props: ["data"],
  data() {
    return {
      isViewNoteDialogVisible: true,
      note: {
        title: this.data.title,
        content: this.data.content,
        created_at: this.data.created_at,
        updated_at: this.data.updated_at,
      },
    };
  },
  computed: {
    formattedCreatedDate() {
      const monthArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let createdAtObject = this.note.created_at.toDate();

      return (
        "Created " +
        monthArray[createdAtObject.getMonth()] +
        " " +
        createdAtObject.getDate() +
        ", " +
        createdAtObject.getFullYear() +
        " (" +
        createdAtObject.getHours() +
        ":" +
        ("0" + createdAtObject.getMinutes()).slice(-2) +
        ")"
      );
    },
    formattedUpdatedDate() {
      const monthArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let updatedAtObject = this.note.updated_at == null ? this.note.created_at.toDate() : this.note.updated_at.toDate();

      let message = this.note.updated_at != null ? "Edited" : "Created";

      return (
        message +
        " " +
        monthArray[updatedAtObject.getMonth()] +
        " " +
        updatedAtObject.getDate() +
        ", " +
        updatedAtObject.getFullYear() +
        " (" +
        updatedAtObject.getHours() +
        ":" +
        ("0" + updatedAtObject.getMinutes()).slice(-2) +
        ")"
      );
    },
  },
};
</script>

<style scoped>
.formatted-date {
  position: absolute;
  right: 15px;
  font-size: 50%;
  font-weight: bold;
}
</style>