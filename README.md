# bigdata_web_project01

## 개발환경
* IDE = VSCode
* JAVA = jdk 17.0.3
* StringBoot = 3.0.2

## 프로젝트 설명 - https://www.notion.so/d22b745abe3a4f8daecef6357da12d8b (백엔드 개발 과정)
0. 백엔드 - 하성진, 프론트엔드 - 이수호
1. 공공데이터 포털이용 >> 행정안전부_동물병원.csv
2. 사업장명, 위도, 경도, 주소 등등으로 구성되어 있다.
3. 구현하려는 웹서비스와 관계없는 데이터가 많아서 전처리가 필요했다.
4. 프론트에서 Modal형식으로 데이터를 요청하면 백에서 광역도시, 시/군/구, 읍/면/동 마다 동물병원 리스트를 전달한다.
5. 리스트 목록에는 병원명, 위도, 경도, 도로명주소, 연락처로 구성되어 있다.
6. 제일 중요한 영업시간과 이미지는 네이버지도에서 크롤링 기법을 사용해서 가져온다.(보류)
7. JWT를 이용해 로그인 기능을 구현하고 일반계정과 관리자 계정으로 나눈다.
8. CRUD를 이용해서 동물병원마다 리뷰작성 기능을 구현한다.
9. 마무리??  

## 2023/07/25
- 주제 정하기(Data.go.kr)
    - 동물병원 영업시간 웹 서비스

- 기능 설계
    - 로그인 및 리뷰 게시판 구현
    - 이미지 업로드

- 데이터 전처리
    - 원본 데이터 수정 및 마무리 
 
## 2023/07/25
- 데이터 다시 전처리(마무리)
    - 주소를 시/도 , 시/군/구, 읍/면/동 나누기
- csv MySQL 연동(마무리)
    - 수정 10번

// 설계를 제대로 하지 않고 개발을 시작해서 많은 시간을 소모했다.....설계의 중요성을 알게 되었다.

## 2023/07/26
- 엔티티클래스 생성
- 컨트롤러 생성
- 서비스 생성
- 레퍼지토리 생성
    - 데이터베이스와 상호작용하기
    - MySQL 쿼리문 작성
- 포스트맨을 통해 정보 요청 테스트 성공
- 원하는 데이터를 제이슨 형식으로 불러오는데 성공
- 오류
    - 서버를 실행 했으나 JPA를 찾지 못했다는 오류가 생김 >> properties에 jpa 설정
    - 엔티티 클래스에 지정한 필드명을 찾지 못함 >> 필드명과 메소명에 대소문자 구분
    - MySQL 버전이 맞지 않음 >> cmd를 통해 확인 결과 버전8로 나와 코드를 수정함
    - 어플리케이션을 실행하면 컨트롤러 클래스에 접근을 못함 >> 서버실행클래스가 있는 패키지 또는 하위패키지로 모든 클래스를 옮김

// REST API 명세서 작성하기

## 2023/07/27
- 크롤링(보류 왜? 큰틀을 만들고 기능을 추가하자.)
    - 병원의 영업시간을 네이버지도에서 크롤링을 이용해 가져온다.
- 프론트 UI와 백 엔드포인트가 일치하지 않는다.
    - 설계를 처음부터 정말 잘해야한다.... REST API 명세가 필요한 이유다.
- 코드를 거의 완성했다고 생각했지만 RESTFUL이랑은 어울리지 않는 코드라고 피드백을 받았다. >> 어떤 코드가 어울리는 코드일까? 생각해보자..
    - 프론트와 의논해서 명세를 작성하지 않고 내 마음대로 엔드포인트를 정하면 서로 소통에 문제가 생길 수 있다.
    - @GetMapping("/sido={province}&gungu={city}&dong={dong}") << 이런 식으로 작성하는 건 내가봐도 모르겠다..
- 코드가 1차로 완성 되었고 원하는 데이터를 json형태로 변환완료
- 백(나)에 있는 서버가 프론트로 전송이 안된다. 
    - cmd를 통해 ping 명령어로 테스트를 해보니 내가 보내는 게 안되고 상대방이 보내는 건 이상없다.
    - 백 시스템과 프론트 시스템의 방화벽을 제거 한 후에 ping 테스트를 하니 문제없이 진행되었다.
    - 즉 컴퓨터 시스템 문제는 아닌 것 같다.
    - 백과 프론트 서로 바꿔서 실행해보면 그것 또한 잘 된다. 
    - vscode로 StringBoot 확장자 설치해서 사용하고 있는데 툴 문제일 가능성이 있어 개발환경을 이클립스로 변경해서 시도를 해봐야겠다....

