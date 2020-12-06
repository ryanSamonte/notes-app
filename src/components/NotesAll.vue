<template>
  <div>
    <notes-item-list filter-by-status="all"></notes-item-list>
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