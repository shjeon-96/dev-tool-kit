import type { CheatsheetItem } from "../model/types";

export const gitCommands: CheatsheetItem[] = [
  // Setup & Config
  {
    code: "git init",
    name: "Initialize repository",
    description: "Create a new Git repository",
    category: "Setup",
  },
  {
    code: "git clone <url>",
    name: "Clone repository",
    description: "Clone a repository into a new directory",
    category: "Setup",
  },
  {
    code: "git config --global user.name '<name>'",
    name: "Set username",
    description: "Set your Git username globally",
    category: "Setup",
  },
  {
    code: "git config --global user.email '<email>'",
    name: "Set email",
    description: "Set your Git email globally",
    category: "Setup",
  },

  // Basic Commands
  {
    code: "git add <file>",
    name: "Stage file",
    description: "Add file contents to the staging area",
    category: "Basic",
  },
  {
    code: "git add .",
    name: "Stage all",
    description: "Stage all changes in current directory",
    category: "Basic",
  },
  {
    code: "git commit -m '<message>'",
    name: "Commit",
    description: "Record changes to the repository",
    category: "Basic",
  },
  {
    code: "git status",
    name: "Status",
    description: "Show the working tree status",
    category: "Basic",
  },
  {
    code: "git diff",
    name: "Diff",
    description: "Show changes between commits or working tree",
    category: "Basic",
  },
  {
    code: "git log",
    name: "Log",
    description: "Show commit logs",
    category: "Basic",
  },
  {
    code: "git log --oneline",
    name: "Log oneline",
    description: "Show commit logs in one line format",
    category: "Basic",
  },

  // Branch Operations
  {
    code: "git branch",
    name: "List branches",
    description: "List all local branches",
    category: "Branch",
  },
  {
    code: "git branch <name>",
    name: "Create branch",
    description: "Create a new branch",
    category: "Branch",
  },
  {
    code: "git branch -d <name>",
    name: "Delete branch",
    description: "Delete a branch",
    category: "Branch",
  },
  {
    code: "git checkout <branch>",
    name: "Switch branch",
    description: "Switch to a branch",
    category: "Branch",
  },
  {
    code: "git checkout -b <name>",
    name: "Create & switch",
    description: "Create and switch to a new branch",
    category: "Branch",
  },
  {
    code: "git switch <branch>",
    name: "Switch (new)",
    description: "Switch to a branch (Git 2.23+)",
    category: "Branch",
  },
  {
    code: "git merge <branch>",
    name: "Merge branch",
    description: "Merge a branch into current",
    category: "Branch",
  },

  // Remote Operations
  {
    code: "git remote -v",
    name: "List remotes",
    description: "List remote connections",
    category: "Remote",
  },
  {
    code: "git remote add <name> <url>",
    name: "Add remote",
    description: "Add a new remote repository",
    category: "Remote",
  },
  {
    code: "git fetch",
    name: "Fetch",
    description: "Download objects and refs from remote",
    category: "Remote",
  },
  {
    code: "git pull",
    name: "Pull",
    description: "Fetch and merge from remote",
    category: "Remote",
  },
  {
    code: "git push",
    name: "Push",
    description: "Update remote refs",
    category: "Remote",
  },
  {
    code: "git push -u origin <branch>",
    name: "Push with upstream",
    description: "Push and set upstream branch",
    category: "Remote",
  },

  // Undo Operations
  {
    code: "git reset <file>",
    name: "Unstage file",
    description: "Unstage a file while retaining changes",
    category: "Undo",
  },
  {
    code: "git reset --hard",
    name: "Hard reset",
    description: "Reset working directory to last commit",
    category: "Undo",
  },
  {
    code: "git reset --soft HEAD~1",
    name: "Undo last commit",
    description: "Undo last commit, keep changes staged",
    category: "Undo",
  },
  {
    code: "git revert <commit>",
    name: "Revert commit",
    description: "Create a new commit that undoes changes",
    category: "Undo",
  },
  {
    code: "git checkout -- <file>",
    name: "Discard changes",
    description: "Discard changes in working directory",
    category: "Undo",
  },
  {
    code: "git restore <file>",
    name: "Restore file",
    description: "Restore file (Git 2.23+)",
    category: "Undo",
  },

  // Stash
  {
    code: "git stash",
    name: "Stash changes",
    description: "Stash current changes",
    category: "Stash",
  },
  {
    code: "git stash list",
    name: "List stashes",
    description: "List all stashed changes",
    category: "Stash",
  },
  {
    code: "git stash pop",
    name: "Pop stash",
    description: "Apply and remove latest stash",
    category: "Stash",
  },
  {
    code: "git stash apply",
    name: "Apply stash",
    description: "Apply latest stash without removing",
    category: "Stash",
  },
  {
    code: "git stash drop",
    name: "Drop stash",
    description: "Remove latest stash",
    category: "Stash",
  },

  // Tags
  {
    code: "git tag",
    name: "List tags",
    description: "List all tags",
    category: "Tags",
  },
  {
    code: "git tag <name>",
    name: "Create tag",
    description: "Create a lightweight tag",
    category: "Tags",
  },
  {
    code: "git tag -a <name> -m '<msg>'",
    name: "Annotated tag",
    description: "Create an annotated tag",
    category: "Tags",
  },
  {
    code: "git push --tags",
    name: "Push tags",
    description: "Push all tags to remote",
    category: "Tags",
  },

  // Advanced
  {
    code: "git rebase <branch>",
    name: "Rebase",
    description: "Reapply commits on top of another base",
    category: "Advanced",
  },
  {
    code: "git cherry-pick <commit>",
    name: "Cherry-pick",
    description: "Apply a specific commit",
    category: "Advanced",
  },
  {
    code: "git bisect start",
    name: "Bisect start",
    description: "Start binary search for bad commit",
    category: "Advanced",
  },
  {
    code: "git reflog",
    name: "Reflog",
    description: "Show reference logs",
    category: "Advanced",
  },
  {
    code: "git clean -fd",
    name: "Clean",
    description: "Remove untracked files and directories",
    category: "Advanced",
  },
];
