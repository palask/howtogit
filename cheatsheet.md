---
permalink: /
redirect_from:
  - /cheatsheet
---

# Git Cheatsheet

## Basics

1. git init: to start a new repository
2. git status: checks your current state
3. git add -A: To begin tracking files
4. git commit -am: Commit all changes in the working directory with a message added on
5. git switch -c [branch]: Create a branch and switch to it. (git checkout -b will do the same thing)
6. git switch [branch]: switch between named branches
7. git merge [branch]: merge named branch into current branch
8. git branch [branch] -D: delete branch if not tracked
9. git log --pretty=oneline: show a graph of commit history.
11. git push
12. git clone [repo]: Copy of a project/file onto your local computer.
13. git rebase -i: helpful for developing on a local branch and rebasing it to the updated one
14. git restore -- [file]: Reset changes made to file since last commit

### More

https://gitsheet.wtf/

https://ohshitgit.com

VS Code Compare Changes to main:
https://stackoverflow.com/questions/44009551/is-there-a-way-to-see-git-diff-from-origin-master-using-visual-studio-code

## Changes, Search & Gitignore

exclude pdfs from diff:

	git diff ':!*.pdf'

diff staged files:

	git diff --staged

diff for one file:
https://stackoverflow.com/questions/5586383/how-to-diff-one-file-to-an-arbitrary-version-in-git

Search for recent commit containing a search term in its files:
https://stackoverflow.com/a/5816177
Oldest commits first (that introduced the term): --reverse

    git log --all --source -S "SEARCHTERM"

forget commited files now matched by .gitignore:
https://stackoverflow.com/questions/1274057/how-can-i-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitign/19095988#19095988

Get all modified files in branch:
https://stackoverflow.com/questions/10641361/get-all-files-that-have-been-modified-in-git-branch

Reset/Undo all local changes since last commit:
https://docs.gitlab.com/ee/topics/git/numerous_undo_possibilities_in_git/

    git reset -–hard

Create a patch with changes of tracked files:
https://www.specbee.com/blogs/how-create-and-apply-patch-git-diff-and-git-apply-commands-your-drupal-website

    git diff > changes.patch
    
Create a patch with all staged changes:

    git diff --staged > changes.patch
    
Apply patch with changes:
https://stackoverflow.com/questions/14509950/my-diff-contains-trailing-whitespace-how-to-get-rid-of-it

    git apply --reject --whitespace=fix changes.patch

### Stashes

git stash...
https://stackoverflow.com/questions/15264553/how-to-unstash-only-certain-files

https://stackoverflow.com/a/33569970
git stash push -p: https://stackoverflow.com/questions/3040833/stash-only-one-file-out-of-multiple-files-that-have-changed-with-git

Show changes in stash:
https://opensource.com/article/21/4/git-stash

	git stash show stash@{0} -p

Stash multiple files:

	git stash -- FILE1 FILE2

Abort / Undo stash pop with conflict:

	git reset HEAD .
	git checkout -f

stage only unstashed changes:

	git stash push --keep-index

delete last stash:

	git stash drop

apply single stash:

	git stash apply INDEX
	git stash drop stash@{INDEX}

Stash single file with message:
https://stackoverflow.com/questions/12420924/stash-just-a-single-file

	git stash push -m "MESSAGE" FILE

## Commits

Remove last commit locally and remotely:

	git reset HEAD^ # remove commit locally
	git push origin +HEAD # force-push the new HEAD commit

See changes in a commit:
https://stackoverflow.com/questions/17563726/how-can-i-see-the-changes-in-a-git-commit

amend: https://www.atlassian.com/de/git/tutorials/rewriting-history

Change last commit message:
https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message

	git commit --amend

Change message of older commit:
https://docs.github.com/de/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message

1. Show last n commits (replace n with number): `git rebase -i HEAD~n`
2. Replace "pick" with "reword" before respective commit.
3. Save files and edit the commit file that opens and save it as well.

undo commit command:
https://stackoverflow.com/questions/15772134/can-i-delete-a-git-commit-but-keep-the-changes

	git reset HEAD^

undo last commit:
	git reset --soft HEAD~1

add changes to older commit:
https://stackoverflow.com/a/27721031

	git add FIXEDFILES
	git commit --fixup=OLDCOMMITID
	git rebase -i --autosquash OLDCOMMITID^

