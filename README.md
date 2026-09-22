# Ballot Question Prototype

MAPLE is a Massachusetts civic engagement platform: a virtual public square where
citizens, organizations, and legislators can see how others are thinking about
legislation.

Below is the evolution of the ballot measure project. The original goal was to provide a
one-stop shop where an individual can fully understand a measure, scaffolded so
different kinds of readers can go as deep as they want.

My role: volunteer product and design lead, as part of Code for Boston

> ⚠️ Prototype only. Content, campaign positions, testimony, citations, and AI
> syntheses are illustrative, not real ballot-measure data.


##Making the content visible##

**Problem:** 
1. the page's content comes from very different places: official records,
testimony people submit themselves, outside media and research, both partisan and
non-partisan. It also uses AI-generated synthesis to make dense material readable
for the average user. 
2. The team was focused on what content to display and where,
but we didn't really have a shared picture of the content blocks themselves.

There were many possibilities and I wanted to create something concrete to anchor on. In order to accomplish this, I worked with Claude to create content schemata based on team conversations and
competitive analysis of Ballotpedia, producing around sixty items across four
source types. I then took the existing designs for the ballot page and fed the
schemata into Figma Make to produce a visual map the team could anchor on
(Concept E). 

<img width="814" height="438" alt="image" src="https://github.com/user-attachments/assets/f81b9cdf-256d-421c-b058-7dc8913b4659" />


From there I had Figma Make generate several structural concepts for
a single tab, and combined the strongest parts of each into one worked example
for the team to review (Concept H).

<img width="498" height="830" alt="image" src="https://github.com/user-attachments/assets/bb6872d9-c985-4a28-b5c9-44d59ae85b7c" />

View it live here: [grow-turn-02824673.figma.site](https://grow-turn-02824673.figma.site)


##2. Creating a shared environment##

View it live here:[ballot-pi.vercel.app](https://ballot-pi.vercel.app/) · [GitHub](https://github.com/k-g-k/ballot)

*Problem: we had feedback to implement and wanted to iterate as a team, but the
prototype lived in Figma Make, which the team couldn't build from or work in
directly. I wanted a source of truth that we could co-create in.*

I used Claude Code to export the project into React and directed a refactor so it
could be turned into a reusable system that other team members could reuse. Generic rendering components under
[`app/src/app/components/ballot/`](https://github.com/k-g-k/ballot/tree/main/app/src/app/components/ballot),
driven by question content under
[`app/src/app/data/`](https://github.com/k-g-k/ballot/tree/main/app/src/app/data),
so a new ballot question reuses the layout rather than rebuilding it. That work
lives in [k-g-k/ballot](https://github.com/k-g-k/ballot); this repo picks up from
there.

<img width="715" height="858" alt="image" src="https://github.com/user-attachments/assets/388cb59e-252e-4a3a-ab1c-6cbdee0f6b6b" />


##Current exploration##

MAPLE is currently focused on other areas of the product, but we plan to return
to the ballot project sometime in early 2027. In the meantime, I have started
experimenting with different layout and interaction models just for the fun of it.

The latest exploration includes:

* a single page with horizontal tabs and more breathing room
* micro-interactions on the testimony filters
* testimony comments as a first-class citizen in a sidebar rather than a separate
  destination
* progressive disclosure on certain details

Check out the latest: [tax-rebate-62f-alt3](https://ballot-study.vercel.app/ballotQuestions/tax-rebate-62f-alt3)
