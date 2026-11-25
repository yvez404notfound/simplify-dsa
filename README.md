# Simplify DSA

A growing collection of coding and LeetCode solutions, with detailed explanations in TypeScript.

I created this repository to document what I learn while solving data structures and algorithms problems. It’s a place I can return to when I need to revisit a solution, refresh a concept, or remember why
an approach works.

I’m sharing these notes so others can learn from them too. The goal isn’t just to provide an answer—it’s to make the reasoning behind it easier to understand.

## What you’ll find

Each problem has its own folder containing:

- **`README.md`** — The problem statement, examples, and a detailed explanation of the solution.
- **`index.ts`** — The TypeScript implementation.
- **`index.spec.ts`** — Tests for the implementation.

The write-ups document the techniques used and their time and space complexity, helping connect individual solutions to reusable problem-solving patterns.

## Table of Contents

Problems are grouped by topic so you can revisit a concept or practice related techniques together. Each link opens the problem’s explanation, implementation, and tests.

### Arrays and hashing

#### Dynamic arrays

| Problem                | Solution                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Concatenation of Array | [Read explanation and code](src/arrays-and-hashing/dynamic-arrays/1-concatenation-of-array/) |

#### Hash maps and sets

| Problem            | Solution                                                                             |
| ------------------ | ------------------------------------------------------------------------------------ |
| Contains Duplicate | [Read explanation and code](src/arrays-and-hashing/hash-usage/1-contains-duplicate/) |
| Two Sum            | [Read explanation and code](src/arrays-and-hashing/hash-usage/2-two-sum/)            |
| Valid Anagram      | [Read explanation and code](src/arrays-and-hashing/hash-usage/3-valid-anagram/)      |
| LRU Cache          | [Read explanation and code](src/arrays-and-hashing/hash-usage/4-lru-cache/)          |

#### Prefix Sums

| Problem                     | Solution                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Range Sum Query - Immutable | [Read explanation and code](src/arrays-and-hashing/prefix-sums/1-range-sum-query-immutable/) |

## How to use this repository

If you’re practicing, try solving a problem yourself before reading the solution.

Then use the write-up to compare approaches:

1.  Read the explanation to understand the reasoning.
2.  Review the implementation alongside the explanation.
3.  Check the time and space complexity.
4.  Explore the tests, and try adding your own edge cases.

If you’re revisiting a topic, jump straight to a problem’s README for a refresher.

## Run locally

You’ll need Node.js and pnpm.

From the repository directory, install the dependencies:

```sh
pnpm install
```

Run the tests:

```sh
pnpm test
```

Run tests in watch mode:

```sh
pnpm test --watch
```

Check the code with the linter:

```sh
pnpm lint
```

## A work in progress

This repository grows as I practice. These are my learning notes and solutions—not an exhaustive reference or a claim that every approach is the only or best way to solve a problem.

If you spot a mistake, an unclear explanation, or a different approach worth discussing, feedback is welcome.
