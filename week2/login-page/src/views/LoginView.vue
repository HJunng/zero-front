<template>
  <div class="login-view">
    <img src="@/assets/imgs/wadiz.png" alt="로고" />
    <login-form class="form" />
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';
export default {
  name: 'login-view',
  components: {
    LoginForm,
  },
}
</script>

<style lang="scss" scouped>
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  .form {
    width: 300px;
  }
}
</style>