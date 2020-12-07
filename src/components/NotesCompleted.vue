<template>
  <div>
    <notes-item-list empty-state-label="No Completed Notes Yet" empty-state-description="" filter-by-status="completed"></notes-item-list>
  </div>
</template>

<script>
import NotesItemList from "./NotesItemList";

export default {
  name: "NotesCompleted",
  components: {
    "notes-item-list": NotesItemList
  }
};
</script>