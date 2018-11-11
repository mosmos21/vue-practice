<template>
    <div class="login-view">
        <h1>Trello</h1>
        <TrelloLoginForm />
    </div>
</template>

<script>
import TrelloLoginForm from "@/components/molecules/TrelloLoginForm";

export default {
  name: "TrelloLoginView",
  components: {
    TrelloLoginForm
  },
  methods: {
    handleLogin: function(authInfo) {
      return this.$store
        .dispatch("login", authInfo)
        .then(() => this.$router.push({ path: "/" }))
        .catch(err => this.throwReject(err));
    }
  }
};
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
