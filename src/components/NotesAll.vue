<template>
  <div>
    <notes-item-list empty-state-label="Oh! Looks like you don't have any notes yet" empty-state-description="Start taking notes now and manage it all here" filter-by-status="all"></notes-item-list>
  </div>
</template>

<script>
import NotesItemList from "./NotesItemList";

export default {
  name: "NotesAll",
  components: {
    "notes-item-list": NotesItemList
  }
};
</script>