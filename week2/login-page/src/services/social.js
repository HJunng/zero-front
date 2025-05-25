
export const getKakaoInfo = () => {

  return new Promise((resolve, reject) => {
    let id, email, name;

    function getKakaoUserInfo() {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {
          id = response.id;
          email = response.kakao_account.email;
          name = response.kakao_account.profile.nickname;
          resolve({ id, email, name });
        },
        fail: function (error) {
          console.log(error);
          reject(error);
        }
      });
    }
  
    function loginWithKakao() {
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log('kakao login', authObj);
          console.log('kakao', this);
          getKakaoUserInfo();
        },
        fail: function (err) {
          alert(JSON.stringify(err))
          reject(err);
        },
      })
    }
    loginWithKakao();
  });
}