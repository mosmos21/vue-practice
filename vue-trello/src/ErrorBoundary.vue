<template>
    <div>
        <div
            v-if="error"
            class="error">
            <p class="display">予期しないエラーが発生しました</p>
            <hr>
            <p class="message">エラーメッセージ: {{ error.mesage }}</p>
            <p class="info">エラー情報: {{ info }}</p>
            <p class="stack">エラー詳細: {{ error.stack }}</p>
        </div>
        <template c-else>
            <slot />
        </template>
    </div>
</template>

<script>
export default {
  name: "ErrorBoundary",
  data: function() {
    return {
      error: null,
      info: null
    };
  },
  errorCaptured: function(err, vm, info) {
    this.error = err;
    this.info = info;
  }
};
</script>

<style scoped>
.error {
  color: red;
  text-align: left;
}
</style>