## release pipeline optimization
1. problem: toil, and release manager sometimes not comfortable with git options.
2. result: fully automated, no longer need dedicated release manager.
3. did: 
    - automate how we cut pipeline: python, 
      - check tags/reviews
      - pull unmerged release
      - pull candidates, discard if there is merge conflict
      - push the release branch
      - modify the release ticket to certain status
      - run jenkins job ( to build/deploy, tests included)
      - notification
    - in progress notification: 
      - send slack msg when certain steps are done. notify QA to test on different env
      - hold production defaulting, allow one more round of tests
      - production defaulting
      - if there is roll back: click one button in jenkins, system rolled back by API calls. 
    - merge release branch
      - wait for prod default for 4~6 hours ( internal API)
      - python: merge release branch to main
      - modify the release ticket to certain status
4. diffculty:
      - DB delta scripts can not be automated ( rely on DBA) - 
          - if delete column, code must release 1 day before. then DBA apply, next day. 
          - if add column, DBA apply first, then code. 
      - a lot of APIs across multiple systems: Jenkins, Octo, Slack, Github, Clickup, old system. 
      - `tag QA name in slack` because slack requires ID. 
          - set up slack app to fetch. 
          - pipeline calls release ticket to get assigned UserID and UserEmail, 
          - call slack app to fetch slack ID
          - format msg send to QA and in channel
      - finding the interal API because OPS does not know this. 
      - python scripts with GPG sign ( private key saved in jenkins has /n issue when load )

## DBsync
1. problem: our DB need synced features/products/price, and this across : 
    - DBA sync at `Sunday` morning because less traffic
    - wait for team to pick up, and Data in .bak files could been out of date if publisher sent updates on the products. 
    - using those data to fetch CMS system( not using DB, use Json) could result in nothing. bad data.
2. result: fully automated process. 
3. did:
    - scheduled jenkins to run fetch DB
    - change PR to use new version, change build files 
    - build  using new DB 
    - fetch generate dependencies(.nupkg) package based on new DB and CMS
    - build/deploy downstream microservices ( mock, QAservice)
    - run tests to get tags
4. diffculty:
    - find proper node can access production / CMS / testing env
    - change build files
    - handles chain of actions. 

## Terraform
0. also has GCP function / storage
1. problem: GHC manage, highly depends on admin manual
2. result: `IaC, GitOps`, automated most resources, repo/team/
3. did: without any experience. learn this. 
    - import existing GHC resource using Terraform
    - created a action worflow to automate: 
      - migrate repos from GHE, using GHC importing process, then migrated to tfstate
4. diffculty:
    - when planned this project, we do not know too much, but need to present a mature plan because once tfstate is done, modify is really hard
    - debugging in Terraform is not easy
    - hard to foresee the performance, per > 400 repos, speed becomes slow. 
    - tf lock
    - migration goes wrong, logs are not helpful, need to ask Github side

