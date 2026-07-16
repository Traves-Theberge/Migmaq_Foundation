# Supporting Information for Mi'gmaq / Mi'kmaq Grammar Cheatsheet

Created: 2026-07-12

Purpose: source-backed notes for filling `docs/micmac-missing-details.md` and upgrading `docs/micmac-grammar-cheatsheet.md` to v0.3. This file records what each source supports, why it matters for generation/QA, and where to pull details from.

## Core Sources

| Source | URL / local path | Supports |
|---|---|---|
| Mi'gmaq Wiki: Evidentiality | https://wiki.migmaq.org/index.php?title=Evidentiality | Direct/indirect evidential markers, past/future evidential behavior, past questions. |
| Mi'gmaq Wiki: Preverbs | https://wiki.migmaq.org/index.php?title=Preverbs | Preverb definition, independent/dependent verbs, negation test for preverbs, slot ordering, preverb inventory. |
| Mi'gmaq Wiki: Verbs | https://wiki.migmaq.org/index.php?title=Verbs | Verb template and explanation that verbs can function as complete sentences. |
| Mi'gmaq Wiki: Numerals | https://wiki.migmaq.org/index.php?title=Numerals | Abstract numerals, tens/hundreds formation, counting classifiers. |
| Mi'gmaq Wiki: Pronunciation of Q | https://wiki.migmaq.org/index.php?title=Pronunciation_of_Q | Q allophones, dialect caution, labialized QW pronunciations. |
| Mi'gmaq Wiki: Sound Length | https://wiki.migmaq.org/index.php?title=Sound_Length | Vowel and consonant length contrasts; examples where length changes meaning. |
| Mi'gmaq Wiki: Yes/No Questions | https://wiki.migmaq.org/index.php?title=Yes/No_Questions | Present/future intonation questions and special past question forms. |
| Mi'gmaq Wiki: Glosses | https://wiki.migmaq.org/index.php?title=Glosses | Glossing conventions and abbreviation inventory. |
| Mi'kmaq Online local extraction | `reference_materials/*/pages/*.json` | POS labels, examples, alternate forms, recordings, source-image links. |
| Mi'kmaq Online | https://mikmaqonline.org/ | Dictionary/audio/reference corpus. |
| Bale & Coon / classifier discussion via Language Science Press | https://langsci-press.org/catalog/view/275/2501/1957-1 | Academic support that Mi'gmaq numerals interact with classifier-like morphology. |

## Source Support by Missing Detail

### 1. Evidentiality

Evidence:

- Mi'gmaq Wiki says evidentiality is grammatical source-of-information marking on the verb.
- It identifies direct `-p(n)` and indirect `-s(n)` markers.
- It states direct `-p(n)` always gives a past-tense reading.
- It states indirect `-s(n)` marks non-firsthand/report/hearsay and can also surface in future contexts.
- It gives paradigms for `mijji-` "eat".
- It gives past-question examples such as `mijji's'p?` "Did you eat?" and `mijji'ss?` "Did he eat?"

Use in v0.3:

- Add full evidentiality section, not just tense subsection.
- Add direct/indirect marker table.
- Add question rule: past questions use indirect marker.
- Add future-evidential rule with `teg/te + -s/s'p`.

### 2. Preverbs

Evidence:

- Preverbs occur at the left edge of the verb and modify the root and any preverbs to the right.
- They can translate English adverbs, prepositions, modals, prefixes, aspectual verbs, or other expressions.
- The wiki says Delisle and Metallic suggest several hundred preverbs.
- Independent verbs can occur with or without preverbs; dependent verbs require one.
- `mu` placement distinguishes modifiers from true preverbs: `mu` can stand between modifier and verb, but not between a true preverb and verb.
- Slot table exists: position 7 aspect1, 6 mode, 5 aspect2, 4 duration, 3 manner, 2 quantity, 1 direction/state.
- Examples show correct order `etl-poqju-newti-wissugwatman` and rejected orders.

Use in v0.3:

- Add full slot table.
- Add a preverb inventory appendix from the wiki list.
- Add negation diagnostic for deciding preverb vs modifier.
- Add dependent-stem list and rule: do not generate bare dependent stems.

### 3. Verb Template

Evidence:

- Mi'gmaq Wiki: verbs are central, can contain enough information to stand alone, and may be the only sentence element.
- It gives the template: `(preverb) stem verb class (negation) person and number (tense) 3rdPL/obviative`.
- It gives example `poqju angitelm eg' p` "I began to think about him/her."

Use in v0.3:

- Add a full "verb word template" section before class-specific paradigms.
- Use this template as the validation order for generated verbs.

### 4. Numerals and Classifiers

Evidence:

- Mi'gmaq Wiki distinguishes abstract number words from numbers used to count objects.
- Basic numerals include `newt`, `ta'pu`, `si'st`, `ne'w`, `na'n`, etc.
- Counting nouns requires classifiers depending on noun classification.
- Listed classes include bare/animacy, kinds/groups, long/cylindrical, round/globe-like, flat/sheet-like, money, years of age, dates, and hierarchical systems.
- Example classifier forms with "two": `ta'pu-sijig`, `ta'pu'gl`, `ta'pu-nemig-sijig`, `ta'pu-oq-sijig`, `ta'pu-anqe-gl`, `ta'pu-apsge-gl`.
- Example `ta'pu-apsge-gl alawe'l` means "two peas."
- Language Science Press PDF reports that Bale & Coon discuss Mi'gmaq numerals and classifier behavior, including a distinction between numerals 1-5 and 6+.

