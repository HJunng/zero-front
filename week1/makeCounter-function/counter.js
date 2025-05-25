function makeCounter() {
  let count = 0; // 외부에서 접근할 수 없는 내부 변수

  function increase() {
    count++;
    console.log(`현재 숫자: ${count}`);
  }

  return increase; // 함수 반환
}

// 사용 코드
const counter = makeCounter();
counter(); // 현재 숫자: 1
counter(); // 현재 숫자: 2
counter(); // 현재 숫자: 3

// 외부에서 count 접근 불가능
// console.log(counter.count); // undefined
// counter.count = 100; // count는 외부에서 수정되지 않음