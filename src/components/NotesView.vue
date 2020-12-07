<template>
  <md-dialog
    :md-active.sync="isViewNoteDialogVisible"
    @md-clicked-outside="$emit('close')"
  >
    <md-dialog-title>View Note</md-dialog-title>

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
      },
    };
  },
};
</script>