remove changes to file from older commit:
https://stackoverflow.com/a/32528151

1. `git rebase -i OLDCOMMITID^1`
2. Mark the problem commit for edit in the editor by changing `pick` to `e`.
3. `git show -- BADFILE | git apply -R`
4. `git add BADFILE`
5. `git commit --amend`
6. `git rebase --continue`

## Branches (Creating, Merging & Co.)

Merge multiple commits as one onto another branch:

	git checkout master
	git merge --squash [branch]
	git commit

Delete branch locally and remotely:

	git push -d origin [branch]
	git branch -d [branch]

Force delete local branch: https://www.git-tower.com/learn/git/faq/delete-local-branch

delete remote branch:
https://www.git-tower.com/learn/git/faq/delete-remote-branch

Fix origin of current branch (after rename):
https://stackoverflow.com/a/48100062

Get clean state of origin branch (overwrite all local commits and changes, force pull):

	git reset --hard origin/master

Squash all commits on branch:
https://stackoverflow.com/questions/25356810/git-how-to-squash-all-commits-on-branch

put last commit on new branch:
https://stackoverflow.com/questions/1628563/move-the-most-recent-commits-to-a-new-branch-with-git

rename branch (that you are currently working on):
https://stackoverflow.com/questions/6591213/how-do-i-rename-a-local-git-branch

	git branch -m NEWNAME

rename master to main in new repo:
https://stackoverflow.com/questions/64787301/git-init-b-branch-name-command-in-terminal-is-throwing-an-unknown-switch/65415870#65415870

### Rebasing

Rebase branch onto other branch:

	git rebase OTHERBRANCH
	git push --force-with-lease

Rebase branch onto (previous) commit of other branch:

	git rebase --onto COMMITID OTHERBRANCH
	git push --force-with-lease

change base of branch:
https://stackoverflow.com/a/10853956

abort rebase:

	git rebase --abort

rebase with merge conflict handling:
https://demisx.github.io/git/rebase/2015/07/02/git-rebase-keep-my-branch-changes.html

rebase without changing commit dates when there are merge conflicts:
https://stackoverflow.com/a/2976598

## Remote / Origin / Upstream

git pull and use incoming changes in case of conflicts:

	git pull -X theirs

use incoming changes in case of conflicts in a file:

	git checkout --theirs FILE

fetch remote branch:

	git fetch origin BRANCH

fetch all branches:

	git fetch --all

Change remote for all branches and push everything:
https://stackoverflow.com/questions/18801147/changing-the-git-remote-push-to-default

	git push -u <remote_name> --all

Change remote url:
https://stackoverflow.com/questions/2432764/how-do-i-change-the-uri-url-for-a-remote-git-repository

Force pull (hard reset to origin) when origin commits were overwritten/rebased:
https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files

	git reset --hard origin/BRANCH

Pull changes of another branch (without checkout):
https://stackoverflow.com/questions/18857570/git-pull-without-checkout

	git fetch origin <branch>:<branch>

## Forks

Working on forks:
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork
https://docs.github.com/en/get-started/quickstart/fork-a-repo
https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow

change remote to fork:
https://gist.github.com/jagregory/710671

	git remote -v
	git remote rename origin upstream
	git remote add origin git@github...my-fork
	git fetch origin

## Submodules

https://openmetric.org/til/programming/git-pull-with-submodule/
Initial (auch wenn neue submodules hinzugekommen sind):

	git submodule update --init --recursive

Submodules updaten (zu dem Commit, der im Hauptmodul/Hauptrepo hinterlegt ist):

	git pull --recurse-submodules

Revert changes to all submodules:
https://stackoverflow.com/questions/10906554/how-do-i-revert-my-changes-to-a-git-submodule

	git submodule foreach --recursive git reset --hard

## Config

Initial config:

  git config --global init.defaultBranch main
  git config --global user.email "EMAIL"
  git config --global user.name "USERNAME"

Git LFS:

1. Install:
	1. Install PackageCloud: https://git-lfs.github.com/
	2. `sudo apt install git-lfs`
	3. `git lfs install`
2. Download LFS files in repo: `git lfs pull`

autoSetupRemote:
https://twitter.com/SantoshYadavDev/status/1558086948484530177
