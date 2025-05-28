<template>
  <img
    src="@/assets/imgs/kakao.jpeg"
    alt="카카오 로그인"
    @click="loginWithKakao"
  />
</template>

<script>
import { loginUser } from '@/services/login';

export default {
  name: 'LoginKakao',
  setup(props, { root }) {
    const loginWithKakao = () => {
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log('kakao login', authObj);
          console.log('kakao', this);
          getKakaoUserInfo();
        },
        fail: function (err) {
          alert(JSON.stringify(err))
        },
      })
    };

    const getKakaoUserInfo = () => {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: async function (response) {
          console.log(response);

          const data = await loginUser({ id: response.id }, true);
          if (data.msg) return;
          if (data.response.status === 500) {
            root.$router.push('/signIn');
          }
        },
        fail: function (error) {
          console.log(error);
        }
      });
    };

    return {
      loginWithKakao,
    };
  },
}
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>