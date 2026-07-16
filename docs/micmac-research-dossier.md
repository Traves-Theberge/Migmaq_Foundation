# Mi'kmaq Grammar Research Dossier

Date: 2026-07-11

Purpose: collect the strongest supporting research for a MobTranslate-style Mi'kmaq grammar cheatsheet, identify what is already well supported, and define what should be added to the next revision.

## Source Tiers

| Tier | Use | Sources |
| --- | --- | --- |
| Community learner grammar | Primary source for practical cheatsheet rules and example formatting. | Mi'gmaq Wiki pages: [Verbs](https://wiki.migmaq.org/index.php?title=Verbs), [Preverbs](https://wiki.migmaq.org/index.php?title=Preverbs), [Evidentiality](https://wiki.migmaq.org/index.php?title=Evidentiality), [Numerals](https://wiki.migmaq.org/index.php?title=Numerals), plus related pages listed in `docs/micmac-supporting-information.md`. |
| Local corpus/reference archive | Primary source for lexical labels, examples, historical forms, scans, and future OCR work. | `reference_materials/`, extracted from Mi'kmaq Online reference books and page images. |
| Academic analyses | Use for deeper rules, unresolved analyses, and caution notes. | Inglis & Johnson 2001; Inglis 2002 PhD dissertation (added loop 13); Johnson tag-question evidentials; Stevens et al. 2021; Coon & Bale 2014; Little 2018; Hamilton 2015; Bale & Coon materials. |
| Teaching/historical grammar | Delisle & Metallic 1976 is now machine-readable as of loop 13, via direct page-image reading (not OCR) rather than `pdftotext`, which still fails on its compressed scan. Father Pacifique/Hewson & Francis remains access-limited (re-confirmed loop 13). | `research_sources/micmac-teaching-grammar-delisle-metallic-1976.pdf` (629 pages, mined for VTA endings, modes, past tense, pronouns/possessives/demonstratives); Father Pacifique/Hewson & Francis identified but access-limited. |

Source-integrity caution (confirmed loop 6): `research_sources/hamilton-migmaq-discourse-configurational-2015.pdf` is **not a real PDF**. `file` identifies it as an HTML document (a bot-check/interstitial page with `TSPD` cookie-check JavaScript), i.e. a failed download that saved an error page under a `.pdf` name. Do not cite it. Hamilton's syntax dissertation (`hamilton-syntax-migmaq-dissertation-2015.pdf`/`.txt`) is a separate, verified-good file and remains citable; do not confuse the two Hamilton filenames.

## High-Confidence Rules

### Orthography and Sound

The cheatsheet should remain explicit that it uses Listuguj-style spelling when drawing from the Mi'gmaq Wiki and much of the modern academic work. Hamilton's dissertation states that data are written in Listuguj orthography and glosses key conventions such as `q`, `qw`, apostrophe for schwa, and apostrophe after a vowel for length. The Wiki sound pages add practical warnings: vowel length is contrastive, schwa cannot lengthen, and `q` has dialect/speaker allophones.

Action for v0.3:

- Add a compact "orthography guardrails" table.
- Add a QA warning that apostrophes are not decoration: they may mark schwa or long vowels depending on position.
- Do not normalize away `q/qw`, apostrophes, or final `n` in evidentials.

### Animacy

Animacy is foundational. Hamilton summarizes that Mi'gmaq nouns divide into animate and inanimate; plural marking differs, and only animate nominals take obviation. Verb class also tracks animacy/transitivity: AI/VAI, II/VII, TA/VTA, TI/VTI.

Action for v0.3:

- Keep animacy before all noun/verb rules.
- Add a parser rule: every noun entry should carry `AN` or `IN` when known, because it affects plural, demonstratives/adjectives, verb selection, and obviation.

### Obviation

Obviation is discourse grammar, not just a suffix. Hamilton: in a clause or DP domain with multiple third-person arguments, one third-person participant is proximate and others are obviative; proximate tends to be discourse-salient, while obviative tends to be backgrounded. Coon & Bale also use the typical Algonquian hierarchy `2 > 1 > proximate > obviative > inanimate` as descriptive background.

