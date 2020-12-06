<template>
  <div>
    <notes-item-list filter-by-status="pending"></notes-item-list>
  </div>
</template>

<script>
import NotesItemList from "./NotesItemList";

export default {
  name: "NotesPending",
  components: {
    "notes-item-list": NotesItemList
  }
};
</script>