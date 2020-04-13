function InitEdiyaUI() {
  // 지역 변수
  // var isSlideIn = false;
  // DOM 노드 참조 변수
  let specEnters = null;
  let specExits = null;
  let firstCard = null;
  let navClBtn = null;
  let navOpBtn = null;
  let topButton = null;
  let navigation = null;
  let firstElm = null;
  let lastElm = null;
  let details = null;

  // UI 인터랙션 초기화
  const init = function() {
    // 문서 객체를 찾아 지역 변수에 참조하는 함수 실행
    findDomElement();
    addEventButtonBugger();
    addEventCardButton();
    addEventFirstCard();
    hideAllDetail();
  };

  // DOM 요소 변수 할당
  const findDomElement = function() {
    specEnters = document.querySelectorAll('.menuItem');
    specExits = document.querySelectorAll('.menuDetail > button');
    Cards = document.querySelectorAll('.menuList a');
    navClBtn = document.querySelector('#navClBtn');
    navOpBtn = document.querySelector('.burgerButton');
    topButton = document.querySelector('.topButton');
    navigation = document.querySelector('.appNavigation');
    firstElm = document.querySelector('.navList > li:nth-child(1) h3');
    lastElm = document.querySelector('.navList > li:nth-child(6) h3');
    details = document.querySelectorAll('.closeDetail');
  };
  const hideAllDetail = function() {
    console.log('all details gone');
    Array.from(details).forEach(det => (det.tabIndex = '-1'));
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
    Array.from(specEnters).forEach(button =>
      button.addEventListener('keydown', isitEnter, true),
    );
    Array.from(specExits).forEach(button =>
      button.addEventListener('click', closeSpec, true),
    );
  };
  const addEventFirstCard = function() {
    Cards[0].addEventListener('keydown', backtoH);
  };
  const addLastElm = function() {
    lastElm.addEventListener('keydown', gotoCl);
  };
  // 메뉴리스트

  // 메뉴리스트 슬라이드 인

  // 콜백 함수 정의
  const openSpec = function() {
    const target = this.parentElement.querySelector('.menuDetail');
    target.classList.add('isOpen');
    target.querySelector('.closeDetail').tabIndex = '0';
  };
  const isitEnter = function(e) {
    if (e.keyCode === 13) {
      // 일단 오픈스펙과 동일한 함수 실행...
      const target = this.parentElement.querySelector('.menuDetail');
      target.classList.add('isOpen');
      target.querySelector('.closeDetail').tabIndex = '0';
    }
  };
  const closeSpec = function(e) {
    console.log('close');
    e.preventDefault();
    this.parentElement.setAttribute('hidden', true);
    // setTimeout(() => {
    //   this.parentElement.classList.remove('open_spec');
    // }, 0);
    this.parentElement.classList.remove('isOpen');
  };
  const navOpen = function() {
    console.log('open');
    // 만들기
    // navigation.removeAttribute('hidden');

    navigation.classList.add('isActive');
    // 스크롤바 위치 돌려놓기
    navigation.parentElement.parentElement.style = 'transform: blur(2px)';
    navigation.parentElement.parentElement.style = 'overflow : hidden';
    navOpBtn.removeEventListener('click', navOpen);
    firstElm.focus();
    navigation.parentElement.querySelector('.appMain').style =
      'filter:blur(2px)';
    navigation.parentElement.querySelector('.appHeader').style =
      'filter:blur(2px)';
  };
  const navClose = function() {
    console.log('close');
    navigation.classList.remove('isActive');
    // 없애기
    // navigation.setAttribute('hidden', true);
    // 스크롤바 위치 바꾸기
    navigation.parentElement.parentElement.style = 'overflow : inherit';
    navOpBtn.addEventListener('click', navOpen);

    Cards[0].focus();

    navigation.parentElement.querySelector('.appMain').style = 'filter:none';
    navigation.parentElement.querySelector('.appHeader').style = 'filter:none';
  };
  // 네비 끄는 버튼에서의 순환 함수
  const forceNav = function(e) {
    if (e.type === 'keydown') {
      if (!e.shiftKey && e.keyCode === 9) {
        console.log(e);
        e.preventDefault();
        firstElm.focus();
      } else if (e.keyCode === 13) {
        console.log('close');
        navigation.classList.remove('isActive');
        // 없애기
        // navigation.setAttribute('hidden', true);
        // 스크롤바 위치 바꾸기
        navigation.parentElement.parentElement.style = 'overflow : inherit';
        navOpBtn.addEventListener('click', navOpen);

        Cards[0].focus();

        navigation.parentElement.querySelector('.appMain').style =
          'filter:none';
        navigation.parentElement.querySelector('.appHeader').style =
          'filter:none';
        // 여기서이제
        // e.preventDefault();
        // Cards[0].focus();
      }
    }
  };
  // else if (e.shiftKey && e.keyCode === 9) {
  //   // console.error('hey!');
  //   // lastElm.focus();
  // } else {
  // }
  // else(!e.shiftKey && e.keyCode === 9){
  //   lastElm.focus();

  // 메뉴리스트에 포커스받으면 색상클래스 주자.
  // Array.from(specEnters).forEach( buts => buts.addEventListener("focus",))
  // if(포커스 받으면 ){클래스추가해라}

  // 네비 켜는 버튼에서의 경로
  const forceMenu = function(e) {
    if (e.keyCode === 13) {
      navOpen();
    } else if (!e.shiftKey && e.keyCode === 9) {
      console.log('first');
      e.preventDefault();
      Cards[0].focus();
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
  const backtoH = function(e) {
    if (e.type === 'keydown') {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        navOpBtn.focus();
      }
    }
  };
  const gotoCl = function() {
    if (e.type === 'keydown') {
      if (!e.shiftKey && e.keyCode === 9) {
        navClBtn.focus();
      }
    }
  };
  // DOM 콘텐츠가 준비되면 init 이벤트 핸들러 연결
  window.addEventListener('DOMContentLoaded', init);
}
// 이디야UI 기능입히기 초기화.
InitEdiyaUI();