Action for v0.3:

- Add a "two third persons" decision rule: choose a discourse center as proximate; mark other animate third persons obviative.
- Mark direct/inverse explanations as advanced and avoid overclaiming simple English subject/object mapping.

### Verb Template

The Wiki gives a practical template:

`(preverb) stem verb-class (negation) person/number (tense) 3PL/obviative`

Coon & Bale give a narrower transitive matrix template:

`Stem-Slot1-(Neg)-Slot2-(Past/Evid)-(3PL/OBV)`

Their Slot 1/Slot 2 analysis is valuable because it shows why simple subject/object endings are not enough for VTA forms, especially with participant plural objects and `-ugsi`.

Action for v0.3:

- Replace the current generic verb template with two templates:
  - learner template for broad parsing
  - advanced VTA matrix template for person/number agreement
- Add a note that negation can introduce internal negative morphology in the verb, while `mu` appears before the negated verb.

### Preverbs

The Wiki provides the clearest practical preverb system. Preverbs attach at the left edge of the verb. Some stems are dependent and require a preverb. The `mu` diagnostic helps separate true preverbs from separate modifiers: `mu` can intervene between a modifier and verb, but not between a preverb and its verb.

The preverb slot guide is especially important:

| Position | Function | Examples |
| --- | --- | --- |
| 7 | aspect 1 | `etl-`, `gi's-`, `i-` |
| 6 | mode | `getu-`, `me'si-`, `gisi-`, `nata-` |
| 5 | aspect 2 | `poqji-`, `gaqi-` |
| 4 | duration | `minu-`, `siew-` |
| 3 | manner | `gimi-`, `jaqal-`, `gesigew-`, `gaqisg-` |
| 2 | quantity | `newti-`, `aqat-`, `toqi-` |
| 1 | direction/state | `al-`, `wel-` |

Action for v0.3:

- Add the preverb slot table to the cheatsheet.
- Add a generation rule: sort known preverbs from highest position leftward to lower position rightward before the stem.
- Keep the Wiki's caveat: slots are a guideline with exceptions, not a fully closed grammar.

### Evidentiality and Past/Future

The Wiki and Inglis & Johnson agree that Mi'gmaq evidentiality is central. Direct `-p(n)` marks direct evidence/certainty and always gives a past reading. Indirect `-s(n)` marks non-firsthand/reported evidence; it appears in past contexts and also in future environments. Final `n` drops word-finally except in embedded clauses.

Inglis & Johnson argue that the AI future is not simply tense. It combines a reduced/irrealis stem, an existential `-te(k)` element from `etek`, and evidential suffixes `-s(n)` or `-s(i)p(n)`. Their AI future table for `-np` "sleep" gives anchors:

| Person | Ending | Example |
| --- | --- | --- |
| 1 | `-tes` | `npates` |
| 2 | `-tesk/-teks` | `npateks` |
| 3 | `-tew` | `npatew` |
| 12 | `-tesnu/-teksnu` | `npate(k)snu` |
| 13 | `-tesnen/-teksnen` | `npate(k)snen` |
| 23 | `-toqsip` | `npatoqsip` |
| 33 | `-taq` | `npataq` |

Johnson's tag-question handout supports a special role for `-s(i)p(n)`: it can yield a tag-question-like interpretation and is analyzed as involving interaction between direct and indirect evidential material.

Action for v0.3:

- Add an evidential table with `-p(n)`, `-s(n)`, and `-s(i)p(n)`.
- Add a future section that says "future is built from modal/evidential morphology; do not model it as a plain English tense suffix."
- Add a past-question rule: past questions use question/evidential morphology rather than simple intonation alone.

### Number

Little 2018 gives the clearest practical number-agreement facts for animate intransitives:

