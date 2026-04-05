# Interview

###　foundation for successfully scaling GitHub Actions reusability across an enterprise environment:
1. Understanding **common use cases across the enterprise**: Conduct a comprehensive analysis of workflow patterns and technical requirements to identify high-impact reuse opportunities.
1. Create a **centralized hub** that serves as your internal marketplace for discovering and contributing to reusable components.
1. standardized **naming conventions**: Create intuitive, descriptive naming patterns that improve discoverability and indicate functional purpose.
1. **Educate** and enable teams: Provide comprehensive documentation, training, and support to drive adoption and proper implementation.
1. **Maintain and best practices**: code quality, documentation, and validation to maintain consistency and reliability.
1. **security, developer velocity, and maintainability at scale**.

Here are 3 real-world problems a senior GitHub Actions engineer faces and how to solve them:

1\. Secret Sprawl and "Leaky" Logs

- **The Problem**: As an organization scales, managing secrets across hundreds of repos becomes a nightmare. 
- **The Fix**:
  - **OIDC & Identity Federation**: Stop using long-lived secrets (like AWS Access Keys). Use **OpenID Connect (OIDC)** to let GitHub Actions retrieve short-lived tokens directly from your cloud provider.
  - **Environment Protection**: Use **Environments** with required reviewers.

2\. The "Action Version" Supply Chain Attack

- **The Problem**: Most teams use tags like `uses: actions/checkout@v4`. 
- **The Fix**:
  - **SHA Pinning**: Force a policy to use immutable **commit SHAs** (e.g., `actions/checkout@8ade135...`).
  - **Dependabot Automation**: Use Dependabot to automatically manage these SHAs. It will open a PR when a new version is out, allowing you to audit the code change before updating the hash.

3\. Pipeline Bottlenecks and "Runner" Costs

- **The Fix**:

  - **Smart Caching & Turbo-scaling**: Implement granular **`actions/cache`** strategies and use `nx` or `turborepo` to only run tests on affected files.
  - **Ephemeral Self-Hosted Runners**: Move heavy workloads to auto-scaling self-hosted runners (using KEDA or ARC) on your own infrastructure.


# Triggers

| Trigger / Feature         | Primary Purpose                   | How it is Initiated                                                                                                               | Key Features                                                                                                                                         |
| ------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`push: tags`**          | Triggers on **version releases**. | `git push origin <tagname>` or via GitHub [Releases](https://acenet-arc.github.io/git-collaboration/08-Tags-Releases/index.html). | Uses [glob patterns](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions) (e.g., `v*`) to match specific tag formats. |
| **`workflow_call`**       | Enables **reusable workflows**.   | Called by a "caller" workflow.                                                                                                    | Supports inputs and secrets. Centralizes common logic.                                                                                               |
| **`workflow_dispatch`**   | Allows for **manual execution**.  | Via the GitHub UI "Run workflow" button or GitHub CLI.                                                                            | Custom form inputs. Ideal for ad-hoc tasks.                                                                                                          |
| **`repository_dispatch`** | Triggers via **external events**. | REST API POST request to GitHub.                                                                                                  | Receives custom JSON payloads from outside GitHub.                                                                                                   |
| **`composite action`**    | Bundles **multiple steps**.       | Used as a `step` within a job.                                                                                                    | Simplifies complex, repetitive logic into one action.                                                                                                |

To trigger workflows based on **Git tags**, you primarily use the `push` event with a `tags` or `tags-ignore` filter.
You can define specific patterns to control which tags trigger your workflow.

- **Trigger on any tag**:

  ```yaml
  on:
    push:
      tags:
        - '*' # Matches any tag without a forward slash
  ```

- **Trigger on version patterns (e.g., v1.0, v2.1)**:

  ```yaml
  on:
    push:
      tags:
        - 'v*' # Matches tags starting with 'v'
  ```

- **Exclude specific tags**:

  ```yaml
  on:
    push:
      tags-ignore:
        - '*-alpha' # Ignores tags ending in '-alpha'
  ```

These guides detail how to trigger GitHub Actions using Git tags and relevant workflow configurations:

**Important Note:** If you define *only* `tags`, the workflow will **not** run on regular branch pushes. To trigger on both, you must explicitly list both `branches` and `tags`. Additionally, if a workflow step creates a tag using the default `GITHUB_TOKEN`, it will **not** trigger subsequent workflows to prevent infinite loops; use a [Personal Access Token (PAT)](https://github.com/orgs/community/discussions/25617) if you need to chain them.
