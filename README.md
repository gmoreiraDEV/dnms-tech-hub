# DNMS Tech | Hub Platform

## A web platform built with Next.js, React 19, and Tailwind CSS to connect the Christian tech community.

## 🚀 Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/gmoreiraDEV/dnms-tech-hub.git
cd dnms-tech-hub
```

2. Install dependencies:

```bash
npm install
```

3. Start in development mode using Turbopack:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Conventional Commits

This project uses [Commitizen](https://github.com/commitizen/cz-cli) and [Commitlint](https://commitlint.js.org/) to enforce conventional commit messages.

### Make a proper commit:

```bash
npm run commit
```

Or add all staged files and commit interactively:

```bash
npm run commit:all
```

> All commit messages are validated against the `conventional-changelog` standard.

---

### Commit Message Format

Commit messages should follow the format:
`type(scope): message`

Allowed types:

```
build: Changes that affect the build system or dependencies
chore: Miscellaneous changes that don’t modify source or test files
ci: Continuous integration-related changes
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
revert: Reverts a previous commit
style: Code style changes (formatting, missing semicolons, etc.)
test: Adding or correcting tests
```

Examples:

```
feat(auth): add Google login
fix(api): handle 404 error on fetch
docs(readme): add commit instructions
chore(deps): update eslint and prettier
```

---

## 🔍 Linting and Formatting

ESLint and Prettier are integrated using lint-staged and husky.
Run lint manually:

```bash
npm run lint
```

Auto-run on commit:
`lint-staged` automatically formats and lints staged files before every commit.

### Run lint manually:

```bash
npm run lint
```

---

## 🔧 Tooling Overview

| Tool         | Purpose                                |
| ------------ | -------------------------------------- |
| Next.js 15   | React framework with SSR support       |
| React 19     | UI components and rendering            |
| TypeScript   | Static typing                          |
| Tailwind CSS | Utility-first styling                  |
| Husky        | Git hooks (`pre-commit`, `commit-msg`) |
| Commitlint   | Commit message validation              |
| Commitizen   | Interactive commit prompt              |
| Prettier     | Code formatting                        |
| ESLint       | Linting for JS/TS with Next.js rules   |

---

## 📦 Available Scripts

```json
"dev": "next dev --turbopack",
"build": "next build",
"start": "next start",
"lint": "next lint",
"prepare": "husky install",
"commit": "cz",
"commit:all": "git add . && npm run commit"
```

---

## 🛠️ Post-clone Setup

After cloning the repository and installing dependencies, run:

```bash
npx husky install
```

## This ensures Git hooks are correctly set up.

## 📄 License

[MIT](LICENSE) • Project developed by Dunamis Tech community