| Person | Singular | Dual | Plural |
| --- | --- | --- | --- |
| 1 exclusive | `Ø/-an` | `-eg` | `-ulti-eg` |
| 1 inclusive | none | `-'gw` | `-ulti-'gw` |
| 2 | `-n` | `-oq` | `-ulti-oq` |
| 3 | `-t` | `-j-ig` | `-ulti-j-ig` |

The pluralizer has allomorphs such as `-ulti`, `-uti`, `-u'ti`, and `-a'ti`. Coon & Bale also note that the intransitive paradigm makes a three-way number distinction, while the transitive paradigm they examine does not preserve the same dual/plural contrast.

Action for v0.3:

- Add a number section that clearly separates noun number from VAI agreement number.
- Do not treat noun plural and verb plural as the same operation.
- Add dual as a first-class feature in VAI rules.

### Numerals and Classifiers

The Wiki gives practical numeral/classifier categories and examples. Bale & Coon's open poster and the Language Science Press discussion support a stricter rule: Mi'gmaq numerals 1-5, and numerals morphologically built from them, do not appear with classifiers; numerals 6 and higher require classifiers. The poster examples:

- `na'n-ijig jinm-ug` = five men
- `*na'n te's-ijig jinm-ug`
- `*asugom-ijig jinm-ug`
- `asugom te's-ijig jinm-ug` = six men

Action for v0.3:

- Add the 1-5 vs 6+ classifier rule, marked as academic-source supported.
- Keep the Wiki classifier categories as practical output classes: animacy, kind/group, long/cylindrical, round, flat, money, age/year, dates, hierarchical systems.
- Add a caution that classifier choice depends on noun semantics and animacy.

### Word Order, Argument Drop, and Focus

Hamilton's dissertation is the best source for this. Mi'gmaq has surface properties often called non-configurational: free word order, argument omission, and discontinuous DPs. Hamilton argues the underlying syntax is configurational, and surface order/argument drop are strongly affected by discourse. His focus experiment found that focus affects word order, with a tendency for focused constituents to appear utterance-initial, and argument drop is common when the omitted argument is discourse-given.

Action for v0.3:

- Rewrite the current "word order is free" section to: "word order is flexible and discourse-sensitive."
- Add a parser/generator guardrail: do not use word order alone to infer subject/object.
- Add a learner rule: use verb morphology, animacy, obviation, and context before word order.

### Argument Mapping and Voice

Stevens et al. 2021 is important because it is speaker-collaborative and based on a corpus of 150+ stems and 1500+ clauses. They analyze Mi'kmaw verb stems as unaccusative or unergative, with little-v, animacy agreement, and voice introducing/mapping arguments. Their practical findings:

- Little-v `-a` selects unergative stems.
- Little-v `-a'` selects unaccusative stems.
- `-a-t` can introduce an internal argument to an unergative stem.
- `-a'-t` can introduce a causer argument to an unaccusative stem.
- Animacy and voice combinations affect active, passive, and antipassive interpretations.

Action for v0.3:

- Add this as an advanced "stem-to-clause building" note, not as a beginner production table yet.
- Use it to prevent oversimplified claims such as "VTA equals English transitive verb."

## Material Already Extracted Locally

The Mi'kmaq Online reference archive is complete for the five requested book collections:

| Collection | Pages/images |
| --- | ---: |
| Pacifique Dictionary Manuscript | 828 |
| Rand's Dictionary | 305 |
| Clark's Dictionary | 234 |
| Pacifique's Geography | 382 |
| Rand's First Reading Book | 246 |

These are in `reference_materials/` with HTML, JSON, Markdown, and page images. They are currently best used for citation lookup and OCR/image inspection, not automatic grammar generalization.

## Confirmed Gaps in Current Cheatsheet

1. Full evidential/modal system is still underdeveloped.
2. Future is still too tense-like; it should be recast as modal/evidential morphology.
3. VAI number needs singular/dual/plural tables.
4. VTA needs a Slot 1/Slot 2 explanation and `-ugsi` handling.
5. Numeral classifiers need the 1-5 vs 6+ rule.
6. Word order needs discourse/focus framing.
7. Preverb ordering should be a table and generation rule.
8. Argument mapping/voice needs at least a warning against English transitivity assumptions.
9. The Delisle & Metallic teaching grammar needs OCR before it can be used deeply.
10. Father Pacifique/Hewson & Francis remains a key access gap.