## 2023/07/28
- 프론트에서 백 서버실행 오류를 해결했다.
    - 개발환경(IDE)를 vscode > 이클립스로 변경했다.
    - 확장/플러그인 설치가 vscode에 제대로 안되어 있으면 이와 같은 에러가 생길 수 있다.
    - (확장 패키지 확인중...)
- 백에서 보낸 api 프론트로 React로 띄우기
    - configuration 클래스 생성후에 CORS를 구성했다.
    - 물론 origincloss를 사용해서 특정 메서드만 맵핑 시킬 수 있다.
    - configuration 클래스로 구성하면 지정한 엔드포인트 하위에 있는 엔드포인트를 맵핑할 수 있다..
- RestAPi 명세서 수정
- @GetMapping("/hospital/{province}/{sigungu}/{dong}") 실행되지 않는다.
    - 코드가 문제인가.. 계속 404에러가 나온다. (해결중)
- 컨트롤러,서비스, 레퍼지토리 클래스 메소드 추가
- 깃 충돌 일어나서 터미널 명령어 "git stash"를 사용(임시저장)
    - 했던 작업이 날라가는 경험을 처음함
    - "git stash apply" 가장 최근 작업을 불러와서 복구했음.
- 도메인 필드 수정해야함....

## 2023/07/30
- jdk 설정
    - 노트북에서 작업을 하는데.... java 버전 설정이 이상하게 되어있음
    - 수정 전 : jdk 1.8.x and jre 1.8.x
    - 수정 후 : jdk 17.0.3
    - jre와 jdk의 차이점을 명확히 알지 못해서 생긴 오류였다. (본인잘못)
    - 차이를 구분한 후에 개발환경 셋팅을 해주니 오류가 해결되었다.
- JavaBean 명명규칙 설정
    - 규치에 따라 레퍼지토리 클래스 메서드 이름 변경
    - 'findByHospital_name' >> 'findByHospitalName' : '-' 하이폰은 인식이 안된다....
    - 엔티티 클래스 property 변경도 동시에 변경.. @Column사용해서 테이블 컬럼은 그대로 사용.
- 컨트롤러 클래스 오류
    - 파라미터를 선택적으로 입력 받기 위해서 @RequestParam으로 설정 했다.
    - 정상적으로 작동 되지 않고 404에러가 생겼다. 3~4시간을 고치려고 했지만 잘 안된다
    - 코드는 문제가 없어 보이는데... 개발환경에 문제일 수도 있다.
    - 내일은 vscode에서 실행하지 말고 이클립스로 환경을 변경해보자.
- 테이블 추가
    - 게시글 테이블
    - 댓글 테이블
    - 멤버 테이블
- member 클래스 생성(Controller, Service, Repository)
    - Controller 
        - 프론트 데이터 Post 받기
    - Service
        - Controller로부터 받은 데이터 Repository 전송
    - Repositroy
        - 받은 데이터 데이터베이스 저장.

## 2023/07/31
- 회원가입 구현
    - 프론트 > Controller > Service(Dto) > Repository > DB
    - dto로 데이터를 받고 Entity에 저장하고 Repository로 넘겨준다.
    - Repository가 데이터베이스에 회원정보를 저장한다.
- 로그인 구현
    - 토큰 DTO 생성
    - jwt(실패)
- FOREIGN KEY 에러(해결)
    - 묶으려고 하는 테이블 전부 일치시켜야 한다.(컬럼명, 타입(문자열갯수까지))

// 회원가입 테이블은 정말 간단하다. 하지만 security와 jwt를 먼저 의존성을 넣어버리면 
// 권한과 인가 문제 때문에 접근이 안되서 401,403에러가 지속해서 나온다.
// 권한문제를 해결하는 것이 오늘의 핵심이었고... 내일은 회원마다 다른 권한을 주는 코드를 
// 작성한 후에 로그인을 완성시키자. 로그인 완성되면 게시판 렛츠고우

## 2023/08/01
- 로그인구현
    - jwt : 맵핑 주소 상관없이 모든 곳에 접근하도록 구현
    - 아직 관리자 페이지와 일반 페이지를 분리시키지 않음..

