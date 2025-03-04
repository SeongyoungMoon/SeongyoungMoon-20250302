# 올웨이즈 프론트엔드 엔지니어 채용 과제

## 개발 환경 설정

### 1. node.js 설치

vite를 이용해 프로젝트가 build되기 때문에 18.20.2 이상의 node.js를 설치해 주세요.

**node.js 사이트에서 설치**

- https://nodejs.org/ko/

**nvm으로 node.js 설치**

```
# 18.20.2 이상의 버전이 설치되어 있지 않은 경우 설치해 주세요.
$ nvm install 18.20.2

$ nvm use 18.20.2
```

### 2. 의존성 설치

```
# yarn이 설치되어 있지 않은 경우 설치해 주세요.
$ npm install --global yarn

$ yarn install
```

### 3. 로컬 서버 실행

```
$ yarn dev
```

- http://localhost:5173

## 질문

### 0. 과제 구현에 대한 설명, 강조하고 싶은 부분, 설계 의도, 아쉬웠던 점이나, 더 개선할 여지가 있는 부분을 README.md 파일 하단에 작성해주세요.

전체적으로 관심사가 분리된 구조를 가질 수 있도록 작업했습니다.
service, hooks, component, page로 구분하여 각각의 역할을 명확히 하였습니다.
또한, 공통 컴포넌트를 사용하는 디자인 시스템을 적용했습니다.
atomic pattern을 기반으로 컴포넌트를 설계하였는데, 프로젝트가 크지 않다보니 너무 세세하게 나누면 오히려 가독성이 떨어지고 드릴링만 많아질 것 같아서 간단한 구조로 작업했습니다.
무한 스크롤 파트에서는 맨 하단에 LoadingIndicator를 추가하여,
추가 데이터를 로딩하는 동안 ui가 멈춰있지 않도록 개발했습니다.

### 1. 자신의 기술적인 역량을 바탕으로 가장 크게 임팩트(테크적인 임팩트, 비즈니스 임팩트 등)를 만들어 낸 사례가 있다면 그 이유와 함께 작성해주시기 바랍니다.
최근에는 북마크 키링을 개발했던 일이 가장 인상깊습니다.
NFC 태그 업체와 협업하여, 사용자가 NFC 태그를 통해 특정한 페이지에 접근할 수 있는 서비스입니다.
해당 업체에서 제공하는 프라이빗 모드는, 태그를 사용하지 않고 홈페이지에 직접 접근하면 에러 페이지를 보여주고, 
태그를 사용하면 실제 페이지에 도달할 수 있도록 하는 기능입니다. 
하지만 개발 초기 예상과는 달리, 에러 페이지를 커스텀 할 수 없었습니다.
해당 페이지에 구매 유도 페이지를 넣으려고 했기 때문에 큰 문제가 되었습니다. 
그리고 이미 예약판매를 시작해, 개발 일정을 늦출 수 없었습니다.
그래서 홈페이지에 접근할 경우 searchParam을 intercept해서 AuthProvider를 통해 전역에서 관리하고, 
값에 따라 페이지를 리다이렉트 시키도록 빠르게 개발하여 배포하였습니다.
아주 복잡하거나 어려운 코드는 아니었지만, 일정 내에 요구사항이 기능하도록 빠르게 대응하여 문제를 해결했다는 점이 기억에 남습니다.
기쁘게도 북마크 키링은 해당 시즌 신제품 중 가장 많은 판매량을 기록하였습니다.

### 2. 인생이나 커리어 관점에서 향후 목표가 있으시다면 작성해 주시기 바랍니다.
단순히 기술을 개발하는 것이 아니라, 사용자와 직접적으로 소통하고 사용자의 니즈를 예측하여
"쓰고 싶은 서비스"를 만드는 것이 저의 목표입니다.
그러기 위해서는 사용자가 정말로 필요로 하는 기능을 개발하는 능력과,
그것을 편안하게 사용할 수 있도록 유연한 사용감을 만드는 능력이 중요하다고 생각합니다.
제가 만든 서비스가 유저에게 있어 어제보다 나은 오늘을 만들기를 바랍니다.
