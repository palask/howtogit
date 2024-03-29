---
permalink: /
redirect_from:
  - /cheatsheet
---

# HowToGit

This git cheatsheet assumes you have at least some familiarity with git, but want to look up the commands to quickly perform actions on a repository.
A square bracket within a command means that the brackets as well as the name in it needs to be replaced with the actual value. 

## Basics

#### Setup a new repository (project) and work on it

- `git init`: Start a new repository
- `git add .`: Stage all changes (prepare for a commit)
- `git commit -m [MESSAGE]`: Commit the staged changes with a message
- `git push`: Upload local commits to origin

#### Get a remote repository

- `git clone [URL]`: Copy a project onto your local computer
- `git clone [URL] -b [BRANCH]`: Clone from (and switch to) specified branch

#### Show information about the repository

- `git status`: Check your current repository state
- `git log --pretty=oneline`: Show a graph of commit history

## Changes, Search & Gitignore

#### Exclude files by negative wildcard from diff (example: exclude pdfs):

	git diff ':!*.pdf'

#### Show diff of staged files:

	git diff --staged

### Show diff against changes since last commit:

	git diff HEAD^ [FILENAME]

#### Show diff for one file:
<https://stackoverflow.com/questions/5586383/how-to-diff-one-file-to-an-arbitrary-version-in-git>

#### Search for recent commit containing a search term in its files:
<https://stackoverflow.com/a/5816177>
Oldest commits first (that introduced the term): `--reverse`

	git log --all --source -S "[SEARCHTERM]"

#### Forget commited files now matched by .gitignore:
<https://stackoverflow.com/questions/1274057/how-can-i-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitign/19095988#19095988>

#### Global or repo-specific .gitignore just for the current user:
<https://stackoverflow.com/a/5724484>

- Global: `git config --global core.excludesfile $HOME/.gitignore`
- Repo-specific: Edit `.git/info/exclude`

#### Get all modified files in branch:
<https://stackoverflow.com/questions/10641361/get-all-files-that-have-been-modified-in-git-branch>

#### Reset changes to a file since last commit:

	git restore -- [FILE]

#### Reset all local changes since last commit:
<https://docs.gitlab.com/ee/topics/git/numerous_undo_possibilities_in_git/>

	git reset -–hard

#### Stage a file for removal without removing it from the working directory:
<https://stackoverflow.com/questions/38001223/what-is-the-difference-between-git-rm-cached-and-git-reset-file>

	git rm --cached [FILE]

#### Create a patch with changes of tracked files:
<https://www.specbee.com/blogs/how-create-and-apply-patch-git-diff-and-git-apply-commands-your-drupal-website>

	git diff > changes.patch

#### Create a patch with all staged changes:

	git diff --staged > changes.patch

#### Apply patch with changes:
<https://stackoverflow.com/questions/14509950/my-diff-contains-trailing-whitespace-how-to-get-rid-of-it>

	git apply --reject --whitespace=fix changes.patch

#### Undo apply patch:

	git apply changes.patch --reverse

### Stashes

#### Stash only one file:
<https://stackoverflow.com/questions/3040833/stash-only-one-file-out-of-multiple-files-that-have-changed-with-git>

	git stash push -p

#### Unstash only some files:
<https://stackoverflow.com/questions/15264553/how-to-unstash-only-certain-files>

#### Show changes in stash by index number:
<https://opensource.com/article/21/4/git-stash>

	git stash show stash@{[INDEX]} -p

#### Stash multiple files:

	git stash -- [FILE1] [FILE2]

#### Undo stash pop with conflict:

	git reset HEAD .
	git checkout -f

#### Stash only unstaged changes:

	git stash push --keep-index

#### Remove last stash:

	git stash drop

#### Apply and remove last created stash:

	git stash pop

#### Apply single stash by index number:

	git stash apply [INDEX]
	git stash drop stash@{[INDEX]}

#### Stash single file with message:
<https://stackoverflow.com/questions/12420924/stash-just-a-single-file>

	git stash push -m "[MESSAGE]" [FILE]

#### Save stash by index number as a patch:
<https://stackoverflow.com/questions/3973034/export-a-stash-to-another-computer>

	git stash show stash@{[INDEX]} -p > changes.patch

## Commits

#### Remove last commit locally and remotely:

1. Remove commit locally: `git reset HEAD^`
2. Force-push the new HEAD commit: `git push origin +HEAD`

#### See changes in a commit:
<https://stackoverflow.com/questions/17563726/how-can-i-see-the-changes-in-a-git-commit>

#### Amend to last commit:
<https://www.atlassian.com/de/git/tutorials/rewriting-history>

#### Change last commit message:
<https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message>

	git commit --amend

#### Change message of older commit:
<https://docs.github.com/de/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message>

1. Show last n commits (replace n with number): `git rebase -i HEAD~n`
2. Replace "pick" with "reword" before respective commit.
3. Save files and edit the commit file that opens and save it as well.

