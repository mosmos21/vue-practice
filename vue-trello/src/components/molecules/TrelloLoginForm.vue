<template>
    <form novalidate>
        <div class="form-item">
            <label for="email">メールアドレス</label>
            <input
                id="email"
                v-model="email"
                type="text"
                autocomplete="off"
                placeholder="vue@example.com"
                @focus="resetError">
            <ul class="validation-errors">
                <li v-if="!validation.email.format">メールアドレスの形式が不正です</li>
                <li v-if="!validation.email.required">メールアドレスが入力されていません</li>
            </ul>
        </div>
        <div class="form-item">
            <label for="password">パスワード</label>
            <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="off"
                @focus="resetError">
            <ul class="validation-errors">
                <li v-if="!validation.password.required">パスワードが入力されていません</li>
            </ul>
        </div>
        <div class="form-actions">
            <TrelloButton
                :disabled="disableLoginAction"
                @click="handleClick">
                ログイン
            </TrelloButton>
            <p
                v-if="progress"
                class="login-progress">
                ログイン中...
            </p>
            <p
                v-if="error"
                class="login-error">
                {{ error }}
            </p>
        </div>
    </form>
</template>

<script>
import TrelloButton from "@/components/atoms/TrelloButton";

const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const required = val => !val.trim();

export default {
  name: "TrellogLoginForm",
  components: {
    TrelloButton
  },
  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },
  data: function() {
    return {
      email: "",
      password: "",
      progress: false,
      error: ""
    };
  },
  computed: {
    valication: function() {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
        }
      };
    },
    valid: function() {
      const validation = this.validation;
      const fields = Object.keys(validation);
      let valid = true;
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        valid = Object.keys(validation[field]).every(
          key => validation[field][key]
        );
        if (!valid) {
          break;
        }
        return valid;
      }
    },
    disabledLoginAction: function() {
      return !this.valid || this.progress;
    }
  },
  methods: {
    resetError: function() {
      this.error = "";
    },
    handleClick: function() {
      if (this.disableLoginAction) {
        return;
      }
      this.progress = true;
      this.error = "";
      this.$nextTick(() => {
        this.onlogin({ email: this.email, password: this.password })
          .catch(err => (this.error = err.message))
          .then(() => (this.progress = false));
      });
    }
  }
};
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}

label {
  display: block;
}

input {
  width: 100%;
  padding: 0.5em;
  font: inherit;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0.25em 0;
}

ul li {
  font-size: 0.5em;
}

.validation-errors {
  height: 32px;
}

.form-actions p {
  font-size: 0.5em;
}
</style>
