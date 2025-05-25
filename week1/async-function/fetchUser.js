// 1. 사용자 정보를 2초 후에 반환하는 비동기 함수
function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("홍길동");
    }, 2000); // 2초 지연
  });
}

// 2. async 함수에서 fetchUser()를 호출하고 결과 출력
async function main() {
  const name = await fetchUser();
  console.log("사용자 이름:", name);
}

// 함수 실행
main();