#### Undo commit and keep changes:
<https://stackoverflow.com/questions/15772134/can-i-delete-a-git-commit-but-keep-the-changes>

	git reset HEAD^

#### Undo last commit without keeping changes:
	git reset --soft HEAD~1

#### Add changes to older commit:
<https://stackoverflow.com/a/27721031>

	git add FIXEDFILES
	git commit --fixup=[OLDCOMMITID]
	git rebase -i --autosquash [OLDCOMMITID]^

#### Remove changes to file from older commit:
<https://stackoverflow.com/a/32528151>

1. `git rebase -i [OLDCOMMITID]^1`
2. Mark the problem commit for edit in the editor by changing `pick` to `e`.
3. `git show -- [BADFILE] | git apply -R`
4. `git add [BADFILE]`
5. `git commit --amend`
6. `git rebase --continue`

#### Remove older commit:

1. `git rebase -i HEAD~[N]` to list last *N* commits
2. Remove the line of the commit that shall be deleted

#### Remove initial commit if there are no other commits, but keep changes staged:

	git update-ref -d HEAD

#### Add single commit from other branch (cherry-pick):
<https://stackoverflow.com/questions/9339429/what-does-cherry-picking-a-commit-with-git-mean>

	git cherry-pick [COMMITID]

#### Sign commits with ssh key:
<https://git.openlogisticsfoundation.org/help/user/project/repository/signed_commits/ssh.md>

	git config --global gpg.format ssh
	git config --global commit.gpgsign true
	git config --global user.signingkey ~/.ssh/[KEYFILE].pub

## Tags

### List all tags

	git tag

#### Add tag for the current commit:
<https://stackoverflow.com/questions/18216991/create-a-tag-in-a-github-repository>

1. `git tag [TAGNAME]`
2. To push all tags: `git push origin --tags`

#### Add tag for a commit:

1. `git tag [TAGNAME] [COMMITID]`
2. To push all tags: `git push origin --tags`

## Branches (Creating, Merging & Co.)

#### Create branch and switch to it:

	git checkout -b [BRANCH]

#### Create branch from a previous commit:
<https://stackoverflow.com/questions/2816715/branch-from-a-previous-commit-using-git>

	git branch -b [BRANCH] [COMMITID]

#### Switch to an existing branch:

	git checkout [BRANCH]

#### Switch to last active branch (from detached head):
<https://stackoverflow.com/questions/11801071/git-how-to-return-from-detached-head-state>

	git checkout -

#### Switch to remote branch:
<https://www.git-tower.com/learn/git/faq/checkout-remote-branch>

	git checkout --track [REMOTENAME]/[BRANCHNAME]

#### List all local branches:

	git branch

#### List all remote branches:

	git branch -a

#### Merge branch into current branch (add commits from other branch):

	git merge [BRANCH]

#### Merge multiple commits as one onto another branch:

	git checkout master
	git merge --squash [BRANCH]
	git commit

#### Remove branch locally and remotely:

- Local: `git branch -d [BRANCH]`
- Remote: `git push -d origin [BRANCH]`

#### Remove local branch:
<https://www.git-tower.com/learn/git/faq/delete-local-branch>

- Safe removal (checks if merged etc.): `git branch -d [BRANCH]`
- Force removal: `git branch -D [BRANCH]`

#### Remove remote branch:
<https://www.git-tower.com/learn/git/faq/delete-remote-branch>

`git push origin --delete [BRANCH]`

#### Remove all commits from branch on repository:

1. Create empty folder
2. `git init`
3. `git commit --allow-empty -m "Initial commit"`
4. `git remote add origin [URL]`
5. `git branch --set-upstream [BRANCH] origin/[BRANCH]`
6. `git push -f`

#### Fix origin of current branch (after rename):
<https://stackoverflow.com/a/48100062>

#### Squash all commits on branch:
<https://stackoverflow.com/questions/25356810/git-how-to-squash-all-commits-on-branch>

#### Squash and rebase:
<https://www.jenweber.dev/how-to-squash-and-rebase/>

#### Put last commit on new branch:
<https://stackoverflow.com/questions/1628563/move-the-most-recent-commits-to-a-new-branch-with-git>

#### Rename branch (that you are currently working on):
<https://stackoverflow.com/questions/6591213/how-do-i-rename-a-local-git-branch>

	git branch -m [NEWNAME]

#### Change remote for one branch (e.g. for branches on forks):
<https://stackoverflow.com/questions/4878249/how-to-change-the-remote-a-branch-is-tracking>

    git fetch [REMOTENAME]
    git branch [BRANCHNAME] --set-upstream-to [REMOTENAME]/[BRANCHNAME]

#### Merge and favor changes of own or other branch:
<https://stackoverflow.com/a/33569970>

