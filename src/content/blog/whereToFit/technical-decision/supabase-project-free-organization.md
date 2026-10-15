---
title: "[의사결정기록] WhereToFit Supabase 프로젝트의 무료 조직 분리"
project: whereToFit
type: technical-decision
tags: [Supabase, CloudKit, Cloudflare]
discussionStartedAt: 2026-10-11
discussionEndedAt: 2026-10-12
---

# [의사결정기록] WhereToFit Supabase 프로젝트의 무료 조직 분리

논의 날짜: 2026-10-11 (일) ~ 2026-10-12 (월)

Supabase 유료 결제를 검토하면서, 별개 앱인 WhereToFit 프로젝트를 어떻게 운영할지 논의했다. WhereToFit은 Supabase에서 시설·프로그램과 추천 규칙을 조회하고 Edge Function을 호출한다. 사용자 기록은 CoreData와 CloudKit 기반으로 관리한다. 프로젝트를 계속 개발할지 확실하지 않은 상황에서, 별도 프로젝트 비용과 앱 간 관리 경계를 함께 고려해야 했다.

## 의견

### 유료 Supabase 프로젝트에 함께 두기

다른 앱과 하나의 유료 조직을 사용하면 프로젝트 수를 줄일 수 있다. 다만 예린은 서로 다른 앱의 데이터를 한곳에서 관리하면 헷갈릴 수 있다고 판단했다.

### 전용 API·데이터베이스로 이전하기

Cloudflare Workers와 D1을 조합하는 방안이 검토됐다. 시설 검색과 갱신이 계속 필요하다면 별도 백엔드 구성이 가능하지만, 새 저장소와 API를 운영해야 한다.

### CloudKit 공개 데이터베이스 사용하기

WhereToFit 전용 CloudKit 공개 데이터베이스에 앱 공용 시설 데이터를 둘 수 있다. 하지만 기존 Supabase 조회와 Edge Function 흐름을 CloudKit 중심으로 다시 구성해야 한다.

## 결과

현재 Supabase 계정에 별도 무료 조직을 만들고, 기존 WhereToFit 프로젝트를 그 조직으로 이전하기로 했다. 새 계정이나 새 Supabase 프로젝트를 만드는 방안은 선택하지 않았다.

프로젝트 이전 자체는 아직 실행하거나 검증하지 않았다.

## 선정 이유

다른 앱과 프로젝트 관리 경계를 분리하면서 유료 조직의 추가 프로젝트 비용을 피할 수 있다. 또 기존 프로젝트를 조직 간에 그대로 이전하는 방향이므로, 새 프로젝트에 데이터와 Edge Function을 복사하는 작업이 생기지 않는 방향이다. 다만 무료 프로젝트 한도와 이전 자격은 이전 전에 확인해야 하고, 이전 후 앱의 URL·키 연결을 검증해야 한다.
