
# Rules - `pattern` STAR. situation / Action / Result. 
Good traits of leadership to show in your stories: 
- effective prioritization, 
- timely update stakeholders / surface risk or roadblock, 
- effective expectation management, 
- distribution of work and enable team members, 
- use different approaches to motivate and assign different tasks to team members with different level of skills and personalities
- not just prioritize your team’s goal but prioritize overall organizational goal and enable other teams to achieve their goals

# Questions

## Being a Lead
1. let QA focus on core work
  - `focus`: set full dev/qa env in new computer, onboarding/new computer change
  - `focus`: outside requests: do initial analyze
  - `productivity`: add automation tests and stablize ( jenkins + domo see flaky tests)
  - `productivity`: data sync
  - `productivity`: release capability ( release manager, QA )
1. share knowledge
  - seminar `system arch, PR review principle, automation` for Junior/new comer
  - common knowledge/skills in share doc,  use github markdown, for easier reference
  - common automation tools, programs, api calls via Postman (Bruno-free)
1. retro
  - best practice
  
## Tech Difficulty
`Technical complexity`: 
1. `Focus on` the thought process to find solution
2. `ideally` considered/tried `multiple solutions` before settling on the final solution
- `TERRAFORM` 
  - difficulty
    - decision and design are hard to revert, because you can not undo it, or easily move it
    - no existing knowledge, no architech and Principle, just me and another engineer
    - tech stack is HachiCorp Language
  - action: 
    - considered/tried multiple solutions before settling on the final solution
    - communicate with all departments how their repo orgnaized/configged, in GHE/Azure/GitLab
    - though reaserch and practise + discussion. quiz each other
    - use personal repo for POC, try match our design
  - result: 
    - project works great. extentable

- `PLAYWRIGHT`
  - difficulty
    - no existing knowledge about TypeScript
    - choose between PlayWright + Cypress
  - action: 
    - though reaserch (google, doc)
    - POC of the two, compare result
    - convince QA(change stack) + PO (effort)
  - result: 
    - framework + some tests + CI integration, finish in 3 months
    - QA can easy working on it, because frame POM make things easy
    - PO is happy because stable + faster, open shift-left

- `DBSync`

## Disagree with Collega
### `Selenium TestID`
  - solution: 
    - discuss with Principle Engineer, carries out standard
    - approval PR

### `Terraform big state file`
Terragorm for GitHub org repos
*Tradeoff*:  there will be 200 folders. 
Manager decide one .state file, because it is neat. But after a year, we finally go another way because execution time is very high and we have to monitor it because we are the owner and there are so many requests. 

### `Killbill` - with Arch
Deadline commit from manager is tight we foresee that 
Arch: Killbill. Codebase java. We only updated plugin by contractor. Argument is saves time. End up with rewrite everything and migrate on the fly. we do not have java developer and Killbill has no support. 

- `Team work`: example of you working with other people or team to complete task. `Focus on` how you coordinate with other people/team, not only your personal contribution 

- `Communication / influence`: example of you convincing other people of your suggestion, despite initial resistance. `Focus on` how you use communication skills to change people’s minds, ideally apply different types of communication methods (using presentation, POC, documentation and oral communication) for different audiences, such as technical team, product/business team, leadership etc.

- `Initiative`: example of you noticing works needs to be done or opportunities to explore, without being asked or assigned the task. `Focus on` how you balance extra work with your assigned task, and ideally how you are able to convince leadership to eventually turn the work into mandated work.

- `People management`: example of how you manage difficult team member (eg. unmotivated team members, or strong technical talent but not a good team player, etc.)

- `Stakeholder management`: example of you working with other teams that are very demanding or uncooperative, how do you manage their expectations or turn them around to work well with your team

## Disagree with manager
### Hiring QA co-op.
- I thought it was only 4 month term, and not really worth because we end up with teaching them and cost our effort and they left. Raise the concern 
- but manager say , 
  - 1. That's culture, good for company brand. 
  - 2. We might find young telant. 
- So we did the work, put up interviews, ends up good.
  - 1. We hired around 15-20 co-ops , 
  - 2. we retained 2 now they are our sinior engineer and engineering manager. 
- I tried to copy the way in new team, but this manager rejects it as it would cost our productivity. So we followed his direction. 


## The "Failed Deadline"
### shortcover CD conversion
- **Situation**:
  - try optimize CD pipeline, change the way how to pass in credentials in octo. 
  - OPS propose add scope, will help you: 
    - automate rebuilding windows servers.