#### Rename master to main in new repo:
<https://stackoverflow.com/questions/64787301/git-init-b-branch-name-command-in-terminal-is-throwing-an-unknown-switch/65415870#65415870>

### Rebasing

#### Rebase branch onto other branch:

	git rebase [OTHERBRANCH]
	git push --force-with-lease

#### Rebase branch onto (previous) commit of other branch:

	git rebase --onto [COMMITID] [OTHERBRANCH]
	git push --force-with-lease

#### Interactive rebasing

	git rebase -i

#### Interactive rebasing from first commit on (with all commits)

	git rebase -i --root

#### Change base of branch:
<https://stackoverflow.com/a/10853956>

#### Abort rebase:

	git rebase --abort

#### Rebase with merge conflict handling:
<https://demisx.github.io/git/rebase/2015/07/02/git-rebase-keep-my-branch-changes.html>

#### Rebase without changing commit dates when there are merge conflicts:
<https://stackoverflow.com/a/2976598>

## Remote (Origin / Upstream)

#### Pull and use incoming changes in case of conflicts:

	git pull -X theirs

#### Use incoming changes in case of conflicts in a file:

	git checkout --theirs [FILE]

#### Fetch remote branch:

	git fetch origin [BRANCH]

#### Fetch all branches:

	git fetch --all

#### Change remote for all branches and push everything:
<https://stackoverflow.com/questions/18801147/changing-the-git-remote-push-to-default>

	git push -u [REMOTENAME] --all

#### Change remote url:
<https://stackoverflow.com/questions/2432764/how-do-i-change-the-uri-url-for-a-remote-git-repository>

#### Force pull (hard reset to origin, get clean state) when origin commits were overwritten/rebased:
<https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files>

	git reset --hard origin/[BRANCH]

#### Pull changes of another branch (without checkout):
<https://stackoverflow.com/questions/18857570/git-pull-without-checkout>

	git fetch origin [BRANCH]:[BRANCH]

## Forks

#### Working on forks:
<https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork>

<https://docs.github.com/en/get-started/quickstart/fork-a-repo>

<https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow>

#### Change remote to fork:
<https://gist.github.com/jagregory/710671>

	git remote -v
	git remote rename origin upstream
	git remote add origin [FORKURL]
	git fetch origin

#### Checkout a branch from a fork:
<https://stackoverflow.com/questions/1783405/how-do-i-check-out-a-remote-git-branch>

	git remote add [REMOTENAME] [REMOTEURL]
	git fetch [REMOTENAME]
	git checkout [BRANCHNAME]

## Submodules

#### Initialize submodules (also when new ones were added to the repo):
<https://openmetric.org/til/programming/git-pull-with-submodule/>

	git submodule update --init --recursive

#### Update submodules:

	git pull --recurse-submodules

#### Revert changes to all submodules:
<https://stackoverflow.com/questions/10906554/how-do-i-revert-my-changes-to-a-git-submodule>

	git submodule foreach --recursive git reset --hard

## Config

#### Initial config:

	git config --global init.defaultBranch main
	git config --global user.email "[EMAIL]"
	git config --global user.name "[USERNAME]"

#### Show full config:

	git config --list

#### Change author in previous commits:
<https://www.git-tower.com/learn/git/faq/change-author-name-email>

1. `git rebase -i` ([Interactive rebasing](#interactive-rebasing))
2. Mark commits to change with `edit`
3. For each commit:
	1. `git commit --amend --author="[USERNAME] <[EMAIL]>" --no-edit`
	2. `git rebase --continue`

#### Multiple author identities (different identity per repo):
<https://garrit.xyz/posts/2023-10-13-organizing-multiple-git-identities>

#### Useful defaults:
<https://spin.atomicobject.com/2020/05/05/git-configurations-default/>
<https://jvns.ca/blog/2024/02/16/popular-git-config-options/>

	git config --global pull.rebase true
	git config --global diff.colorMoved zebra
	git config --global rebase.autosquash true

#### Git LFS:

1. Install:
	1. Install PackageCloud: <https://git-lfs.github.com/>
	2. `sudo apt install git-lfs`
	3. `git lfs install`
2. Download LFS files in repo: `git lfs pull`

#### autoSetupRemote:
<https://twitter.com/SantoshYadavDev/status/1558086948484530177>

## More

<https://www.cheatsheet.wtf/Git/>

<https://ohshitgit.com>

<https://developers.redhat.com/articles/2023/08/02/beginners-guide-git-version-control>

GitFlow Workflow: <https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow>

#### Git Tools / Helpers

- <https://github.com/jesseduffield/lazygit>

#### VS Code Compare Changes to main:
<https://stackoverflow.com/questions/44009551/is-there-a-way-to-see-git-diff-from-origin-master-using-visual-studio-code>

#### Exit default git editor in the terminal:
\[esc\], `:x!`, \[enter\]