## Recommended v0.3 Build Order

1. Add source/provenance note and orthography guardrails.
2. Replace the verb template section with learner and VTA templates.
3. Add full preverb ordering and `mu` diagnostic.
4. Add evidential/future/past-question section.
5. Add VAI number table from Little and Coon & Bale.
6. Add numeral classifier rule from Bale & Coon plus Wiki categories.
7. Rewrite word order as discourse-sensitive.
8. Add advanced notes for `-ugsi`, obviation, and argument mapping.

## Research Leads

| Lead | Why it matters |
| --- | --- |
| ~~Inglis 2002, *Speaker's Experience*~~ | **Resolved loop 13** — downloaded and mined; see the Loop 13 Addendum below. |
| Hewson & Francis / Father Pacifique grammar | Historical full grammar and paradigms; repeatedly cited. Re-confirmed access-restricted in loop 13. |
| ~~Delisle & Metallic OCR~~ | **Resolved loop 13** — `pdftotext` still fails, but direct page-image reading worked; see the Loop 13 Addendum below. Only ~150-200 of 629 pages mined so far; a follow-up pass on the remaining sections is still a live lead. |
| Mi'gmaq Wiki source history | Some pages are old; stable use should cite page URLs and note revision dates when possible. |
| Native speaker/community review | Required before using generated grammar rules in a public translation tool. |

## Loop 6 Addendum: Verb Paradigms (Direct/Inverse, Modes, Tag Questions)

Date: 2026-07-11 (Loop 6 pass). Source-confirmed: `hamilton-migmaq-discourse-configurational-2015.pdf` in `research_sources/` is an HTML error/download artifact (opens as a JavaScript challenge page, not a PDF) — do not cite it. The real Hamilton source used below is `hamilton-syntax-migmaq-dissertation-2015.txt`, the dissertation.

### Direct/Inverse and the Full Theme-Sign Table

Hamilton (2015) gives a fuller Slot-1/theme-sign table than Coon & Bale's, because it includes the two obviative-subject cells that Coon & Bale's negated-form corpus does not cover. Third-person-only direct/inverse contrast:

- **Direct** (proximate subject > obviative object): theme sign `-a`, e.g. `gesalatl` "s/he(prox) loves him/her(obv)".
- **Inverse** (obviative subject > proximate object): theme sign `-gw`/`-gu`, surfacing as zero in some affirmative forms but visible once negation is added: `mu gesalgugul` "s/he(obv) doesn't love him/her(prox)" vs. `mu gesalagul` "s/he(prox) doesn't love him/her(obv)".
- Unlike Ojibwe, Mi'gmaq's direct/inverse contrast does not extend to SAP-vs-3 forms; those use ordinary object-agreement theme signs (`-i('li)` 1obj, `-u'l(n)` 2obj, `-a` 3obj), not `-gw`/`-gu`.

### Inner Suffix (Slot 2) Hierarchy: An Unresolved Disagreement

Coon & Bale (2014) propose `1EXCL ≫ 2PL ≫ {1SG, 2SG, or 3 subject}`, focused on Speech-Act-Participant-plural competition. Hamilton (2015) proposes the broader `1PL ≫ 2PL ≫ {3PL, 3SG} ≫ {1SG, 2SG}`, explicitly placing 3rd person above 1st/2nd singular once no PART-plural argument is present — a claim Coon & Bale's paper does not make. This is a genuine unresolved disagreement between two research teams working on the same construction; the cheatsheet (10.4) records both rather than picking one.

Action: flag any generated form whose correctness depends on the 3-vs-1sg/2sg ranking as `needs_speaker_review`.

### Full Verb Template with Applicative Slot

