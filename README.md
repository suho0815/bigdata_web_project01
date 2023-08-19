# 전국 동물병원 검색

<img src="https://img.shields.io/badge/React-#61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-#3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwindcss-#06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=white">
<br/>
전국 동물병원 위치 정보 제공 및 커뮤니티 웹

# 실행 방법

Back-End : <https://github.com/honeydanji/MiniProject>

```
npm i
npm start
```

.env 파일 만들기

```
REACT_APP_SERVER_URL = 서버 주소
REACT_APP_KAKAOMAP_KEY = 카카오맵 API 키
```

# 주요 기능

- 메인페이지의 가로 스크롤, 배경영상, 새로운 게시글
- 동물병원 검색 페이지, pagination
- 게시판 등록, 수정, 삭제, 좋아요, 댓글
- 로그인, 회원가입 (쿠키 활용)

# 결과물

![KakaoTalk_20230817_110917615](https://github.com/suho0815/bigdata_web_project01/assets/50311505/d5b417d8-f210-40d2-a0cd-436d051690ba)

# Front-End 개발 일지

- 07/24(월)

  - 개발 환경 구성
  - 레이아웃 설계(~ ing)

- 07/25(화)

  - 레이아웃 설계
  - 로그인 및 리뷰 게시판 설계
  - Modal창 설계
  - 지도 서비스(카카오맵 API 이용)

- 07/26 (수)

  - Modal 창 구현
  - 로그인 page 구현
  -

- 07/27 (목)

  - fetch로 백엔드 연동
  - 반응형 설계
  - videosection 구현

- 07/28 (금)

  - 회원가입 page 구현
  - 게시판 page 추가를 위해 MainPage를 포함한 레이아웃 재설계,,ㅠ
  - 바뀐 레이아웃을 토대로 수정
  - 반응형(tablet, moblie 환경) 구현

- 07/31 (월)

  - hospital section 구현
  - 반응형 메뉴 창 구현

- 08/01 (화)

  - FindHospital page BackEnd와 상세검색 Modal창 combobox 데이터 처리
  - hospital section의 드래그 이벤트 관련 오류 수정

- 08/02 (수)

  - backEnd와 로그인 상태 유지 관련 회의 및 jwt 토큰 처리(~ ing 잘 안됨,, 맨 마지막에 하기로 함,,,)
  - 게시판 page 관련 회의 및 구현(~ ing )

- 08/03 (목)

  - jwt 토큰을 쿠키에 저장하며 로그인 구현 완성
  - recoil을 활용해 상태 코드 정리

- 08/04 (금)

  - 반응형 nav 메뉴 창 애니메이션 추가
  - MainPage section 추가

- 08/07 (월)

  - 동물병원찾기 pagenation 구현
  - 백엔드 스프링 mvc cors 쿠키 허용 오류 해결

- 08/08 (화)

  - 커뮤니티 메뉴 버튼 상태 관련 오류 해결
  - 카카오 맵 API 마커 표현 (위도, 경도 데이터에 엉뚱한 값으로 표현의 어려움이 있음)

- 08/09 (수)

  - 게시판 등록 구현
  - 자랑하기 게시판, 꿀팁 게시판 리스트 페이지 추가

- 08/10 (목)

  - 자랑하기 게시판 상세보기(Modal 형식)
  - 꿀팁 게시판 상세보기 페이지

- 08/11 (금)

  - 게시판 상세보기 시 댓글 등록, 수정, 삭제 추가
  - 게시글의 작성자, 댓글 작성자만 수정, 삭제 가능하도록 구현
  - 쿠키 정보를 통해 로그인한 유저의 환영문구 추가
  - 게시글 등록 시 스프링 시큐리티의 cors 설정 관련 오류 해결

- 08/14 (월)

  - 재렌더링으로 조회 수 2번 씩 증가하는 오류 수정
  - 게시글 좋아요 기능 구현
  - 동물병원 상세검색을 여러번 수행 시 광역시도를 입력하지 않았음에도 시군구, 읍면동 값이 존재하는 오류 수정
  - 회원가입 페이지의 비밀번호, 비밀번호 확인의 일치 여부 확인 문구 추가

- 08/16 (수)

  - 게시판 이미지 등록 처리
  - 인기 게시글의 데이터 추가
  - 새로운 글, 새로운 댓글 데이터 추가
  - 동물병원찾기 페이지의 검색 결과 리스트를 클릭 시 네이버 지도로 이동 기능 추가
  - 주요 기능 최종 점검 및 코드 정리

# 후기

1. tailwind css랑 typeSciprt를 사용하면서 코드가 너무 지저분해짐...
   typeScript에 적응하는 데 시간이 오래 걸렸고,,
   컴포넌트로 나름 분류를 하였지만 코드가 여전히 지저분함,,

2. 초기 설계 시 여러가지 기능들을 넣고 싶은 나머지 처음 설계 했던 내용과 다르게
   레이아웃 구조를 많이 바꾸게 되었고 시간이 생각과 다르게 너무 오래 걸렸음.,.
   초기에 확장성을 고려하지 못하고 설계를 하였음,,,
