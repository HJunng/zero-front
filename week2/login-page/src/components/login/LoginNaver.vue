<template>
  <div id="naverIdLogin"></div>
</template>

<script>
import naverLogin from '@/helper/naverLogin';
import { onMounted } from '@vue/composition-api';

export default {
  name: 'LoginNaver',
  setup(props, { root }) {
    onMounted(() => {
      const naverInfo = root.$store.state.naverInfo;
      naverLogin(true, true);

      naverInfo.getLoginStatus((status) => {
        if (status) {
          const { accessToken } = naverInfo.accessToken;
          root.$store.commit('setAccessToken', accessToken);
        }
      })
    });
  }
}
</script>

<style lang="scss" scoped>
#naverIdLogin {
  width: 100%;
  height: 100%;
}
</style>