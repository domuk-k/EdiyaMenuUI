function InitEdiyaUI() {
  // 지역 변수
  // var isSlideIn = false;
  // DOM 노드 참조 변수
  let specEnters = null;
  let specExits = null;
  let navigation = null;
  let navClBtn = null;
  let navOpBtn = null;
  let topButton = null;
  let lastBtn = null;
  // UI 인터랙션 초기화
  const init = function() {
    // 문서 객체를 찾아 지역 변수에 참조하는 함수 실행
    findDomElement();
    addEventButtonBugger();
    addEventCardButton();
  };

  // DOM 요소 변수 할당
  const findDomElement = function() {
    specEnters = document.querySelectorAll('.menuItem');
    specExits = document.querySelectorAll('.menuDetail > button');
    navigation = document.querySelector('.navigation');
    navClBtn = document.querySelector('#navClBtn');
    navOpBtn = document.querySelector('.burgerButton');
    topButton = document.querySelector('.topButton');
    firstElm = document.querySelector('.navList > li:first-child');
    lastElm = document.querySelector('.navList > li:last-child');
  };

  // 네비게이션 관련 이벤트 추가
  const addEventButtonBugger = function() {
    navOpBtn.addEventListener('click', navOpen);
    navOpBtn.addEventListener('keydown', forceMenu);
    // 순환을위한 강제 포커싱
    navClBtn.addEventListener('click', navClose);
    navClBtn.addEventListener('keydown', forceNav);

    firstElm.addEventListener('keydown', forceCircular);
  };
  // 메뉴카드에 이벤트 추가
  const addEventCardButton = function() {
    Array.from(specEnters).forEach(button =>
      button.addEventListener('click', openSpec, true),
    );
    Array.from(specExits).forEach(button =>
      button.addEventListener('click', closeSpec, true),
    );
  };

  // 메뉴리스트

  // 메뉴리스트 슬라이드 인

  // 콜백 함수 정의
  const openSpec = function() {
    console.log('open');
    const target = this.parentElement.querySelector('.menuDetail');
    target.classList.add('isOpen');
  };
  const closeSpec = function(e) {
    console.log('close');
    e.preventDefault();
    // setTimeout(() => {
    //   this.parentElement.classList.remove('open_spec');
    // }, 0);
    this.parentElement.classList.remove('isOpen');
  };
  const navOpen = function() {
    console.log('open');
    // 만들기
    navigation.removeAttribute('hidden');

    navigation.classList.add('isActive');
    // 스크롤바 위치 돌려놓기
    navigation.parentElement.parentElement.style = 'transform: blur(2px)';
    navigation.parentElement.parentElement.style = 'overflow : hidden';
    navOpBtn.removeEventListener('click', navOpen);
    firstElm.focus();
  };
  const navClose = function() {
    console.log('close');
    navigation.classList.remove('isActive');
    // 없애기
    navigation.setAttribute('hidden', true);
    // 스크롤바 위치 바꾸기
    navigation.parentElement.parentElement.style = 'overflow : inherit';
    navOpBtn.addEventListener('click', navOpen);
  };
  // 네비 끄는 버튼에서의 순환 함수
  const forceNav = function(e) {
    if (e.type === 'keydown') {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        firstElm.focus();
      } else if (e.shiftKey && e.keyCode === 9) {
        // console.error('hey!');
        // e.preventDefault();
        lastElm.focus();
      } else {
      }
      // else(!e.shiftKey && e.keyCode === 9){
      //   lastElm.focus();
    }
  };

  // 메뉴리스트에 포커스받으면 색상클래스 주자.
  // Array.from(specEnters).forEach( buts => buts.addEventListener("focus",))
  // if(포커스 받으면 ){클래스추가해라}

  // 네비 켜는 버튼에서의 경로
  const forceMenu = function(e) {
    if (e.keyCode === 13) {
      navOpen();
    } else if (e.keyCode === 9) {
      specEnters[0].focus();
      specEnters[0].classList.add('vis_focus');
    } else {
    }
  };

  const forceCircular = function(e) {
    if (e.type === 'keydown') {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        navClBtn.focus();
      }
    }
  };

  // DOM 콘텐츠가 준비되면 init 이벤트 핸들러 연결
  window.addEventListener('DOMContentLoaded', init);
}
// 이디야UI 기능입히기 초기화.
InitEdiyaUI();