// jwt의 권한에 대해서 잘못 이해하고 있었음..권한에 따라 접근페이지를 달리하는 것이 목적. 
// 로그인, 회원가입, 게시판 -> 모두
// 게시판 게시, 개인 게시글 관리 ,댓글 -> /member/**
// 게신판 관리 -> /admin/**

- 접근권한 설정
    - 비회원 - user
    - 회원 - member
    - 관리자 - admin

- jwt 로그인인증
    - 프론트에서 로그인(Id, Password) 전송
    - 백에서 필터를 이용해서 토큰반환.
    - 전체 맵핑 주소를 "/api"로 설정했는데 jwt접근 문제로 맵핑 주소를 "/**"로 변경했다
    - Service클래서에서 필터로 데이터를 넘겨서 토큰을 리턴하려고 했는데 컨테이너에 빈이 생성이 안된다는 오류가 나왔다.
    - 일단은 작동이 되는 것이 우선이어서 서비스클래스에 login부분을 주석처리 했고 전체틀이 완료 되었을 때 다시 해보자.

## 2023/08/02
- jwt 인증 오류
    - log.info를 사용해서 로그인 ID와 PassWord가 잘 넘어오는 지 확인한 결과
    - Id는 잘 넘어오는데 PassWrod가 계속 null로 넘어왔다.
    - 프론트에서 회원가입 정보를 받을 때 PassWord에 해당하는 제이슨 데이터를 @Jsonignor를 사용해서 보안을 강화해준 적이 있다.
    - 그 결과 로그인인증을 처리할 때 Json으로 넘어오는 PassWrod를 가져오지 못해서 인증 오류가 생긴 걸로 보인다.
    - 나의 계획은 Json으로 넘어오는 password를 이용하지 않고 로그인 시도가 들어오면 해당 UserID를 이용해 데이터베이스에 있는 데이터(Id,PassWord)를 가져와서 비교하는 것이었다.
    - 하지만 데이터베이스에 존재하는 회원의 password는 이미 암호화가 되어 있다.
    - 그걸 가지고 오면 다시한번 더 암호화한 후에 비교하기 때문에 방법이 애초에 틀렸다.
    - 결국 @Jsonignore를 제거하는 것이 맞다.
- 게시판 구현
    - 꿀팁게시판, 자유게시판 테이블 2개 생성하기
    - 게시글당 이미지는 여러개 올릴 수 있게 테이블 구성하기(생각해보자)

// jwt로그인 인증 토큰 생성해서 프론트로 반환까지 성공
// 프론트에서 백으로 토큰 재전송 진행중(~ing)

## 2023/08/03
- 게시판 구현
    - 초기에 정한 계획이 달라져서 DB에 테이블을 추가하고 back 부분 코드를 일부 수정했다.

    - 게시글 등록하기
        - 로그인 유저만 게시글 등록 가능.
        - jwt 권한을 이용해서 유저아이디 존재여부 확인.
    - 게시글 조회
        - 조회수 기능 추가
    - 게시글 불러오기
    - 게시글 수정하기
- 개발 마인드맵을 작성
- RestAPI 명세 수정

## 2023/08/04
- 게시판 구현
    - 좋아요 기능 작성

- 게시판 테스트(게시글 작성)
    - 415에러 발생 : 도메인클래스 import문 수정(import java.sql.Timestamp;)
    - 500에러 발생 : 
        - Authorization이 null로 나온다... 로그인 요청후에 생성된 토큰을
        - 포스트맨 headers에 설정을 했는데 여전히 오류가 생긴다.
        - 툴 사용 미숙함으로 인한 오류.... 해결
    - 테스트완료
- 게시판 좋아요 기능 구현
    - 다대다 방식 사용
    - 좋아요를 누르기 앞서 권한을 체크한다. 로그인을 한 유저만 좋아요를 누르는 건 당연
    - (아직 진행중)

## 2023/08/05
- 게시판 구현
    - 좋아요 구현 완료
        - 회원당 게시글마다 한번만 하트를 누르도록 설정. (On / Off)
        - controller클래스 Post로 요청을 받고
        - service에서 조건문을 이용해 "좋아요"테이블의 레이블을 생성 및 삭제 요청
    - 포스트맨 테스트
        - 500에러 발생 :
            - (작성하자...)