Hamilton's Table 2.1 gives the fullest attested template, for ditransitive (TA+O) verbs: `root-verb.final-(Appl)-theme.sign-(Neg)-inner.suffix-(Tense/Evid)-(outer.suffix)`. Worked example: `mu elug-atm-u-i-w-g-pn-ig` "they didn't fix it for me" (NEG fix-DFLT-APPL-1OBJ-NEG-3-PST.DK-3PL).

Action: use this template only when a benefactive/goal argument is present; use the plain Slot1/Slot2 template otherwise.

### Full Per-Person Modal Paradigm and Subordinative

Inglis & Johnson (2001) is richer than previously mined: beyond the AI future table already in the cheatsheet, their Table 7 gives a full per-person paradigm (1, 2, 3, 12, 13, 23, 33) across neutral, attestive, suppositive, inferential, conditional, future, and if-conjunct forms — the only source found with more than a 3sg cell for non-indicative modes. Their Table 5 gives Subordinative endings compared against historical possessed-noun personal affixes, showing the Subordinative and the Future both descend from a Proto-Algonquian verb type with full personal prefixes/suffixes, unlike other Mi'gmaq verb orders (whose personal prefixes have since been lost in Mi'gmaq matrix clauses generally).

Caution: this data is transcribed in Smith-Francis orthography (per Hewson & Francis 1990), not the Listuguj orthography used elsewhere in the cheatsheet. Treat it as a structural reference first, not a literal spelling source, until converted.

### Tag Questions

Johnson's tag-question paper analyzes `-s(i)p(n)` as pragmatically underspecified, yielding two readings: (1) confirmation-seeking (speaker expects a positive answer, open to contradiction) and (2) asserted-belief (speaker asserts a proposition as true, often compatible with the community-knowledge particle `to'q`). The paper predicts a gap: `-s(i)p(n)` is unavailable in first-person forms, since a speaker cannot coherently seek confirmation or assert reportability about their own firsthand knowledge. This is independently consistent with Inglis & Johnson's per-person table, which also has no attested 1st-person inferential cell.

Action: treat first-person tag questions as ungrammatical rather than generating a `-s(i)p(n)` form for `1sg`/`1pl`.

### Argument Mapping: Concrete Voice Examples

Stevens, Denny, Sylliboy & Friesen (2021) give minimal quintuplets showing the same stem in active, antipassive, and passive voice, for both an unergative stem (`wissukw-` "cook", little-v `-a`) and an unaccusative stem (`ik-` "arrive/put", little-v `-a'`). Voice is expressed by the Animacy-Voice suffix combination: `-t-m`/`-t-u` active, `-t-eke` antipassive, `-l-u` passive. Valence diagnostics: antipassive clauses accept the patient-oriented preverb `a'qati-` "halfway" even with an unspecified patient; passive clauses accept the agent-oriented preverb `o'pli-` "wrongly" even with an unspecified agent.

Action: use this as attested anchors for the specific stems studied, not as a free generation template for arbitrary stems, since stem-class (unergative/unaccusative) must be independently established per stem.

## Loop 13 Addendum: Two New Primary Sources

Date: 2026-07-12. This loop re-tried two previously-blocked leads from the "Research Leads" section above and both succeeded, plus mined a source already present but previously unusable.

### Inglis (2002) PhD Dissertation, *Speaker's Experience: A Study of Mi'kmaq Modality*

Previously blocked by a DNS failure at the Library and Archives Canada host; the Memorial University institutional repository mirror (`memorial.scholaris.ca`) worked. Downloaded to `research_sources/inglis-speakers-experience-modality-thesis.pdf` (227 pages) and text-extracted with `pdftotext -layout` (minor OCR noise, e.g. "Mnunaq" for "Mi'kmaq", but largely usable prose). This is the fuller PhD-length treatment behind the shorter 2001 Inglis & Johnson conference paper already cited throughout this dossier — same author, same AI-only scope, but with richer typological framing.

Key new findings (all integrated into the cheatsheet, sections 10b.0a/10b.0b/10b.1/10.4/10c):

