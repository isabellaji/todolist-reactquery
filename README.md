# To Do List
원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제
## 구현 화면
### ✔️ 회원가입 및 로그인
![todolist1](https://user-images.githubusercontent.com/95117711/196887969-8b9be43f-3e92-4a3e-99c6-7d3898298d6e.gif)
- /auth 경로에 로그인 & 회원가입 기능 개발
- 이메일과 비밀번호의 유효성 확인
  - 이메일 조건 : 최소 `@`, `.` 포함
  - 비밀번호 조건 : 8자 이상 입력
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동
  - 응답으로 받은 토큰은 로컬 스토리지에 저장
  - 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트
  - 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트
### ✔️ Todo List
![todolist2](https://user-images.githubusercontent.com/95117711/196889926-1f06a1c3-5f4b-4a70-96ec-c75d46b22ed8.gif)
- Todo List API를 호출하여 Todo List CRUD 기능을 구현
  - 목록 / 상세 영역으로 나누어 구현
  - Todo 목록 확인
  - Todo 추가 버튼을 클릭하면 할 일 추가
  - Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소
  - Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 구현
  - 새로고침을 했을 때 현재 상태 유지
  - 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통해 조회 가능
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현
  - 수정되는 Todo의 내용이 목록에서도 실시간으로 반영
  
## 폴더구조
```
  └── src
    ├── apis
    ├── components
    │   ├── Header
    │   ├── ListItem
    │   └── Modal
    ├── hooks
    ├── layouts
    ├── pages
    │   ├── auth
    │   │   ├── Signin
    │   │   └── Signup
    │   └── todo
    ├── routes
    ├── store
    ├── styles
    └── types
```
    
## 설치 및 실행

### 설치

루트 폴더에서 다음과 같이 명령어를 입력하세요. 서버와 클라이언트 패키지가 모두 설치됩니다.

```
$ npm run install
```

### 실행

client 폴더에서 클라이언트 실행 (port 3000)

```
$ npm run client
```

server 폴더에서 서버 실행 (port 8080)

```
$ npm run server
```
