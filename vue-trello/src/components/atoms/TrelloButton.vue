<template>
    <button
        :class="classes"
        :disabled="disabled"
        type="button"
        @click="handleClick">
        <slot />
    </button>
</template>

<script>
export default {
  name: "TrelloButton",
  props: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  computed: {
    classes: function() {
      const cls = "trello-button" + (this.type === "text" ? "-text" : "");
      return [cls];
    }
  },
  methods: {
    handleClick: function(ev) {
      this.$emit("click", ev);
    }
  }
};
</script>

<style scoped>
.trello-button {
  padding: 0.6em 1.3em;
}

.trello-button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
