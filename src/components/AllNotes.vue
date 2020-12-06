<template>
    <div>
        <md-empty-state
            md-icon="devices_other"
            md-label="Oh! Looks like you don't have any notes yet"
            md-description='Start taking notes now and manage it all here'>
            <md-button class="md-primary md-raised">Take my First Note</md-button>
        </md-empty-state>
    </div>
</template>

<script>
export default {
    name: "AllNotes"
}
</script>

<style>
.md-empty-state-label {
    color: #ffffff;
}

.md-empty-state-description {
    color: #ffffff;
}
</style>