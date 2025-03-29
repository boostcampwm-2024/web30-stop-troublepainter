<div align=center>
  <img width="1000" alt="헤더 (1)" src="https://github.com/user-attachments/assets/03d61582-d3ad-477a-8301-bce895306d8a">
</div>

<br>

<div align=center>

<p align=center>
  <a href="https://inquisitive-beret-c36.notion.site/12855cd93d4f800b91bccc3ccf9d1444?pvs=74">팀 노션</a>
  &nbsp; | &nbsp; 
  <a href="https://github.com/orgs/boostcampwm-2024/projects/212">프로젝트</a>
  &nbsp; | &nbsp;
  <a href="https://www.figma.com/design/Gl1naj84mDIWkG7IHZoVpo/%EC%9B%A8%EB%B2%A0%EB%B2%B1-UI-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=71-124&t=acRqurOAstA2WU8J-1">피그마</a>
  &nbsp; | &nbsp; 
  <a href="https://github.com/boostcampwm-2024/web30-stop-troublepainter/wiki">위키</a>
  <br>
  <a href="https://www.troublepainter.site/">배포 링크</a>
  &nbsp; | &nbsp; 
  <a href="https://boostcampwm-2024.github.io/web30-stop-troublepainter/">TypeDoc</a>
  &nbsp; | &nbsp; 
  <a href="https://boostcampwm-2024.github.io/web30-stop-troublepainter/storybook-develop/?path=/docs/">Storybook</a>
</p>

</div>

## 프로젝트 소개

**방해꾼은 못말려**는 그림꾼 vs 방해꾼, 한 캔버스에서 펼쳐지는 **실시간 드로잉 퀴즈 게임 🎨** 입니다.

```
🎨 그림꾼: 제시어를 그림으로 표현하며 창의력을 발휘하세요

🕵️ 방해꾼: 그림꾼을 방해하며 혼란을 선사하세요

🤔 구경꾼: 그림을 추리하고 정답을 맞춰 승리하세요
```
**지금 바로 친구들과 함께 즐겨보세요!**

<br>

## 기술적 도전

### 🖌️ 실시간 캔버스 동기화

> "여러 명의 팀원과 하나의 캔버스를 공유한다고?"

소켓 통신과 LWW(Last-Write-Wins) 기반 CRDT 알고리즘으로 실시간 동기화 문제를 어떻게 해결했는지, CRDT 테스트까지 풀어낸 과정을 확인해 보세요. 이제 캔버스 상태는 언제나 (거의) 완벽하게 일치합니다.

