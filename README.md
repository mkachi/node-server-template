# Node Server Template

### Environment

* **NodeJS v11.13.0**
* **Visual Studio Code**

### Folder

* **common** : 프레임워크 모듈들이 있습니다.
  * **loaders** : model, controller와 같은 동적 모듈을 로드하는 소스들이 있습니다.
  * **models** : 프레임워크에서 사용하는 model들이 있습니다.
  * **utils** : 프레임워크의 유틸리티들이 있습니다.
* **configs** : 서버 구동시 필요한 설정 파일들이 있습니다.
* **controllers** : controller들이 들어있는 폴더입니다, 규칙에 맞춰 class를 작성하였다면 이 폴더에 위치한 controller 모듈들은 자동으로 로드됩니다.
* **models** 
  * **DAO** : `DAO(Data Access Object)`들이 있는 폴더입니다, `common/utils/orm`에 있는 `createDAO`함수를 사용하여 `DAO`를 생성할 수 있습니다.
  * **schedules** :  서버에서 일정시간마다 실행되는 스케쥴러들이 있는 폴더입니다, 이 폴더에 위치한 스케쥴러들은 자동으로 로드됩니다.
* **services** : service들이 들어있는 폴더입니다, 이 폴더에 위치한 service 모듈들은 자동으로 로드됩니다.

### Quick Start

```shell
npm install
```

패키지들을 설치합니다.

```shell
npm install -g nodemon ts-node
```

global로 `nodemon`과 `ts-node`를 설치해야 합니다.

```shell
npm start
```

서버를 시작합니다.