- A full/reduced stem mechanism marking realis/irrealis, historically descended from Proto-Algonquian "initial change" — not universal across stems (only those with historical `/e/`, `/a/`, or `/o/` in the first syllable), with word order as the fallback disambiguation strategy for non-alternating stems.
- A Dubitative mode ("might X", suffix `-tuk` on the reduced stem), not in the Wiki's mode inventory at all, contrasted directly with Future ("will X").
- A counterfactual function for the same `-p(n)`/`-s(n)`/`-s(i)p(n)` suffixes already documented as past-evidential markers, with word-final `/n/`-retention as the specific marker of contrary-to-fact meaning.
- A precise, rule-governed distribution of the deferential `-s(i)p(n)` suffix by verb order (Independent excludes 1st person; If-conjunct includes only 2/23/13; Future includes only 23) — this replaces the earlier "arbitrary evidential gaps" framing with an actual rule.
- A third person hierarchy (Hewson 1991:864, `2≫1≫3≫4≫0`) explaining the 2nd-over-1st deference asymmetry, explicitly a different kind of hierarchy from Coon & Bale's and Hamilton's inner-suffix-agreement hierarchies (this one governs evidential deference, not agreement-slot competition).
- The dissertation's own full per-person paradigm tables (physically foldout pages in the original) were confirmed **unreadable** by direct inspection of the OCR output — badly garbled, not usable. This is honestly documented in the cheatsheet rather than silently worked around; only the surrounding prose (which was clean) was used.

### Delisle & Metallic (1976), *Micmac Teaching Grammar*

Already downloaded in an earlier loop but marked unusable ("pdftotext did not produce usable text"). Loop 13 discovered this scanned book (629 pages, CVISION-compressed, Restigouche dialect per Manny Metallic) could be read directly by rendering pages to PNG with `pdftoppm -png -r 150` and reading them with vision — a new technique for this project, distinct from OCR (no tesseract was used or is available; this is closer to a human reading a photocopy). This became the single richest source in the whole project, filling more confirmed gaps in one loop than any prior loop:

- **VTA**: a combined subject×object ending table ("Table 1") and reflexive/reciprocal table ("Table 2") for `nemî-` "see", denser than the Wiki's 7×7 grid, plus a structural claim that most VTA/VTI stem pairs are "really one verb" differing only in the object-marker suffix (8 worked minimal pairs).
- **Tense**: a genuine immediate-vs-unspecified two-way past system, with real 1sg VTA/VTI past cells (`nemîgêp`, `nemituap`, etc.) and a "agreement gone wild" fact where the immediate-past marker also appears on the subject noun itself.
- **Mode**: a second, independent source's 4-mode framing (indicative/imperative/conditional/subjunctive) agreeing with the Wiki's own inventory that infinitive/impersonal are not part of the core set; and the only infinitive-formation rule found anywhere in this project (`-mg` suffix).
- **Pronouns/possession**: full 7-person possessive-pronoun paradigms for one alienable noun (`gwitên` "canoe") and one inalienable noun (`-mis` "older sister"), closing the possessive-pronoun gap that persisted since v0.3.
- **Demonstratives**: an animacy-split plural paradigm (`ulaig` animate, `ulaal`/`alaal` inanimate), closing the other half of that same long-standing gap.
- **Orthography**: this book's own front matter (only partially sampled) confirms the Wiki's abbreviated "Metallic" row (schwa `ê`, long-vowel accents `à è ì ò ù`) but reveals it is a simplification of a richer system with phonologically-conditioned `g`/`ĝ` alternation and a voicing-marking apostrophe use not captured in the Wiki's brief summary.

Action: 629 pages is far more than was mined in this one loop (~150-200 pages read across 4 parallel passes). A follow-up loop targeting the untouched TOC sections (numeral-classifier "Counting" material in most lessons, the full orthography front matter, color-term gradation, comparative/superlative adjectives, kinship/body-part possession beyond one example, definiteness/obviation with demonstratives) would likely yield further gains — see `docs/micmac-missing-details.md` gap #9.

