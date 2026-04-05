# AI Scenario - Caller Workflows

This document maps the execution logic for each workflow in `caller/`.

## 1) `caller/pr-build.yml`

```mermaid
flowchart TD
  A[Trigger pull_request any branch] --> B[Concurrency workflow ref cancel in progress true]
  B --> C[Job build reusable dotnet build]
  B --> D[Job test matrix]
  B --> E[Job publish matrix]

  D --> D1[Unit tests Kobo Metadata UnitTests]
  D --> D2[Integration tests Kobo Metadata IntegrationTests]
  D --> D3[Acceptance tests Kobo Metadata AcceptanceTests]

  E --> E1[Dockerize Api Kobo Metadata Api]
  E --> E2[Dockerize Worker Kobo Metadata Worker]

  C --> F[Job set result always]
  D1 --> F
  D2 --> F
  D3 --> F
  E1 --> F
  E2 --> F

  F --> G[Check all needs are success]
  G --> H[Final PR status pass]
  G --> I[Final PR status fail exit 1]
```

## 2) `caller/release-build.yml`

```mermaid
flowchart TD
  A[Trigger push main with paths ignore] --> B[Concurrency repo release no cancel in progress]
  B --> C[Job create semver tag]
  C --> D[Job publish matrix needs semver tag]

  D --> D1[Publish Api image with image version]
  D --> D2[Publish Worker image with image version]

  D1 --> E[Job create GitHub release]
  D2 --> E
  C --> E

  C --> F[Job cleanup tag on failure condition]
  D1 --> F
  D2 --> F
  E --> F

  F --> G[If failure and tag exists and downstream failed]
  G --> H[Delete release tag]
  G --> I[Skip cleanup]
```

## 3) `caller/release-coverage.yml`

```mermaid
flowchart TD
  A[Trigger push main with paths ignore] --> B[Concurrency repo test coverage no cancel in progress]
  B --> C[Job coverage matrix]
  C --> D[Run unit tests reusable coverage workflow]
  D --> E[Upload coverage to Datadog]
```

## 4) `caller/codeql.yml`

```mermaid
flowchart TD
  A[Trigger push main] --> D[Concurrency codeql repo prOrRef cancel in progress true]
  B[Trigger pull request main] --> D
  C[Trigger schedule weekly cron UTC] --> D

  D --> E[Job codeql reusable ghas codeql csharp]
  E --> F[Matrix csharp autobuild dotnet 8]
  E --> G[Matrix actions no build]
  F --> H[Upload security findings]
  G --> H
```

## 5) `caller/dependency-review.yml`

```mermaid
flowchart TD
  A[Trigger pull request main] --> B[Concurrency dependency review by PR number cancel in progress true]
  B --> C[Job dependency review]
  C --> D[Run shared dependency review action]
  D --> E[Post result on pull request]
```

## 6) `caller/pr-format.yml`

```mermaid
flowchart TD
  A[Trigger PR opened edited synchronize] --> C[Concurrency workflow ref cancel in progress true]
  B[Trigger manual workflow dispatch] --> C
  C --> D[Job semantic PR check]
  D --> E[Run semantic pull request title action]
  E --> F[Check ignore labels rule]
  F --> G[Skip strict validation for ignored labels]
  F --> H[Enforce semantic title rule]
  H --> I[Pass or fail based on title]
```

## Interview Notes

- Reusable workflows are pinned by commit SHA for reproducibility.
- `secrets: inherit` passes caller secrets into reusable workflows.
- Concurrency differs by scenario:
  - PR workflows cancel stale runs for faster feedback.
  - Release workflows do not cancel in progress runs to protect release integrity.
- Matrix jobs scale horizontally for tests and image publishing.
- Release cleanup logic removes tags when downstream release steps fail.
