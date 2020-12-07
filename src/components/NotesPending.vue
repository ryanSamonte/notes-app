<template>
  <div>
    <notes-item-list empty-state-label="No Pending Notes Yet" empty-state-description="" filter-by-status="pending"></notes-item-list>
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