Use in v0.3:

- Replace the current "classifier warning" with a working classifier table.
- Add object-class decision rules.
- Mark the 1-5 vs 6+ academic claim as "needs source verification from Bale & Coon primary text" unless we retrieve the original.

### 5. Q and Pronunciation

Evidence:

- Mi'gmaq Wiki says `/q/` has a large range of pronunciations/allophones in Listuguj and varies by dialect.
- General allophones include `q`, glottal stop, uvular/fricative/pharyngeal-like values, and `h`.
- Intervocalic voicing may yield a voiced pharyngeal-like pronunciation for some speakers.
- Word-final Q may affricate or aspirate.
- Labialized QW has parallel allophones.

Use in v0.3:

- Add Q allophone table.
- Clearly mark this as pronunciation QA, not spelling conversion.
- Add dialect caution for Listuguj vs Newfoundland / other communities.

### 6. Sound Length

Evidence:

- Mi'gmaq Wiki says sound length can change meaning.
- Examples: `wigatign` "book" vs `wigatignn` "books"; `epit` "he/she is sitting" vs `e'pit` "woman".
- Five full vowels can be lengthened with apostrophe; schwa cannot.

Use in v0.3:

- Add length as a generation-blocking spelling distinction.
- Add rule: never strip doubled consonants or apostrophes during normalization.

### 7. Yes/No Questions

Evidence:

- Present yes/no questions can look identical to statements and differ by intonation.
- Future can also alternate with statement form.
- Past questions require a distinct question form; plain past statement plus question intonation is not enough.
- Examples include present `nepan` statement/question; past `mijiap` "I ate" vs `mijias?` "did I eat?"; transitive `nemi't'p` "you saw him/her" vs `nemi's'p?` "did you see him/her?"

Use in v0.3:

- Add yes/no question table by tense.
- Add rejection rule: do not use plain past as yes/no question.

### 8. Glosses and Dataset Format

Evidence:

- Mi'gmaq Wiki Glosses page gives format conventions:
  - separate morphemes with `-`
  - separate clitics with `=`
  - use `.` for multiple meta-language elements in a single form
  - gloss lexical items in normal font and grammar abbreviations in capitals
  - order for verb glossing: `verb.(mode).person`
- Gloss inventory includes `0`, `1`, `12`, `13`, `2`, `3`, `4`, `ABSN`, `AN`, `COND`, `DIR`, `DU`, `FUT`, `IMP`, `IN`, `NEG`, `OBV`, `PL`, `POSS`, `PST`, `Q`, `REFL`, `SBJV`, `VAI`, `VII`, `VTA`, `VTI`, and many more.

Use in v0.3:

- Add a "Dataset Glossing Contract" section.
- Normalize local labels:
  - `vii` -> `VII`
  - `loc` -> `LOC`
  - empty/unknown labels -> `needs_speaker_review`

### 9. Local Corpus Evidence

Evidence from `reference_materials`:

| Corpus measure | Count |
|---|---:|
| `verb animate intransitive` labels | 895 |
| `noun inanimate` labels | 533 |
| `noun animate` labels | 238 |
| `verb inanimate intransitive` labels | 226 |
| `verb animate transitive` labels | 178 |
| `verb inanimate transitive` labels | 149 |
| entries with alternate grammatical forms | 2,129 |
| entries with example sentences | 2,297 |
| entries with recordings | 2,155 |

Use in v0.3:

- Generate an example bank instead of manually selecting examples.
- Use corpus counts to prioritize sections: VAI and noun inanimate have strong local evidence; VTA/VTI need careful paradigm support from grammar sources.
- Use recordings for pronunciation examples, not only text.

## Academic / External Support To Chase

These are useful but should be verified against primary texts before becoming hard rules:

| Topic | Lead | Why |
|---|---|---|
| Numeral classifiers | Bale & Coon, cited in Language Science Press PDF | Supports classifier behavior and possible 1-5 vs 6+ split. |
| Evidentiality | Carol Rose Little 2013; Loughran 2012; Inglis & Johnson 2001; Inglis 2002 | Mi'gmaq Wiki references these directly for evidentiality/future/modality. |
| Pacifique grammar | Hewson & Francis 1990, *The Micmac Grammar of Father Pacifique* | Needed for mode paradigms, historical grammar, and orthography conversion. |
| Newfoundland phonology | Bragg 1976; Fidelholz 1963 | Needed for dialectal Q and morphophonemics. |
| Revitalization pedagogy | Sarkar, Metallic, Vicaire & Metallic 2009 | Useful for practical learner-oriented grammar examples. |

## Immediate v0.3 Insertions

The next cheatsheet revision should fold in:

1. Evidentiality table from Mi'gmaq Wiki.
2. Preverb slot table and negation diagnostic.
3. Numeral classifier table.
4. Sound length examples and no-normalization rule.
5. Q allophone note.
6. Yes/no question tense contrast.
7. Glossing contract.
8. Corpus evidence table.

