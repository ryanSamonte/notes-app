<template>
  <div>
    <notes-item-list filter-by-status="completed"></notes-item-list>
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