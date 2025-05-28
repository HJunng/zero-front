<template>
  <form
    class="sign-in-form"
    @submit="clickSignIn(user.id, user.password, $event)"
  >
    <label>
      ID
      <v-input
        class="sign-in-form__text"
        v-model="user.id"
      />
    </label>
    <label>
      Password
      <v-input
        class="sign-in-form__text"
        v-model="user.password"
        type="password"
        :isError="user.isError"
      />
    </label>
    <label>
      Confirm Password
      <v-input
        class="sign-in-form__text"
        v-model="user.confirmPassword"
        type="password"
        :isError="user.isError"
        error-msg="비밀번호가 다릅니다."
      />
    </label>
    <v-button
      type="submit"
      class="sign-in-form__button"
      @click="checkPassword()"
    >회원가입</v-button>
    <v-button
      class="sign-in-form__button"
      @click="clickGoogle"
    >구글 회원가입</v-button>
    <div id="naverIdLogin" ref="naverIdLogin" style="display: none"></div>
    <v-button
      class="sign-in-form__button"
      @click="clickNaver"
    >네이버 회원가입</v-button>
    <v-button
      class="sign-in-form__button"
      @click="clickKakao"
    >카카오 회원가입</v-button>
  </form>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import naverLogin from '@/helper/naverLogin';
import { getKakaoInfo } from '@/services/social';
import { signInFirebawse, getUserInFirebase, getGoogleUser, signInSocial } from '@/services/sign';

export default {
  name: 'SignInForm',
  components: {
    VInput,
    VButton,
  },
  setup(props, { root, refs }) {
    const user = reactive({
      id: '',
      password: '',
      confirmPassword: '',
      isError: false,
    });

    const checkPassword = () => {
      user.isError = user.password !== user.confirmPassword;
    };
    const clickSignIn = (id, password, event) => {
      event.preventDefault();
      if (user.isError) return;
      console.log('사용자:', id, password);
      // signInUser({ id, password });
      signInFirebawse(id, password);
    };

    const clickGoogle = async () => {
      await getGoogleUser();
      root.$router.push('/login');
    };

    const clickNaver = () => {
      refs.naverIdLogin.firstChild.click();
    };

    const clickKakao = async () => {
      console.log('kakao');
      const { id, email, name } = await getKakaoInfo();
      await signInSocial(id, email, name);
      root.$router.push('/login');
    };

    onMounted(() => {
      naverLogin(false, true);
    })

    getUserInFirebase();
    return {
      user,
      checkPassword,
      clickSignIn,
      clickGoogle,
      clickNaver,
      clickKakao,
    };
  },
}
</script>

<style lang="scss" scoped>
.sign-in-form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-flow: column;
  width: 100%;

  &__text,
  &__button,
  a,
  label {
    width: 100%;
  }
}
</style>