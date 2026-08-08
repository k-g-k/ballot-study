# MAPLE Ballot Measure Page — Content Inventory

## How to use this document
This is a flat inventory of every content item that belongs on the ballot measure deep-dive page.
Use it to fill the content schematic shell. Items have no prescribed subsection grouping — the agent
should assemble them into logical sections from the user's perspective.

Each item is tagged by source type:

- 🔵 Official info — sourced from government or official campaign filings
- 🟠 User-submitted — org or individual testimony posted on MAPLE
- 🟢 Outside content — media, academic, research, or legislative database
- 🟣 AI synthesis — MAPLE-generated, must show citations and sources

Asterisk notes at the bottom of each section flag items where sourcing requires clarification.

---

## Persistent header *(not a tab — always visible)*

- 🔵 Measure title (plain language)
- 🔵 Measure number
- 🔵 Election date
- 🔵 Measure type *(initiative / referendum / constitutional amendment)*
- 🔵** Current procedural stage *(signature gathering / certified / on ballot / passed / defeated)*
- 🟣 Topic and policy area tags

> ** Underlying status is official record, but translating it into a human-readable stage label requires a defined mapping. MAPLE determines the display logic.

---

## Tab: Overview *(future — coming back to this)*

- 🔵 Yes / No vote summary *(AG verbatim)*
- 🟣 AI plain-language summary of the measure
- 🔵** Current procedural stage callout with next key date
- 🔵 Campaign finance snapshot — total raised YES vs NO
- 🟠 Featured org testimony — YES *(surfaced from Testimony & Community tab)*
- 🟠 Featured org testimony — NO *(surfaced from Testimony & Community tab)*
- 🟣 AI synthesis snapshot — top YES argument with citation
- 🟣 AI synthesis snapshot — top NO argument with citation
- 🟢 Media coverage snapshot *(surfaced from In The World tab)*

> ** See note in Persistent Header.

---

## Tab: Background & Context

- 🔵 Official ballot question — exact wording *(Secretary of State)*
- 🔵 AG plain-language summary *(verbatim)*
- 🔵 Full legal text *(link out)*
- 🔵 What a YES vote does *(AG verbatim)*
- 🔵 What a NO vote does *(AG verbatim)*
- 🔵 Fiscal impact statement *(verbatim)*
- 🟣 Plain language translation of fiscal impact
- 🟢* Readability score — Flesch-Kincaid grade level of ballot language
- 🟢* Readability score — Flesch Reading Ease
- 🟣 Glossary — undefined or ambiguous terms surfaced from ballot text, defined from official sources
- 🔵** Path to ballot timeline — filing, AG certification, signature rounds, legislative review, final certification
- 🔵 Signature counts — required vs submitted vs certified
- 🔵 Legislative action or inaction during review window
- 🟣 Plain language explainer of how this measure type works in Massachusetts
- 🔵 Current state of the law or policy being changed
- 🔵*** Key institutions and offices involved
- 🟢 Prior Massachusetts ballot measures on this topic *(RAG from legislative database)*
- 🟢 Related bills filed on Beacon Hill *(RAG from legislative database)*
- 🟢 How comparable measures have fared in other states
- 🟣 AI identification of essential context for understanding this measure
- 🟣 AI-surfaced connections to related Beacon Hill activity

> \* Computed metric applied to official ballot text. Not produced by any official body — calculated by MAPLE using standard Flesch readability formulas. Source material is official; the score itself is MAPLE-computed.
>
> ** Individual events on the timeline are drawn from official filings and certifications. Assembling them into a readable chronological display requires curation and a defined data pipeline from official sources.
>
> *** Identifiable from official documents but requires editorial judgment to determine which institutions are relevant to a given measure. Treat as AI synthesis from official sources.

---

## Tab: The Case For & Against

- 🔵 Official YES campaign committee name and registration
- 🔵 Official NO campaign committee name and registration
- 🔵 Official YES campaign position statement *(verbatim)*
- 🔵 Official NO campaign position statement *(verbatim)*
- 🔵 Endorsing organizations on record — YES *(official filings)*
- 🔵 Endorsing organizations on record — NO *(official filings)*
- 🔵 Elected officials with a public position — YES
- 🔵 Elected officials with a public position — NO
- 🟢 Peer-reviewed research relevant to the measure
- 🟢 Think tank and research institute reports *(ideological affiliation noted)*
- 🟢 Government-produced research or data
- 🟣 AI synthesis of research — what evidence shows, where evidence is thin or contested, citations required
- 🟣 AI synthesis — strongest YES arguments across all sources, citations required
- 🟣 AI synthesis — strongest NO arguments across all sources, citations required
- 🟣 Areas of consensus across sources
- 🟣 Areas of disagreement across sources
- 🟣 Open questions and unresolved claims
- 🟣 Claim mapping — claims made, evidence cited, what is contested

---

## Tab: Testimony & Community

- 🟠 Verified org testimony — YES position
- 🟠 Verified org testimony — NO position
- 🟠 Verified org testimony — neutral or informational
- 🟠 Count of orgs who have submitted testimony
- 🟠 Individual testimony — YES position
- 🟠 Individual testimony — NO position
- 🟠 Individual testimony — neutral or questions raised
- 🟠 Count of individuals who have submitted testimony
- 🟠 User-submitted questions
- 🟠 Post your own testimony *(CTA)*
- 🟣 AI synthesis of org testimony — strongest YES arguments, citations required
- 🟣 AI synthesis of org testimony — strongest NO arguments, citations required
- 🟣 Areas of consensus across testimony
- 🟣 Areas of disagreement across testimony
- 🟣 Open questions and unresolved claims from testimony

---

## Tab: In The World *(lower priority — sketch lightly)*

- 🟢 News articles — Massachusetts outlets
- 🟢 News articles — national outlets
- 🟢 Editorial board positions *(outlet named, YES / NO / neutral)*
- 🟢 Opinion and op-ed pieces *(author and outlet named)*
- 🟣 AI synthesis of media coverage — dominant narratives, notable disagreements, citations required
- 🟣 AI identification of claims in media coverage that are contested or unverified
- 🟢 Polls — pollster, date, sample size, margin of error, YES %, NO %, undecided %
- 🟢 Exact poll question wording per poll
- 🟣 AI synthesis of polling trend *(if multiple polls exist)*

---

## Campaign Finance *(tab placement TBD)*

- 🔵 Total raised — YES committee
- 🔵 Total raised — NO committee
- 🔵 Total spent — YES committee
- 🔵 Total spent — NO committee
- 🔵 Top donors — YES *(name, amount, employer or affiliation)*
- 🔵 Top donors — NO *(name, amount, employer or affiliation)*
- 🔵 In-kind contributions *(where notable)*
- 🔵 Signature gathering expenditures
- 🔵 Cost per required signature *(CPRS)*
- 🟣 AI pattern note — funding concentration, out-of-state money, timing of donations *(cited to OCPF)*