- **Action**: 
  - research. knowing original deadline is not practical.
    - not much knowledge in how `converting server` works. because key expert had left the company, forcing me to take on the infrastructure rebuilding myself.
    - chef
    - octo
- **Result**: 
  - Adjust deadline from 2 months to 4 months.
  - The final result was a clean, modular server architecture that allowed for a smooth decommissioning process later.
- **Lesson Learned**: 
  - Don't commit to technical scopes outside your immediate knowledge without deep investigation.
  - Align strictly on Task Ownership and define ETAs only after identifying resource gaps.

### iOS DORA metrics
- **Situation**:
  - add iOS release DORA ( LeadTime + Deployment Frequency )
    - iOS is using appStore release, not internal release process. 
- **Action**: 
  - Planned, designed a complex scenario. ( AppStore only has a callback, we either have GCP function, or host our own App to receive the msg) 
    - design 1: AppStore callback setup
    - design 2: GCP function to trigger internal repo github action ( conver json format )
    - design 3: internal repo github action get PR timeline, push to datadog
  - new scope added in 
    - must use OPS template for GCP
    - GCP function has to be public ( exception ), add github workflow
    - use AppStore SHA add safefuard for this.
  - carries out, so far so good. 
  - iOS changed GitHub credential without telling us, causing `scenario failed` ( this changed the final result timeline ).
- **Result**: 
  - added one month waiting time. 
  - communicate with manager for situation.


## Weakness
### high sense of personal accountability.
```code
Weakness: high sense of personal accountability
  - Do not let people down. 
  - say 'yes' to every request that comes my way.
  - over-commit.
Downside: 
  - carry a big burden, plate is always full.
  - less time on priotity work.
Example: BMSM DB, Shortcover pipeline
Growth: 
  - 'pause and assess' method. check bandwidth and communicate clearly about timelines. 
  - align with manager with priority occasianlly.
Bright side: 
  - people know I am getting things done. 
  - make friends in other team and they support me for my request to them.
```

### nervous at beginning of presentation
```code
Weakness: 
  - first generation immigrant, English is not my nature tone.
  - Tends to use short sentence.
Action: 
  - record video (re-use)
Growth: 
  - better prepartion. 
```

### bad at presentation of telling story
```code
Weakness: 
  - first generation immigrant, English is not my nature tone.
  - Tends to use short sentence.
Downside: 
  - always get point, but not vivid
Growth: 
  - better prepartion. 
```


**Key Professional Achievements (What You're Proud Of)**

- **Quality Excellence**: Pioneered the adoption of Selenium; successfully shipped a major feature with **zero post-release defects**.
- **Cycle Time Reduction**: Automated the release process and CI/CD pipelines, reducing release frequency from **once every 4–7 days** to **1–2 releases per day**.
- **Stability**: As QA Lead, stabilized pipelines to a **75%+ success rate** with a lean 8-minutes execution time.
- **Technical Problem Solving**: Identified flaky integration tests caused by race conditions where multiple solutions accessed the database simultaneously.

**Handling Difficult Colleagues / Conflict Resolution**

- **The UI Developer (Efficiency Conflict)**:

  - **Issue**: Developer refused to add IDs to elements, forcing QA to use brittle Xpaths.
  - **Action**: 
    - Escalated the impact on maintenance time to the Manager and Principle Engineer.
    - Point is it is not you are wrong or you are bad at codeing.
    - But created burdon for other people, and not hard to improve.
  - **Result**: Standardized the use of IDs, significantly saving QA engineering hours.

- **The "Pipeline-as-Compiler" Developer**:

  - **Issue**: A developer frequently committed uncompiled code to the pipeline to save local time, breaking the build for everyone.
  - **Action**: Conducted a private 1-on-1 chat to explain the downstream impact on the team's velocity and the QA process.
  - **Result**: Improved developer accountability and pipeline health.

**Career Progression Summary**

- **2014 – 2017 (QA)**: Foundational software testing and automation.
- **2017 – 2022 (QA Lead)**: Oversaw 3 dev teams; managed Jenkinsfiles; led Selenium/Playwright initiatives; hired and mentored QA Co-ops.
- **2024 (Automation Team)**: Focused on high-level reliability (PagerDuty), DB synchronization, and device team Jenkins integrations. Implemented DORA metrics in Domo.
- **2025 (Platform Engineering)**: Transitioned into full-scale platform stability and developer experience.
