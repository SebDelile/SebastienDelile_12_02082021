# Commit Message Format

*This specification is inspired by [the AngularJS commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)*

We have very precise rules over how our Git commit messages must be formatted. This format leads to easier to read commit history.

## Each commit message consists of a header, a body, and a footer.
```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
 ```
The header is mandatory and must conform to the Commit Message Header format.

The body is mandatory for all commits except for those of type "docs". When the body is present it must be at least 20 characters long and must conform to the Commit Message Body format.

The footer is optional. The Commit Message Footer format describes what the footer is used for and the structure it must have.

Any line of the commit message cannot be longer than 100 characters.

## Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: the scope of the changes (optionnal)
  │                          
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
 ```
The `<type>` and `<summary>` fields are mandatory, the (`<scope>`) field is optional.

## Type must be one of the following:

* build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* docs: Documentation only changes
* feat: A new feature
* fix: A bug fix
* perf: A code change that improves performance
* refactor: A code change that neither fixes a bug nor adds a feature
* test: Adding missing tests or correcting existing tests

## Scope
The scope is optionnal, it should indicate which part of the projet is concerned with the change. If the change affect globally the project, do not indicate

## Summary
Use the summary field to provide a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

## Commit Message Body
Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain why you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.

## Commit Message Footer
The footer can contain information about breaking changes and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.
```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```
Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

## Revert commits
If the commit reverts a previous commit, it should begin with revert: , followed by the header of the reverted commit.

The content of the commit message body should contain:
* information about the SHA of the commit being reverted in the following format: This reverts commit <SHA>,
* a clear description of the reason for reverting the commit message.
