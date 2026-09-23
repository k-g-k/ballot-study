# Ballot Question Prototype

MAPLE is a Massachusetts civic engagement platform: a virtual public square where
citizens, organizations, and legislators can see how others are thinking about
legislation. 

Below is the evolution of the ballot measure project. The original goal was to provide a
one-stop shop where an individual can fully understand a measure, scaffolded so
different kinds of readers can go as deep as they want.

My Role: volunteer product and design lead, as part of Code for Boston



## Making the content visible ##


***Problem:** The page's content comes from very different places: official records,
testimony people submit themselves, outside media and research, both partisan and
non-partisan. It also uses AI-generated synthesis to make dense material readable
for the average user. The team was focused on what content to display and where,
but we didn't really have a shared picture of the content blocks themselves.*

There were many possibilities and I wanted to create something concrete to anchor on. In order to accomplish this, I worked with Claude to create content schemata based on team conversations and
competitive analysis of Ballotpedia, producing around sixty items across four
source types. I then took the existing designs for the ballot page and fed the
schemata into Figma Make to produce a visual map the team could anchor on
(Concept E). From there I had Figma Make generate several structural concepts for
a single tab, and combined the strongest parts of each into one worked example
for the team to review (Concept H).

Prototype: [Figma Make Preview](https://grow-turn-02824673.figma.site)
<div><img width="814" height="438" alt="image" src="https://github.com/user-attachments/assets/f81b9cdf-256d-421c-b058-7dc8913b4659" /></div>



## 2. Creating a shared environment ##

***Problem:** we had feedback to implement and wanted to iterate as a team, but the
prototype lived in Figma Make, which the team couldn't build from or work in
directly. I wanted a source of truth that we could co-create in.*

I used Claude Code to export the project into React and directed a refactor so it
could be turned into a reusable system that other team members could reuse. Generic rendering components under
[`app/src/app/components/ballot/`](https://github.com/k-g-k/ballot/tree/main/app/src/app/components/ballot),
driven by question content under
[`app/src/app/data/`](https://github.com/k-g-k/ballot/tree/main/app/src/app/data),
so a new ballot question reuses the layout rather than rebuilding it. That work
can be found in [k-g-k/ballot](https://github.com/k-g-k/ballot). The refactor and feedback implementation resulted in the below prototype which took about 6 hours end-to-end to create. 

Prototype: [Vercel Preview](https://ballot-pi.vercel.app/) · [GitHub](https://github.com/k-g-k/ballot)


While refactoring I also made refinements to the overall design and content structure that you can explore in the prototype. Including some fun bonus features such as our new AI mascot and corresponding micro interactions!
<div><img width="311" height="298" alt="image" src="https://github.com/user-attachments/assets/7bee1757-0063-4bb4-a52e-52dea461b25b" /></div>


## Current exploration ##

MAPLE is currently focused on other areas of the product, but we plan to return
to the ballot project sometime in early 2027. In the meantime, I have started
experimenting with different layout and interaction models just for the fun of it. My latest exploration includes:

* a single page with horizontal tabs and more breathing room
* micro-interactions on the testimony filters
* testimony comments as a first-class citizen in a sidebar rather than a separate
  destination
* progressive disclosure on certain details

Check out the latest: [Ballot Page Experiment](https://ballot-study.vercel.app/ballotQuestions/tax-rebate-62f-alt3)

Responsive testimony micro-interactions here: https://maple-testimony-redesign.vercel.app/
<div><img width="1705" height="858" alt="image" src="https://github.com/user-attachments/assets/7e4d4f9a-8c70-40f8-8d56-07394fc6ee03" /></div>