[🔗 자세히 보기](https://github.com/boostcampwm-2024/web30-stop-troublepainter/wiki/5.-%EC%BA%94%EB%B2%84%EC%8A%A4-%EB%8F%99%EA%B8%B0%ED%99%94%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%88%98%EC%A0%9C-CRDT-%EA%B5%AC%ED%98%84%EA%B8%B0) 

<br />

### 🎨 서드파티 라이브러리 없이 캔버스 구현

> "Canvas API는 엄청 유용합니다!"

복잡한 드로잉 툴을 서드파티 없이 구현하려면 어떻게 해야 할까요? 직접 색상 선택, 스트로크 조절, Undo/Redo 같은 기능을 개발하고, 보간법 같은 최적화 기법까지 사용해 Canvas API를 최대한 사용해봤습니다.

[🔗 자세히 보기](https://github.com/boostcampwm-2024/web30-stop-troublepainter/wiki/4.-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-Canvas-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

<br />

### 🔥 FE 5명의 좌충우돌 서버 구현기

> "실시간 통신? 백엔드 없어도 우리가 만든다!"

인스턴스 생성부터 Docker와 GitHub Actions를 활용한 CI/CD 파이프라인 구축까지. 서버 부담을 줄이기 위한 고민과 도전 과정을 담았습니다.

[🔗 실시간 통신](https://github.com/boostcampwm-2024/web30-stop-troublepainter/wiki/2.-%EC%8B%A4%EC%8B%9C%EA%B0%84-%ED%86%B5%EC%8B%A0)

[🔗 인프라 및 CI/CD 실습](https://github.com/boostcampwm-2024/web30-stop-troublepainter/wiki/3.-%EC%9D%B8%ED%94%84%EB%9D%BC-%EB%B0%8F-CI-CD)

<br />

### 🛠️ 효율적인 FE 아키텍처 설계 

> "FE 아키텍처 설계, 이렇게 하면 될까?"

재사용성, 유연성, 일관된 디자인을 위해 

1. UI와 로직을 깔끔히 분리한 Headless Pattern, Tailwind CSS 도구의 극한 활용
2. 웹소켓을 사용하기 위한 수제 아키텍처

이렇게 해결해본 경험을 공유할게요.

[🔗 자세히 보기](https://github.com/boostcampwm-2024/web30-stop-troublepainter/wiki/6.-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-FE-%EC%84%A4%EA%B3%84)

<br>

## 주요 기능

### 🔗 회원가입 없이 URL 하나로 게임 시작하기!

> 클릭 한 번으로 게임방이 생성되고, 복사된 URL을 공유하면 누구나 쉽게 참여할 수 있습니다.

<table>
  <tr align="center">
    <td><strong>방 만들기 및 초대 URL 공유, 대기실 입장</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img src="https://github.com/user-attachments/assets/895f6246-5ca9-4eca-b0fb-b138075c08c3" alt="방 만들기 화면" />
    </td>
  </tr>
</table>

<br>

### 🎭 신나는 역할 체인지 게임!

> 라운드마다 무작위로 그림꾼 & 방해꾼, 구경꾼으로 역할이 나뉘어 서로 다른 재미를 느낄 수 있습니다.

<table>
  <tr align="center">
    <td><strong>게임 시작 후 역할 랜덤 배정</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/ac136e1d-626c-4000-a524-5b014efe3c88"
        alt="역할 배정 화면"/>
    </td>
  </tr>
</table>

<br>

### 🖌️ 기본에 충실한 드로잉 도구!

> Canvas API의 기본 기능으로 완성도 높은 드로잉 기능을 제공합니다.

<table>
  <tr align="center">
    <td><strong>펜툴 색상, 두께 변경 및 채우기 도구 사용 가능</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/e56e2fae-888c-462e-825b-487b6277e6f5"
        alt="드로잉 도구 시연"/>
    </td>
  </tr>
</table>

<table>
  <tr align="center">
    <td><strong>Undo/Redo 기능</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/7acff86a-72c2-4019-8721-20a62f84fb31" 
        alt="Undo/Redo 기능"/>
    </td>
  </tr>
</table>

<br>

### 🎨 방해꾼과 그림꾼이 실시간으로 하나의 캔버스에서 대결해요!

> 소켓 통신과 CRDT 기반으로 서로의 붓질이 실시간으로 동기화되어 긴장감 넘치는 그리기 대결을 즐길 수 있습니다.

<table>
  <tr align="center">
    <td><strong>실시간으로 그려지는 붓질</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/08620375-d951-4094-8c03-fb16381fbe03" 
        alt="실시간 그리기 화면"/>
    </td>
  </tr>
</table>

<table>
  <tr align="center">
    <td><strong>동시에 여러 명이 그리기</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/861ffb2f-ddb6-45fe-9290-08bbc93489ae" 
        alt="동시 그리기 화면"/>
    </td>
  </tr>
</table>

<br>

### 🎉 게임 종료와 함께 공개되는 최종 결과!

> 정체를 숨기고 있던 방해꾼이 밝혀지는 흥미진진한 순간을 함께 즐겨보세요!

<table>
  <tr align="center">
    <td><strong>방해꾼의 정체 공개</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/b1a22b02-c5a1-4f32-a089-a84b1ea7eaeb" 
        alt="결과 발표 화면"/>
    </td>
  </tr>
</table>

<table>
  <tr align="center">
    <td><strong>최종 순위 발표</strong></td>
  </tr>
  <tr align="center">
    <td>
      <img
        src="https://github.com/user-attachments/assets/4f46b3ee-7112-47c5-bd1b-0e23fbe49498" 
        alt="최종 순위 화면"/>
    </td>
  </tr>
</table>

<br />

## 기술 스택

<div align=center>
  <img src="https://github.com/user-attachments/assets/92d37463-6144-4353-a9ec-81087fbd1a35" width="700"/>
</div>

<table align=center>
    <thead>
        <tr>
            <th>Category</th>
            <th>Stack</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p align=center>Common</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Socket.io-010101?logo=Socket.io">
                <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=ffffff">
                <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=Eslint">
                <img src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=ffffff">
                <img src="https://img.shields.io/badge/.ENV-ECD53F?logo=.ENV&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                  <p align=center>Frontend</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=ffffff">
                <img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p align=center>Backend</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Node.js-114411?logo=node.js">
                <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p align=center>Deployment</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/nginx-014532?logo=Nginx&logoColor=009639&">
                <img src="https://img.shields.io/badge/Naver Cloud Platform-03C75A?logo=naver&logoColor=ffffff">  
                <img src="https://img.shields.io/badge/GitHub Actions-2088FF?logo=GitHub Actions&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p align=center>Collaboration</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Slack-4A154B?logo=Slack&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>

<br>

## 웨베베베벱 팀 소개

5명의 못말리는 FE 개발자들이 모인 팀이에요! 

<table align="center">
  <tr>
    <th><a href="https://github.com/kwaksj329">곽수정</a></th>
    <th><a href="https://github.com/rhino-ty">윤태연</a></th>
    <th><a href="https://github.com/sweetyr928">유미라</a></th>
    <th><a href="https://github.com/aeujoung">정다솔</a></th>
    <th><a href="https://github.com/choiseona">최선아</a></th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/51fab285-bd79-420e-8626-c0ed8ee495e4" width="120" height="120"></td>
    <td><img src="https://github.com/user-attachments/assets/7859d594-9d43-439a-a035-af040d1b368b" width="120" height="120"></td>
    <td><img src="https://github.com/user-attachments/assets/c1abc9ca-780d-4677-825b-c18eed526fa1" width="120" height="120"></td>
    <td><img src="https://github.com/user-attachments/assets/4c45e9b6-eb90-4257-bdfb-faf5b3eacde0" width="120" height="120"></td>
    <td><img src="https://github.com/user-attachments/assets/b435b634-f676-407a-8fba-18c9bc1ace40" width="120" height="120"></td>
  </tr>
  <tr align="center">
    <td>FE<br />👑 팀장</td>
    <td>FE<br />부팀장</td>
    <td>FE, BE<br />BE 팀장</td>
    <td>FE<br />캔버스 팀장</td>
    <td>FE<br />FE 팀장</td>
  </tr>
</table>
