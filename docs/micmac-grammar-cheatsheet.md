# Mi'gmaq / Mi'kmaq Grammar Cheat Sheet

Version: 1.9 links-repaired draft - 2026-07-12

Purpose: a practical grammar reference for building and checking English <-> Mi'gmaq / Mi'kmaq sentence pairs, modeled on the MobTranslate "mega grammar cheat sheet" format. This is not a community-approved teaching grammar. It is a working engineering document assembled from the Mi'gmaq Wiki, Mi'kmaq Online, the local extraction in `reference_materials/`, and the research dossier in `docs/micmac-research-dossier.md`. Treat it as an authoring and QA contract: every generated sentence must pass the guardrails here, and every uncertain item should be marked for speaker review instead of guessed.

Conventions:

- Base spelling: Listuguj-style forms where the Mi'gmaq Wiki gives paradigms.
- Dictionary spelling: keep the headword spelling used by Mi'kmaq Online for lexical examples.
- `AN` = animate, `INAN` = inanimate, `OBV` = obviative, `VAI` = animate intransitive verb, `VII` = inanimate intransitive verb, `VTA` = transitive animate verb, `VTI` = transitive inanimate verb.
- `1+3` = first person exclusive "we" (speaker plus another, not the listener). `1+2` = inclusive "we" (speaker plus listener).
- Use this as a "do not make obvious mistakes" sheet, not as final linguistic authority.

Glossing conventions for datasets:

- Separate segmentable morphemes inside a word with `-`.
- Separate clitics with `=`.
- Separate multiple grammatical meanings inside one morpheme gloss with `.`.
- Gloss lexical meanings in ordinary text and grammatical material in capitals.
- Use `subject>object` for agreement affixes that encode both subject and object.
- Default assumptions in glosses: animate, singular, present, indicative, and proximate do not need to be restated unless contrastive.
- Verb gloss order: `verb.(mode).person`.

Complete gloss abbreviation appendix, from the Wiki `Glosses` page (loop 12) — this closes the previously-named "still need a complete abbreviation appendix" gap:

Person/number: `0` (inanimate), `1`, `12` (1+2 inclusive), `13` (1+3 exclusive), `2`, `3`, `4` (obviative), `AN` (animate), `IN` (inanimate), `DU` (dual), `PL` (plural), `SG` (singular).

Grammatical categories:

| Gloss | Meaning | Gloss | Meaning |
|---|---|---|---|
| `ABSN` | absentive | `NEG` | negation |
| `ADV` | adverbial | `NMLZ` | nominalizer |
| `ANTIP` | antipassive | `OBJ` | object |
| `APPL` | applicative | `OBL` | oblique |
| `BEN` | benefactive | `OBV` | obviative |
| `CAUS` | causative | `PART` | particle |
| `CLF` | classifier | `PASS` | passive |
| `COMP` | complementizer | `PFV` | perfective |
| `COMPL` | completive | `POSS` | possessive |
| `COND` | conditional | `PLP` | pluperfect |
| `CONJ` | conjunct | `PRF` | perfect |
| `COP` | copula | `PRES` | present |
| `DECL` | declarative | `PROG` | progressive |
| `DEM` | demonstrative | `PROH` | prohibitive |
| `DIR` | direct | `PROX` | proximate |
| `DIST` | distal | `PST` | past |
| `DISTR` | distributive | `PURP` | purposive |
| `EMPH` | emphatic | `Q` | question |
| `EXCL` | exclusive | `QUOT` | quotative |
| `EXT.PL` | extended plural | `RECP` | reciprocal |
| `FOC` | focus | `REFL` | reflexive |
| `FUT` | future | `RES` | resultative |
| `IMP` | imperative | `SBJV` | subjunctive |
| `INCL` | inclusive | `SUBJ` | subject |
| `IND` | indicative | `SUBV` | subordinative |
| `INF` | infinitive | `TOP` | topic |
| `INST` | instrumental | `VAI` | animate intransitive verb |
| `INT` | intonation | `VII` | inanimate intransitive verb |
| `IPFV` | imperfective | `VOC` | vocative |
| `IMPS` | impersonal | `VTA` | transitive animate verb |
| `IRR` | irrealis | `VTI` | transitive inanimate verb |
| `LOC` | locative | `N-` | non- (prefix) |

Guardrail: several of these glosses (`ANTIP`, `PASS`, `CAUS`, `APPL`, `RECP`, `RES`, `DISTR`, `QUOT`, `COP`, `INT`) name categories not yet given a worked paradigm anywhere in this sheet beyond the voice table in [6.1](#advanced-argument-mapping-warning) and the applicative template in [10.5](#full-verb-template-with-applicative-slot-tao). Recognize them when parsing existing glossed data; do not generate a novel form in one of these categories without an attested source example.

Source-typo note (loop 14 online re-validation): the Wiki `Glosses` page itself defines `VTI` as "transitive verb with animate subject & intransitive object" — this is an apparent typo in the source (it should read "inanimate object", consistent with every other VTI description on the wiki and with this sheet's own definition throughout). This sheet's `VTI` definition ("transitive inanimate verb", i.e. animate subject and inanimate object) is correct; do not silently copy the source's own typo if quoting the `Glosses` page verbatim elsewhere.

Generation contract:

1. Pick one spelling system for the row.
2. Resolve noun animacy before choosing any plural, property form, or verb class.
3. Resolve the verb class before conjugating: VAI, VII, VTA, or VTI.
4. If two animate third persons occur, resolve proximate/obviative before writing the clause.
5. If a noun is possessed, resolve alienable vs inalienable and whether obviation is triggered.
6. If the clause is negative, use both the negative particle and the negative verb form.
7. If tense/evidential marking is needed, do not model English tense alone; resolve source-of-knowledge marking too.
8. If the clause is a question, distinguish yes/no, information question, echo question, tag question, and indefinite-pronoun reading.
9. For counted noun phrases, check whether the numeral requires a classifier.
10. Keep modern normalized forms separate from Pacifique/Rand/Clark source transcriptions.

---

## 0. Style and Orthography Contract

**Write in one orthography per dataset.** The Mi'gmaq Wiki uses Listuguj orthography; Mi'kmaq Online dictionary entries may also show other historical spellings through Pacifique, Rand, and Clark references. Do not mix them in one generated sentence unless the row is explicitly about historical spelling.

**Core Listuguj vowel inventory:**

| Written | Value / note |
|---|---|
| `a e i o u` | full vowels |
| `a' e' i' o' u'` | long vowels; length can distinguish words |
| `'` | schwa when written; predictable schwa may be unwritten |

**Core Listuguj consonant inventory:**

`p t g q gw qw j s m n l w`, plus `i` as a consonant-like `y` sound after another vowel.

**Orthography traps:**

- In Listuguj spelling, `g` is often the voiceless velar stop phoneme where Francis/Smith or other systems may write `k`.
- Historical sources may write the same word differently. Keep historical transcription and modern normalized dictionary spelling in separate fields.
- Long vowels matter: `e'pit` "woman" and `epit` "he/she is seated" are different words.
- Schwa is not always written. Do not insert apostrophes by eye unless the source writes them or a spelling rule requires it.

## 0a. Phonology Guardrails

### 0a.1 Vowels

Mi'gmaq has five full written vowels plus schwa:

| Type | Written forms | Generation rule |
|---|---|---|
| full short vowels | `a e i o u` | ordinary written vowels |
| full long vowels | `a' e' i' o' u'` | preserve exactly from dictionary/source; length can change meaning |
| schwa | `'` | write only when not predictable by rule |

The Mi'gmaq Wiki treats schwa as a "sixth vowel" in pronunciation but notes that it is often not written. For generation, prefer dictionary spelling over phonetic repair.

Vowel allophony refinements, from the Wiki `Vowels` page (loop 8):

| Vowel | Allophone | Environment |
|---|---|---|
| `o` | lowers to [ɔ] | before `q`/`qw` |
| `o'` (long) | occasionally diphthongizes to [oːʷ] | free variation, not conditioned by a single environment named in the source |
| `e` (short) | tenses to [e], and may even diphthongize to [eⁱ] | specifically in **open syllables** |
| `e'` (long) | tenses to [e(ː)] less often than the short vowel does | open syllables (rarer than the short-`e` case) |

Guardrail:

- The `e`-tensing rule is conditioned specifically by open syllables, not a general hedge; do not apply it in closed syllables.
- Short-vowel laxing (see [0a.9](#a.9-laxed-vowels-and-glides)) is conditioned by closed syllables and by unstressed syllables, and explicitly **excludes** `e`/`ɛ` — do not lax `e` by the same rule that laxes `a`/`i`/`o`/`u`.

### 0a.2 Consonants

Listuguj spelling uses:

`p t g q gw qw j s m n l w`

Plus `i` can behave like a consonantal `y` after another vowel, as in `alawei`.

Obstruents have contextual pronunciations. Do not spell pronunciation variants as separate words unless the target orthography requires that. In Listuguj:

| Letter | Common pronunciation range |
|---|---|
| `p` | [p] ~ [b] |
| `t` | [t] ~ [d] |
| `g` | [k] ~ [g] |
| `q` | [q] ~ [h-like/uvular-fricative values] |
| `gw` | [kw] ~ [gw] |
| `qw` | [qw] ~ [h-like labialized value] |
| `j` | [ch] ~ [j] |
| `s` | [s] ~ [z] |

Consonant-specific processes, from the Wiki `Consonants` page (loop 8) — these are named processes beyond the plain obstruent voicing table above:

| Process | Rule | Example |
|---|---|---|
| Backing | `/k/` (written `g`) → [q] after `a`/`o`, especially before another consonant or word-finally | `ga'ta-g` → `gata'q` "eels"; also `apaqt` "sea", `etloqteg` "cooking" (loop 14 online re-validation) |
| Labialization | `/k/`, `/q/` → [kʷ], [qʷ] after `u`, sometimes after `o` | `alug` "cloud" (labialization present in pronunciation, not spelled); also `alugwiaq` "it becomes cloudy", `samuqwaniet` "it (animate) becomes watery" (loop 14 online re-validation) |
| Nasal assimilation | `/t/` → [n] before `n`; `/l/` → [n] before `n`; `/l/` → [n] after `n` | `apsiptnat`; `etlatal+n` → `etlatann` "you are eating"; `wigatign+l` → `wigatignn` "books" |
| Palatalization | `/t/` → [tʃ]/[dʒ] before `i` in derived (morpheme-boundary) contexts only | `nemi+a'tit+l` → `nemiati'tl` vs. `nemi+a'tit+i` → `nemiati'ji` |

Guardrails:

- Backing is not absolute: `jagej` "lobster" keeps `/k/` after `a`. Do not apply backing mechanically to every `a`/`o` + `g` sequence; treat exceptions as attested lexical facts.
- The `wigatign+l` → `wigatignn` nasal-assimilation example is the same form already used in [0a.6](#a.6-sound-length-and-gemination) for consonant length; it is now understood as `l`-to-`n` assimilation, not just phonetic lengthening — both descriptions describe the same surface fact from different angles.
- The palatalization example directly explains the VTA obviative singular/plural alternation already documented in [10.2](#vta-obviative-cross-reference) and [10.3](#theme-signs-directinverse-and-the-obviative-row) (`-atl`/`-a'titl` vs. `-aji`/`-a'tiji`): the `t`-to-`j` change before `i` is this same palatalization process, not a separate suppletive obviative-plural ending.

### 0a.3 Syllable Shapes

Attested syllable shapes include:

| Shape | Example | Meaning |
|---|---|---|
| V | `e.gu.ma'.toq` | he/she anchors it |
| VV | `e'.n'g` | he/she loses it |
| CV | `sa.po'.nug` | tomorrow |
| VC | `eg.sit.pu'g` | morning |
| CVC | `len.tug` | deer |
| CVV | `na'.gweg` | day/daylight |
| VVC | `e's` | clam |
| VCC | `aps.gu'.la.pa'.sit` | he/she looks back |
| word-initial CCV | `plamu` | salmon |
| CVVC | `na'n` | five |
| CVCC | `a.pat.tesg` | it springs back |
| final VCCC | `gl.mu.e.ju.apsgw` | coal |
| final CVVCC | `si'st` | three |

Guardrails:

- Do not "smooth" clusters into English-looking spellings.
- Do not invent written schwas just because a cluster looks hard to pronounce.
- If a generated form creates an unattested-looking consonant pileup, check a dictionary analogue.

Syllable-contact rules, from the Wiki `Syllables` page (loop 8) — these explain *why* clusters syllabify the way they do, beyond the shape inventory above:

- **Maximal Onset Principle**: as many consonants as allowed go into the following onset rather than the preceding coda. Mi'gmaq onsets max out at 1 consonant, so this mostly forces schwa epenthesis rather than large onset clusters: `gesplatl` syllabifies `ges.pə.la.tl`, not `*gesp.latl`.
- **Syllable Contact Law**: the coda's sonority must be greater than or equal to the onset sonority of the following syllable; violations force resyllabification. `ajiglu'lg` is not `*a.jig.lu'lg` (coda `g` < onset `l`, illegal) but `a.ji.glu'lg` (the `g` moves into the following onset). Coda > onset (`alan.guat`) and coda = onset, including geminates (`alis.qotg`, `apat.ta'tl`), are both allowed.
- Sonority scale (same scale used for schwa placement): `p, t, g, gw, q, qw, s, j` (obstruents) < `m` < `n` < `l` < `w, y` < vowels.
- Syllable-initial clusters: normally 1 consonant. The word-initial CC exception (e.g. `plamu` "salmon") requires **rising** sonority (`p < l`, so `pl-` is a legal onset). `lmu'j` "dog" has `l > m` (falling sonority), which is *not* a legal onset cluster — this is why it syllabifies as `#ə.lmu'j` with an epenthetic initial schwa (see [0a.4](#a.4-schwa-writing)) rather than as a true word-initial `lm-` onset.
- Syllable-final clusters: normally 1 consonant; +1 extra `s` is allowed word-internally; +1 more consonant is allowed only word-finally — this is why 3-consonant codas exist word-finally but not word-medially (compare the `final VCCC`/`final CVVCC` rows in the shape table above). The Wiki's own general statement (loop 14 online re-validation): "the largest allowed syllable shape within a word is CVXX, where X stands for either a consonant or a vowel" — a compact way of stating the same ceiling.
- Word-final cluster sonority must decrease or stay equal, never rise (the opposite requirement from onsets). `-tl` and `-gn` also occur word-finally but do not fit the decrease/equal-sonority generalization; treat them as lexicalized exceptions.

Full attested word-final cluster inventory (Wiki `Syllables` page, itemized in loop 9):

| Cluster | Example | Meaning |
|---|---|---|
| `tg` | `asigetg` | he or she instigates |
| `tgw` | `lnaqanatgw` | wooden handle |
| `tp` | `jijuejgwatp` | steeple |
| `pg` | `nepg` | he or she is dead |
| `pj` | `me'go'pj` | snob |
| `ps` | `slaps` | slab of wood |
| `gj` | `migjigj` | turtle |
| `gs` | `lo'gs` | log |
| `qt` | `apaqt` | sea |
| `st` | `si'st` | three (in counting) |
| `sg` | `apattesg` | it (inanimate) springs back |
| `sgw` | `elege'wi'sgw` | queen (deck of cards) |
| `jg` | `epsaqtejg` | stove |
| `ng` | `atuasgwesing` | he or she is lying on his or her back |
| `nj` | `malipqwanj` | hazelnut |
| `ns` | `lagla'ns` | barn (loanword from French `la grange`, per loop 14 online re-validation) |
| `mg` | `setamg` | at the rear or stern of a boat |
| `mgw` | `sulumgw` | goose |
| `lt` | `alt` | some |
| `lg` | `elpilg` | he or she sends him/her/it (animate) by rope towards |
| `lgw` | `Gisu'lgw` | Creator |
| `lj` | `sqolj` | frog |
| `wj` | `apistanewj` | marten |
| `psg` | `waiopsq` | bead |
| `psgw` | `glmuejuapsgw` | coal |

Guardrail: all 25 clusters are attested in real dictionary words; treat any unlisted word-final cluster as unattested and check a dictionary analogue before generating it.
- Schwa cannot fill a bare-V syllable slot (no schwa-only syllables), and the `VV` syllable shape is long-vowel-only — two different short vowels never merge into one hiatus syllable (e.g. `alugwiaq` syllabifies `a.lu.gwi.aq`, not by merging `i`+`a`).
- Geminates always split across the syllable boundary (already noted in [0a.6](#a.6-sound-length-and-gemination); reconfirmed here as a syllable-contact fact, since a geminate coda=onset pair is the coda=onset case of the Syllable Contact Law).

### 0a.4 Schwa Writing

Schwa is written only when not predictable. Predictable schwa is inserted in pronunciation but omitted in ordinary spelling.

Useful rule of thumb from the wiki:

- If a word begins with two consonants, pronounce a schwa before the more sonorous consonant.
- Sonority order used there: vowels > `l` > `n` > `m` > obstruents (`s p t g q gw qw j`).

Examples:

| Written | Pronunciation guide idea | Meaning |
|---|---|---|
| `lnui'sit` | schwa before `l` | he/she speaks the native language |
| `lmu'j` | schwa before `l` | dog |
| `mlagejg` | schwa before `m` | milk |
| `mntn` | schwa inserted for syllabification | mountain |

Word-initial equal-sonority tiebreak (loop 14 online re-validation, Wiki `Writing_Schwa` page): when the two word-initial consonants share equal sonority, the schwa is placed before the *first* consonant rather than by a sonority comparison — e.g. `sgu'l` "school", `stoqon` "fir tree", `lluigneg` "seven", `tgnu` "sweat", `tqoq` "last fall", `ptaqan` "plate", `tplutaqan` "law", `gsnqo'qon` "foolishness" (all pronounced with an epenthetic schwa before the first consonant shown).

Generation rule: spelling follows the written form, not the full phonetic form.

Word-medial and word-final schwa rules, from the Wiki `Writing_Schwa` page (loop 8) — the word-initial rule above was the only position previously covered:

- **Word-medial** (between two vowels, 2 consonants): insert schwa only if the first consonant is *less* sonorous than the second — the mirror image of the word-initial rule, but consistent with "schwa goes before the more sonorant member" in both positions. `l`, `m`, `n` count as equal sonority to each other here, so no schwa is inserted between them (e.g. `gamlamit`, no schwa between `m` and `l`); example where it does apply: `oqnisqwa'tu` "cover it up" (schwa between `q` and `n`, loop 14 online re-validation). For 3+ medial consonants, schwa goes before the most sonorous one (e.g. `tplutaqan` "law", `gmsnmuaw` "do not take (imperative)"). For a medial geminate, schwa goes **after** the geminate, not before or inside it (e.g. `ennmtesg`).
- **Word-final** (2 consonants at word end): schwa is inserted only if the *second* consonant is more sonorous than the first (e.g. `sign` [sigən]); no schwa if the two are equal or identical in sonority (e.g. `agnutg`, `sgilminn`).
- Generation rule: apply the word-initial, word-medial, and word-final rules as three separate checks — a form correct by the word-initial rule is not automatically correct medially or finally; check the specific consonant pair and position each time.

**Schwa pronunciation (distinct from schwa writing above)** — this content was identified in an earlier research pass but had not actually been written into this sheet until loop 14's online re-validation caught the gap, confirmed against the Wiki `Schwa` page directly:

- Schwa has three allophones, by frequency: `[ə]` (most common, e.g. `apt'tesg` [aptədɛskʰ]), `[ɨ]` (less common, e.g. `als'g` [alsɨkʰ]), and `[ʉ]` (rare, e.g. `apu's'g` [abuːsʉkʰ]).
- Unlike English, Mi'gmaq schwa **can bear stress** — the source explicitly contrasts this with English, where "the stressed counterpart of schwa is the vowel [ʌ]". This is the basis for the stress-visibility exceptions already noted in [0a.5](#a.5-stress) (word-initial schwa, schwa nearest the word's end, schwa after a `CC` cluster, etc.) — those exceptions exist precisely because schwa can carry stress in the right environment, unlike in English.
- Schwa is otherwise "often skipped over by the stress assignment rules" — i.e. weightless by default, becoming weighted only in the specific environments in [0a.5](#a.5-stress).
- Unstressed schwas **may optionally delete** in fast/casual speech, though the source notes this is "less systematic" than the parallel deletion process in some related languages. Do not treat this as a spelling rule — deletion is a fast-speech phonetic phenomenon, not a basis for omitting a written schwa.

### 0a.5 Stress

Stress is not marked in ordinary Listuguj spelling and this sheet does not add accent marks to generated forms. However, the Wiki `Stress` page (loop 8) gives a full, source-attested assignment algorithm, useful for pronunciation/speech-oriented output:

1. Assign stress to every **heavy syllable**. Heavy = a long vowel (`V'`, `CV'`, `CV'C`) or a closed syllable (`VC`, `CVC`, `CVCC`). Light = `CV`, a short bare `V`, or a syllabic sonorant (`Cl`/`Cn`/`Cm`).
2. For a run of 2+ light syllables, stress every second one, counting right-to-left.
3. Always stress the word's first syllable, regardless of its weight.
4. The last stressed syllable in the word gets primary stress; all earlier stressed syllables are secondary.
5. A word-final short vowel counts as heavy for stress purposes (e.g. `anapo` → à.na.**pó**).
6. Optional rule: if stress assignment produces two adjacent stressed syllables, the second is deleted **if it is light** (e.g. `ali'puluet` → à.**lì'**.pù.lu.**ét** or à.**lì'**.pu.lu.**ét**, both attested); a heavy syllable keeps its stress even when adjacent to another stressed syllable.
7. Schwa is normally weightless/invisible to stress, **except** in four environments, where it becomes weighted/stressable: (i) word-initial schwa, (ii) the schwa nearest the word's end, (iii) schwa after a `CC` cluster, (iv) schwa before a sonorant that is flanked by two weightless schwas.
8. A `CəC` syllable counts as **light**, not heavy — this overrides the normal "closed syllable is heavy" rule from step 1.
9. Syllabic sonorants (`m`/`n`/`l` as a syllable nucleus) generally count as light; some schwa-sonorant sequences behave as a single unit instead of two syllables.

Worked multi-step example from the source: `elasumteget` → è.la.**sùm**.te.**gét**.

Guardrail:

- This algorithm is for pronunciation/speech-oriented output only. Do not add accent marks to ordinary Listuguj forms unless a target source orthography explicitly does so.
- Rule 7's four schwa-stress exceptions and rule 8's `CəC`-is-light override interact with the general "heavy syllable" rule in step 1; do not apply step 1 to a schwa syllable without first checking whether it falls into one of the exception environments.

### 0a.6 Sound Length and Gemination

Length can distinguish words. Treat length as lexical or morphological data, not pronunciation decoration.

| Contrast | Meaning difference |
|---|---|
| `wigatign` vs `wigatignn` | book vs books; final `n` length/doubling matters |
| `epit` vs `e'pit` | he/she is sitting vs woman |

Vowel length:

- Full vowels `a e i o u` have long counterparts written `a' e' i' o' u'`.
- Schwa cannot be lengthened.
- Do not remove apostrophes after vowels; they may mark phonemic vowel length.

Consonant length:

- Meaningful consonant length is usually written by doubling the consonant.
- True geminates inside a word are split across syllables, as in a pattern like `et.teg`.
- All consonants can appear as geminates in source examples.
- Optional phonetic lengthening of `m`, `n`, and `l` may occur next to other consonants; this is not usually a spelling change.

### 0a.7 Obstruent Pronunciation Guardrails

These rules are for pronunciation QA and speech-oriented output. Do not respell ordinary Listuguj forms just because an allophone is predictable.

| Environment | Common pronunciation effect |
|---|---|
| word-initially, beside other obstruents, beside voiceless sonorants | obstruents are generally voiceless and unaspirated |
| between vowels | many obstruents voice: `p` -> [b], `t` -> [d], `g/k` -> [g], `gw/kw` -> [gw], `s` may partially voice, `j` may voice |
| word-final plosives | `p`, `t`, `g/k`, `gw/kw` may aspirate in Listuguj pronunciation |
| sonorant before obstruent | sonorants may devoice: `m n l i u` can surface as voiceless allophones |

Refinements from loop 8 (Wiki `Obstruents` page):

- Word-initial obstruents are voiceless **and specifically unaspirated** — an explicit contrast with English, which does aspirate initial `p`/`t`/`k`. A useful learner analogy: Mi'gmaq initial `p`/`t`/`g` sound closer to the English `p`/`t`/`k` in "spare/stale/scare" than in "pair/tail/care".
- Intervocalic voicing is the norm for all obstruents, but `/s/` **only partially voices** ([s̬], rarely a full [z]) — treat partial voicing of `/s/` as the expected outcome, not an edge case.
- `/tʃ/` (written `j`) is the **only** obstruent that may voice word-initially or syllable-initially (not just intervocalically) — every other obstruent is voiceless/unaspirated in that position.
- Devoicing is directional: only a sonorant to the **left** of an obstruent devoices; a sonorant to the right never does. This follows from Mi'gmaq syllable structure, which only allows non-syllabic sonorants in coda position before an obstruent (see the Syllable Contact Law in [0a.3](#a.3-syllable-shapes)), never as an onset immediately after an obstruent in the relevant environment.
- Word-final plosive aspiration is **dialectal, not universal**: Wagmatcook and Eskasoni do not aspirate word-final plosives (voiceless unaspirated instead of aspirated).

Dialect caution: final aspiration and some voicing patterns differ by community.

### 0a.8 Q and QW

The letter `q` is a major learner trap. In Listuguj, `/q/` covers a back-of-the-throat sound area rather than one English-like sound.

Common `q` allophones include:

| Written | Possible pronunciation value |
|---|---|
| `q` | [q] |
| `q` | glottal stop-like [ʔ] |
| `q` | uvular/fricative-like [χ] |
| `q` | pharyngeal/fricative-like [ħ] |
| `q` | [h]-like |
| intervocalic `q` | voiced pharyngeal-like [ʕ] for some speakers |
| final `q` | affricated or aspirated values for many speakers |
| `qw` | labialized versions of the same sound range |

Labialized (`qw`) counterparts, from the Wiki `Pronunciation_of_Q` page (loop 8) — every plain-`q` allophone above has an independently attested labialized counterpart, not just "labialized versions of the same range" in the abstract:

| Plain | Labialized |
|---|---|
| [q] | [qw] |
| [ʔ] | [ʔw] |
| [χ] | [χw] |
| [ħ] | [ħw] |
| [h] | [hw] |
| [ʕ] (intervocalic, dialect-variable) | [ʕw] |
| word-final affricated [q͡χ] | [q͡χʷ] |
| word-final aspirated [qʰ] | [qʷʰ] |

Further detail:

- Word-final aspiration splits by speaker group, not free variation: affricated [q͡χ] for most speakers vs. plain aspirated [qʰ] for a few speakers.
- Cross-dialect citations: Bragg (1976) describes Newfoundland Mi'gmaq with [x] and an intervocalic voiced [ɣ]. Fidelholz (1968) describes a dialect with plain [q] generally and intervocalic [χ] ("a spirant"). Treat these as named, source-attested dialect data points, not free variation across all speakers.

Generation rule: keep written `q`/`qw` as written. Do not substitute `h`, `x`, or glottal-stop spelling unless the target source orthography explicitly does so.

### 0a.9 Laxed Vowels and Glides

Vowel laxing is not contrastive in Mi'gmaq the way it is in English. Learners may hear lax variants, but generated spelling should stay with the ordinary vowel letters.

| Written vowel | Possible lax allophone |
|---|---|
| `i` | [ɪ] |
| `a` | [ɐ] or [ʌ] |
| `o` | [ɔ] |
| `u` | [ʊ] |

Notes:

- `e` is already lax in the Wiki's analysis, and is explicitly **excluded** from the laxing rule below (see 0a.1's tensing-in-open-syllables rule, which pulls `e` the other direction).
- Schwa is always lax.
- Long vowels do not lax, except that long `e'` may have tensing behavior.
- Some speakers lax unstressed vowels; others lax vowels in closed syllables — loop 8 confirms these are the **two named conditioning environments** (closed syllable, unstressed syllable), not an open-ended "some speakers vary" hedge; `e`/`ɛ` is excluded from both.

Glide rules:

| Underlying vowel | Glide pronunciation | Main environment |
|---|---|---|
| `/i/` | [j], like English `y` | after `a`, `a'`, `e`, or `e'` |
| `/u/` | [w] | very common word-initially before vowels, word-finally after vowels, and in many post-vocalic contexts |

Expanded glide environments, from the Wiki `W_and_I` page (loop 8):

- `/i/` → [j] after `a`, `a'`, `e`, or `e'` — the glottal-stop-final long vowels (`a'`, `e'`) are explicitly included, not just the plain short vowels. Attested examples by environment (loop 14 online re-validation): after `a`, `eltaqaiaq` "it (inanimate) extends toward..."; after `a'`, `atla'i` "shirt"; after `e`, `alawei` "pea"; after `e'`, `tle'iawig` "it (inanimate) belongs there".
- `/u/` → [w] between vowels; word-initially before a vowel; word-finally after a vowel; and **before a consonant** (e.g. `mawgitg`) — this last environment is in addition to the purely inter-vowel/word-edge environments in the table above.
- Constraints: `/u/` never becomes [w] before a vowel word-medially (it stays a plain `uV` sequence there); schwa is never adjacent in any of these glide sequences; [w] occurs only between a **short** vowel and a consonant, never after a long vowel.
- Itemized `/u/` → [w] environment matrix, from the Wiki `W_and_I` page (loop 9; `(')` marks an optional preceding glottal stop, `#` marks a word edge):

| Word-initial | Word-medial | Word-final |
|---|---|---|
| `#wa(')` | `a(')wa(')`, `e(')wa(')`, `i(')wa(')`, `owa(')`, `uwa` | `a(')w#` |
| `#we(')` | `a(')we(')`, `e(')we(')`, `iwe(')`, `o(')we(')`, `e(')wu(')` | `e(')w#` |
| `#wi(')` | `a(')wi(')`, `e(')wi(')`, `iwi`, `owi(')`, `uwi'` | `i(')w#` |
| `#wo(')` | `awo(')`, `e(')wo(')`, `iwo`, `owo(')` | `ow#` |
| — | `iwp`, `iws` (glide directly before a consonant) | — |

- Word-final consonants attested after the glide: `p, t, g, gw, q, s, j, l, m, n` — attested combinations include `awp/ewp/iwp`, `awt/ewt/iwt`, `awg/ewg/iwg/owg`, `awgw/ewgw/iwgw/owgw`, `awq/ewq/ewqw`, `aws/ews/iws`, `awj/ewj/iwj/owj`, `ewm/owm`, `awn/ewn/iwn`, `awl/ewl`.
- Treat any `/u/`-glide environment not covered by these two tables as `needs_speaker_review` rather than extrapolating by pattern.
- Devoicing and lengthening of the glides themselves (new category, not previously in this sheet): [j]/[w] can devoice next to voiceless material (written here as j̊, w̥ — e.g. `seitun` [sej̊tun] "blabbermouth", `anawtig` [anaw̥tikʰ] "inexpensive"), and can lengthen (jː, wː — e.g. `metlasa'igl` "ten dollars", `elawlet` "lugs on back"), including devoiced-long combinations.

Spelling guardrail: `gw` and `qw` count as separate consonant letters; the `w` in those letters is not the same as a freely inserted glide.

### 0a.10 Learner Pronunciation Sidebar

From the Wiki `Pronunciation_Differences` page (loop 8) — a simpler, English-learner-framed restatement of the technical rules above, useful as a compact "what will trip up an English speaker" reference rather than a generation rule in itself:

- Word-initial `p`/`t`/`g` sound closer to English "spare/stale/scare" than "pair/tail/care" (unaspirated, per [0a.7](#a.7-obstruent-pronunciation-guardrails)).
- Mi'gmaq `a` is closer to English "father" (favored reading) or "cut", never the vowel in "cat".
- `e` and `o` are pure monophthongs, unlike English's diphthongal "ay"/"ow" — a "don't move your jaw while saying it" check is a useful learner test.
- `ei` and `ow` are their own diphthong phonemes, distinct from plain `e` and `o`.
- Schwa is never like the stressed English vowel in "cut" — only like the unstressed vowel in "about" or "police".

Guardrail: this subsection is a pedagogical aid for pronunciation coaching, not a source of new generation rules; the technical rules in 0a.1-0a.9 remain authoritative for spelling and paradigm generation.

---

## 0b. Orthography Conversion Table

This sheet uses Listuguj orthography as its base, matching the Wiki's own stated choice: "that is the orthography used by the majority of our consultants" (Wiki `Spelling` page, loop 10). This section is a full conversion reference for the other orthographies represented in `reference_materials/` (Rand, Clark, Pacifique/PDM) and in academic sources cited elsewhere in this sheet (Hewson & Francis 1990, Francis/Smith), so that historical or differently-spelled forms can be normalized without guessing.

### 0b.1 Listuguj Vowel Reference

| Written | IPA | Example | Meaning |
|---|---|---|---|
| `a` | [a] | `ala` | that, there |
| `a'` | [aː] | `a'papi` | rope |
| `e` | [e] | `epit` | he/she is seated |
| `e'` | [eː] | `e'pit` | woman |
| `i` | [i] | `ila'sgw` | playing card |
| `i'` | [iː] | `ji'nm` | a man |
| `o` | [o] | `oqoti` | friend, companion |
| `o'` | [oː] | `majo'qiaq` | it wobbles |
| `u` | [u] | `gutang` | town |
| `u'` | [uː] | `su'n` | cranberry |
| `'` | [ə] | `e'n'g` | he/she loses it |

### 0b.2 Listuguj Consonant Reference

| Written | Pronunciation | Example | Meaning |
|---|---|---|---|
| `p` | [p] or [b] | `apjiw` / `getapat` | always / he-she sinks |
| `t` | [t] or [d] | `si'st` / `gesita'tl` | three / he-she hurts someone badly |
| `g` | [k] or [g] | `alsutg` / `tege'g` | he-she owns it / it is cold |
| `q` | [q] or [ħ] | `elaptoq` / `iloqomoqwa'toq` | he-she makes tracks toward / he-she wraps it |
| `gw` | [kʷ] or [gʷ] | `ila'sgw` / `a'gwesn` | playing card / hat |
| `qw` | [qʷ] or [ħʷ] | `esamqwat` | he-she drinks |
| `j` | [tʃ] or [dʒ] | `misegnuj` / `jiptug` | rag / perhaps |
| `s` | [s] or [z] | `sepei` / `na'gu'set` | this morning / sun |
| `m` | [m] | `maqtawe'g` | is being black |
| `n` | [n] | `nalagit` | swift, eager |
| `l` | [l] | `elpilatl` | he-she sends him/her by rope |
| `w` | [w] | `welp'teg` | it is nice and warm |
| `i` (as consonant) | [j] | `alawei` | pea |

### 0b.3 Cross-Orthography Comparison

Each row shows how a single feature is written in Listuguj vs. the named system. Sources: Wiki `Spelling` page (loop 10).

Hewson & Francis (1990) translation orthography:

| Feature | Listuguj | Hewson & Francis |
|---|---|---|
| velar stop | `g` | `k` |
| consonant `i` | `i` | `y` |
| schwa | `'` | `ɨ` |
| doubled consonants | doubled letter | apostrophe after: `l'nuit` |

Francis/Smith orthography:

| Feature | Listuguj | Francis/Smith |
|---|---|---|
| velar stop | `g` | `k` |
| consonant `i` | `i` | `y` |
| schwa | `'` | `ɨ` |
| long vowels | `a' e' i' o' u'` | `á é í ó ú` (accent marks) |

"Lexicon" orthography (as named on the Wiki `Spelling` page):

| Feature | Listuguj | Lexicon |
|---|---|---|
| velar stop | `g` | `k` |
| consonant `i` | `i` | `y` |
| schwa | `'` | `ɨ` |
| long vowels | `a' e' i' o' u'` | `a: e: i: o: u:` |

Metallic orthography:

| Listuguj | Metallic | Pronunciation |
|---|---|---|
| `p` | `p`/`b` | [p] or [b] |
| `t` | `t`/`d` | [t] or [d] |
| `g` | `k`/`g` | [k] or [g] |
| `gw` | `kw`/`gw` | [kʷ] or [gʷ] |
| `j` | `ch`/`j` | [tʃ] or [dʒ] |
| `i` (consonant) | `y` | [j] |
| long vowels | `a' e' i' o' u'` | `à è ì ò ù` |
| schwa | `'` | `ê` |

Pacifique's original orthography (1939) — relevant to `reference_materials/PDM` (Pacifique Dictionary Manuscript) and `reference_materials/PacifiquesGeography`:

| Feature | Listuguj | Pacifique |
|---|---|---|
| long vowels | marked with `'` | not marked |
| [u] | `u` | `o` |
| [o] | `o` | `ô` |
| [q] | `q` | `g` |
| [dʒ]/[tʃ] | `j` | `tj` |
| [w] | `w` | `u` |
| schwa | `'` (when predictable, omitted) | not written |

Rand orthography (1888) — relevant to `reference_materials/Rand` and `reference_materials/RandFirstReadingBook`:

| Feature | Listuguj | Rand |
|---|---|---|
| [dʒ]/[tʃ] | `j` | `ch` |
| [k]/[g] | `g` | `c` or `k` |
| [p]/[b] | `p` | `b` (sometimes `p`) |
| [q]/[ħ] | `q` | `h` |
| [t]/[d] | `t` | `t` or `d` |
| consonant `i` | `i` | `y` |

Rand vowels:

| Listuguj | `a` | `a'` | `e` | `e'` | `i` | `i'` | `o` | `o'` | `u` | `u'` | `'` (schwa) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rand | `ă` | `a`/`â` | `ĕ` | `ā` | `ĭ` | `e` | `ŏ` | `o`/`ō` | `ŏŏ` | `oo`/`u` | `ŭ` |
| IPA | a | aː | e | eː | i | iː | o | oː | u | uː | ə |

Rand's own "Key to the Pronunciation" (loop 15, fetched directly from the archive.org full-text OCR of Rand's 1888 dictionary — `research_sources/rand-1888-key-to-pronunciation.txt`), in his own prose rather than symbol notation:

> "The Consonants are sounded as in English, g being always hard, as in go, egg... c exactly like k: ch as in church... The Vowels are sounded thus: a as in father. [ă] as in fate. [ă] as in fat. [ə-like vowel] as the second a in abaft. e as in me. [ĕ] as in met. ei as in pine (ei in height). [ĭ] as in pin. o as in no. [ŏ] as in not. u as in tube, use. [ŭ] as in tub. oo as in fool (move). [ŏŏ] as in good, wood. ow as in now."
>
> "When any other vowel is doubled, as aa, ee, or when an o is marked thus, [ō], the usual sound of these letters is prolonged. The usual place for the accent in Micmac is on the penult. When it falls on any other syllable, it is marked. But a prolonged vowel always takes the accent; n doubled (nn) at the end of a word is prolonged; m or n at the beginning of a word, preceded by an accent, is sounded without a vowel."

Guardrail: the bracketed diacritic labels above (`[ă]`, `[ĕ]`, etc.) are this sheet's own best-effort mapping back onto the symbol table above, since the archive.org OCR of the actual scanned page **did not preserve Rand's breve/macron marks** — they degraded to stray unrelated characters (digits, stray letters) in the raw OCR text. Confirmed by direct inspection (loop 15): this is the same hard ceiling already documented in [0b.4](#b.4-validation-against-the-local-corpus) below, now doubly confirmed via a second, independent OCR source (archive.org's own full-text pipeline, not just the un-OCR'd scanned images in `reference_materials/Rand`). Do not treat the bracketed reconstructions above as verified; they are this sheet's inference from context (English rhyme-words) matched against the existing Wiki-sourced table, not a direct reading of the original diacritics. Rand's prose about **accent placement** (default penult stress, marked otherwise) and the **n/m-without-a-vowel** rule (word-initial syllabic nasals) are new, reliable content not dependent on the diacritics, and worth comparing to the stress-assignment algorithm in [0a.5](#a.5-stress) and the syllabic-sonorant material in [0a.3](#a.3-syllable-shapes) as independent historical corroboration.

### 0b.4 Validation Against the Local Corpus

The `reference_materials/Clark` extraction is titled *"Rand's Micmac dictionary from phonographic word-lists — transcribed and alphabetically arranged, with a grammar and list of place-names by Jeremiah S. Clark"* — i.e. Clark's book is itself a rearrangement of Rand's material, not an independent orthography. More importantly for this sheet's corpus-backed examples (see [14b.3a](#b.3a-corpus-attested-cross-check-for-verb-paradigm-cells)): each extracted dictionary entry carries **both** a `Transcription` field (the original Pacifique-manuscript spelling, in Pacifique's own orthography) **and** a `Transliteration`/"normalized source as entry" field (a Listuguj-normalized form). The corpus example bank (`docs/micmac-corpus-example-bank.md`) is built from the normalized field, not the raw historical spelling — this resolves the loop-9 open question about whether Clark-sourced examples need a conversion pass: they are already normalized close to Listuguj at the point of extraction.

Real attested Pacifique-to-Listuguj pairs (loop 11), confirming the [0b.3](#b.3-cross-orthography-comparison) Pacifique conversion rules against actual dictionary data rather than only the Wiki's abstract table:

| Pacifique transcription | Listuguj transliteration | Meaning | Rules confirmed |
|---|---|---|---|
| `tiamoegei` | `tia'muegei` | hunt moose | `o`→`u`; unmarked length → `'` |
| `aposgigenatēm` | `apusqi'gna'te'm` | clinch/attach/bind | `o`→`u`; `g`→`q`; macron `ē` → `e'` |
| `apotapgietjig` | `aputapgiejig` | juniper/spruce | `o`→`u`; `tj`→`j` |
| `nganipsemon` | `nqanipsmun` | bowl/goblet/chalice | `g`→`q`; `o`→`u`; medial schwa dropped |
| `sisgoŏg` | `sisguo'q` | dishes/earthenware | final `g`→`q`; unmarked length → `'` |
| `apligemotj` | `apli'gmuj` | rabbit | `tj`→`j`; `o` dropped as schwa; unmarked length → `'` |

Additional pairs (loop 12), pulled directly from `reference_materials/Rand` entries rather than `reference_materials/Clark`:

| Pacifique transcription | Listuguj transliteration | Meaning | Rules confirmed |
|---|---|---|---|
| `oetjiei` | `wejiei` | I come from there | Pacifique `oe`→Listuguj `we` (consistent with the `[w]` row in 0b.3) |
| `sipagiposit` | `sipaqepo'sit` | endure/last/durable | `g`→`q`; unmarked length → `'` |
| `pisgȯlasit` | `pisgolasit` | he/she enters | Pacifique's own breve-dot diacritic (`ȯ`) is dropped with no Listuguj length mark added here — an apparent short vowel, not a length-marking case |

Guardrail: this is a small sample (9 pairs total across `reference_materials/Clark` and `reference_materials/Rand`) but every pair is consistent with the Wiki's own Pacifique conversion rules with no counterexamples found. Treat the `g`→`q` and `tj`→`j` rules as corpus-confirmed, not just Wiki-asserted.

**Genuine extraction-format limitation, confirmed in loop 12**: both the `reference_materials/Rand` and `reference_materials/RandFirstReadingBook` folders structure their annotation boxes around the same Pacifique-manuscript `Transcription`/`Transliteration` cross-reference that Clark uses — they do **not** contain Rand's own 1888 orthographic symbols (`ă ĕ ĭ ŏ ŏŏ`, etc., per [0b.3](#b.3-cross-orthography-comparison)'s Rand row) anywhere in extracted text. Those symbols exist only in the scanned page images, which have not been OCR'd (and per this project's standing caution, unverified OCR should not be treated as reliable text). This means the Rand row of the conversion table **cannot be directly corpus-validated from local text data** — this is a hard limitation of what was extracted, not a task still pending. Treat the Rand row as Wiki-asserted only unless a future OCR pass on the scanned Rand images is done and verified.

Direct first-party validation against `reference_materials/PDM` (Pacifique Dictionary Manuscript, read directly rather than through Clark's or Rand's citations of it) — loop 12:

| Pacifique transcription | Listuguj transliteration | Meaning | Rules confirmed |
|---|---|---|---|
| `aposgigenegei` | `apusgigenegei` | make keys | `o`→`u` |
| `aposgigei, gen, get` | `apusgigei, apusgigen, apusgiget` | turn/close/shut a key | `o`→`u` (×3) |
| `aposgiloōgoei` | `apusgiluoguei` | to be seasick | `o`→`u` (×2) |
| `aposgam, gamogo, gamotigo` | `apusgam, apusgamugw, aposgamutigw` | open | `o`→`u`; `g`→`gw` gemination pattern |
| `aptesgam, gamen, ggag` | `aptesqa'm, aptesqa'mn, aptesqa'q` | enclosing something | `g`→`q`/`qq`→`q`; unmarked length → `'` |
| `aptagnotemai` | `aptagnutmai` | staying to hear news | `o`→`u`; medial schwa dropped |

Guardrail: this direct PDM pass (6 more pairs, independent of the Clark/Rand cross-reference layer used for the pairs above) closes the previously-open "PDM direct validation" follow-up. Combined with the earlier Clark- and Rand-folder pairs, 15 independent attested pairs now confirm the Pacifique `o`→`u` and `g`→`q` conversion rules with zero counterexamples across three different extraction pathways (Clark, Rand, and PDM itself). Treat these two rules as strongly corpus-confirmed; the `tj`→`j` rule has 5 confirmations, also with zero counterexamples.

### 0b.5 Conversion Guardrails

- This table converts by **feature/phoneme**, not by mechanical find-and-replace across whole words: several systems reuse the same letter for different values depending on context (e.g. Rand's `a` covers both `ă` and part of the `â` long-vowel range; Rand's `t` can be either `[t]` or `[d]` the same way Listuguj `t` is). Do not write a blind character-substitution script from this table without also applying the relevant allophone rules in [0a](#a.-phonology-guardrails).
- `reference_materials/Clark` is not covered by name on the Wiki `Spelling` page; based on the consonant/vowel values used in `docs/micmac-corpus-example-bank.md` (extracted from Clark), Clark's spelling is close to Listuguj/modern practice, not to Rand's or Pacifique's older systems — but this is an inference from the extracted data, not a Wiki-confirmed mapping. Treat any Clark-to-Listuguj conversion as `needs_speaker_review` until confirmed against a dedicated Clark orthography key.
- Do not silently normalize a historical source quotation (Rand, Pacifique) to Listuguj spelling when citing it directly — keep the original spelling in the citation and add a normalized form alongside it if needed for generation, per the "Style and Orthography Contract" above.
- Ambiguous or unattested cells: the Wiki page does not give a Pacifique or Rand equivalent for every Listuguj feature (e.g. no explicit Pacifique row for `s`/`m`/`n`/`l` deviation, implying those are unchanged from Listuguj — but this is an assumption, not a confirmed statement in the source). Mark any conversion not explicitly listed above as `needs_speaker_review`.

### 0b.6 Full Contrastive Sound Inventory with Learner Comparisons (Delisle & Metallic 1976)

This book's own ~23-page orthography front matter (loop 13, direct page-image reading) gives a complete "eighteen symbols... thirty-six contrastive sounds" inventory with IPA values and English/French/German comparison words — richer for pronunciation coaching than any single source used so far, and independent of the Wiki-sourced material in [0a](#a.-phonology-guardrails) and [0b.1](#b.1-listuguj-vowel-reference)/[0b.2](#b.2-listuguj-consonant-reference).

The 18 base symbols: `a e i o u p t g j s l m n w y ˜(length) ^(schwa) '(voicing)`.

The 36 contrastive sounds, by row:

| Row | Sounds |
|---|---|
| short vowels | `a e i o u ê` |
| long vowels | `à è ì ò ù` |
| plain stops/fricatives | `p t g gw j s ĝ ĝw` |
| geminate/long | `pp tt gg ss ĝĝ` |
| fortis (apostrophe-marked) | `'p 't 'g 'j 's` |
| sonorants | `l m n` |
| geminate sonorants | `ll mm nn` |

IPA values with comparison words, as given by the source:

| Symbol | IPA | Comparison |
|---|---|---|
| `a` | [a] | "lot" |
| `e` | [ɛ] | "met" |
| `i` | [i] | "beet" |
| `o` | [o] | "cold" |
| `u` | [u] | "boot" |
| `ê` | [ə] | "famous"/"roses" |
| `à` | [aː] | "father" |
| `è` | [ɛː] | "shed" |
| `ì` | [iː] | "seed" |
| `ò` | [oː] | "road" |
| `ù` | [uː] | "food" |
| `p` | [p] | "spit" |
| `t` | [t] | "stick" |
| `g` | [k] | "skip" |
| `gw` | [kʷ] | "squire" (rounded lips) |
| `j` | [c] | "exchange"/"choice" |
| `s` | [s] | "soap" |
| `ĝ` | [x] | "French 'acre'/'marche' or German 'acht'; the English exclamation of disdain 'yuch'" |
| `ĝw` | [xʷ] | labialized `ĝ` |
| `'p` | [b] | "boat" (fortis) |
| `'t` | [d] | "doe" (fortis) |
| `'g` | [g] | "go" (fortis) |

Guardrail: this book's `ĝ` = [x] is a narrower, single-value gloss compared to Listuguj `q`'s documented [q]/[ʔ]/[χ]/[ħ]/[h] allophone range in [0a.8](#a.8-q-and-qw). Do not treat these as automatically equivalent; `ĝ` here may be this dialect's specific realization within (or adjacent to) the broader `q` range, not a proof that the broader range is wrong. Flag as `needs_speaker_review` before equating the two symbols outright.

**Length as literal double-short**: this source analyzes long vowels as literally doubled short vowels (`à` = underlying `/aa/`), used to distinguish words with no other difference: `ulàl` "be kind to him" (`/ulaal/`, single morpheme) vs. `ulaal` "these" (`/ula+al/`, demonstrative `ula` plus a plural suffix `-al`, i.e. two short `a`s meeting at a morpheme boundary). Short identical segments become phonetically long only when no morpheme boundary intervenes.

**Refined `g`→`ĝ` backing rule** (extends [0a.2](#a.2-consonants)'s existing backing rule): "After `a` and `o`, `g` becomes `ĝ` (except for very few cases mostly involving loan words)." Worked set: `pêlamûg` "salmon (plural)" (`g`, not after a/o) vs. `pêlgoĝĝ` "fiancés" (`ĝ`, after `o`) vs. `welèg` "he's fine" (`g`) vs. `nemitoĝ` "he sees it" (`ĝ`, after `u` — **this example does not fit the stated a/o-only environment**, and the source itself does not flag the discrepancy; treat the `a`/`o` conditioning as the stated rule but expect exceptions, and do not "correct" an attested form like `nemitoĝ` to match the rule). This same `g`/`ĝ` alternation is also the verb-agreement morpheme (3rd-person singular, animate plural), not just a lexical-backing fact — i.e. it recurs across the grammar, not only in isolated words.

**Four numbered voicing/devoicing/fortis/aspiration rules**, finer-grained than [0a.7](#a.7-obstruent-pronunciation-guardrails):

1. **Voicing** has four sub-environments: (a) ordinary intervocalic (`epit`'s `-p-` → [b]); (b) stem-initial before a vowel, voiced even with a prefix attached before it — a morphological, not purely phonetic, condition; (c) suffix-initial after a stem-final syllabic segment (`ên`/`êm`/`êl`) plus a following vowel — contrasted with a non-triggering case (`mulinjij` "sewing machine" keeps `-j-` voiceless because `-in` is not syllabic); (d) after a long vowel, only **partial** voicing (`welêg` intermediate between [k] and [g]) vs. full aspiration when no preceding long vowel (`welpijig`, aspirated like English "cake").
2. **Devoicing**: voiced consonants (the fortis row) are voiceless word-finally, with partial voicing if a long vowel or glide immediately precedes.
3. **Fortis**: `p t g gw j` are fortis (tense/emphatic) as the second member of a consonant pair, or when geminate-adjacent.
4. **Aspiration**: `p t g gw j` are slightly aspirated word-finally after anything but a long vowel; doubled/geminate obstruents are strongly aspirated in the same environment.

Dialect exception to Rule 1: `ĝ` and `ĝw` do not voice in Restigouche Micmac ("always voiceless" there); "in some dialects of Nova Scotia, they follow part (a) of Rule 1." This is a named, source-attested dialect split, not a free-variation caution.

**Independent confirmation of active sound change** (cross-references [0c](#c.-sociolinguistic-background-and-active-language-change) below): "depending upon the speaker and dialect... `p, t, g, gw` regularly follow Rule 1, `s` less often, `ĝ` and `ĝw` very seldom or not at all... the Micmac language is undergoing sound change and... the continuants `s, ĝ, ĝw` appear to be the sounds mostly affected." This is a second, independent source confirming the active-sound-change pattern already noted from the Wiki `Background` page (the `g`-for-`q` shift), strengthening rather than duplicating that claim.

**Apostrophe's voicing-marking function** (distinct from its length-marking use in Listuguj-based systems, already noted in [10.7](#full-transitive-combined-ending-paradigm-delisle-metallic-1976)): marks a voiced/voiceless stop alternation too complex to predict cleanly from Rules 1-4 alone. Minimal pairs: `entu` [t] "I lose it" vs. `ên'tu!` [d] "Lose it!"; `telgil` [k] "I am that size" vs. `têl'giltes` [k]→[g] "I will be that size" (partially rule-governed via `e`→`ê` reduction before `m`/`n`/`l`, but with lexical exceptions like `ênnêmtêên`). A second, genuinely unpredictable (not just complex-but-rule-governed) pair: `wesamgîg` "it's too big" vs. `wesam'gîg` "it's too sharp" — contrastive with no stated conditioning environment.

## 0c. Sociolinguistic Background and Active Language Change

From the Wiki `Background` page (loop 12) — facts relevant to authoring decisions, not just historical color.

Speaker population and geography:

- "Mi'gmaq is spoken by 8960 people in Eastern Canada and 330 people in the northeastern United States."
- Listuguj, Quebec (the community whose orthography this sheet uses as its base) has a population of "1,475 (c2006)".
- The Pacifique orthography is "primarily used in New Brunswick" — relevant context for why `reference_materials/PDM` and `reference_materials/PacifiquesGeography` use that system rather than Listuguj.

Dialect variation, with concrete lexical examples:

| Concept | Nova Scotia | Elsewhere |
|---|---|---|
| fork | `nipitgwe'gnn` | `migwije'maqan` |
| cat | `miawj` | `gajuewj` |

Guardrail: treat dialect-variant word pairs like these as **both correct**, not as an error to normalize away. Do not silently substitute one region's form for the other in generated output without knowing the target dialect.

**Active language change — directly relevant to generation choices:**

- Younger speakers increasingly substitute the voiced velar stop **[g] for the voiceless uvular fricative [q]**. This means a strict application of the [0a.8](#a.8-q-and-qw) allophone range may already be shifting toward simpler `[g]`-like realizations in younger speech; do not treat the full historical `q`-allophone range as equally likely across all speaker generations.
- Younger speakers are also using **dual forms more frequently than plural forms** relative to older usage patterns. This is directly relevant to the VAI singular/dual/plural system in [Section 7](#vai-animate-intransitive-verbs): do not assume plural is always the "default" non-singular choice for a younger-speaker register: dual may be more natural where an older source would use plural.
- Generation rule: when a target speaker generation/register is known, prefer the age-appropriate pattern (e.g. dual-leaning for younger-speaker-oriented content); when unknown, default to the fuller historical/wiki-documented paradigm and mark register-sensitive choices as `needs_speaker_review`.

## 1. The Core Grammar Split: Animate vs Inanimate

Every noun is grammatically **animate** or **inanimate**. This is not the same as biological life. The Wiki `Animacy` page calls this "the **gender** of the language, similar to French" (loop 14 online re-validation) — a useful comparison for learners already familiar with a grammatical-gender language, though Mi'gmaq's animate/inanimate split is semantically motivated far more often than French's arbitrary masculine/feminine split.

**Generally animate:**

- people
- animals
- spirits
- some trees
- containers
- some foods and clothing items

**Generally inanimate:**

- many places
- many objects
- many foods and clothing items

**Do not guess animacy from English.** The same semantic area can split: one food/clothing/body-part noun may be animate while another is inanimate.

Confirmed unpredictable domains, from the Wiki `Animacy` page (loop 12):

- **Containers are always animate** as a class — this is a reliable rule, not an exception list, per the source's own framing ("containers...are a type of object that are always animate").
- **Foods and clothing split unpredictably** and must be checked per word, not inferred as a class:

| Domain | Animate example | Inanimate example |
|---|---|---|
| food | `gmu'jmin` "raspberry" | `aloqoman` "grape" |
| clothing | `atla'i` "shirt" | `a'gwesn` "hat" |

- A derivational process can change a noun's animacy: adding `-ewei` can shift an animate noun to inanimate (e.g. the animate fish `plamu` "salmon" vs. the inanimate `plamuwei` "salmon meat" — the food-sense derivative is inanimate even though the animal is animate). Treat `-ewei` as a productive animacy-shifting derivation for food/meat senses, not just a generic suffix.
- Guardrail: since containers are reliably animate but foods/clothing are not, do not extend the "check per word" caution to containers — that domain has a stated rule, while food/clothing does not.

Animacy controls:

- noun plural suffixes
- adjective/property verb endings
- intransitive verb class
- transitive verb class
- third-person agreement patterns

Examples from Mi'gmaq Wiki:

| Role | Mi'gmaq | Meaning | Rule |
|---|---|---|---|
| AN subject | `apje'jit lpa'tuj` | the boy is small | AN subject -> VAI/property AN ending |
| INAN subject | `apje'jg na guntew` | that rock is small | INAN subject -> VII/property INAN ending |
| AN object | `nemi'g epit` | I see the woman | AN object -> VTA |
| INAN object | `nemitu ptauti` | I see the table | INAN object -> VTI |

---

## 2. Person and Number

Mi'gmaq distinguishes five person categories:

| Label | Meaning |
|---|---|
| `1` | speaker: I/me |
| `2` | listener: you |
| `3` | animate third person: he/she/animate it |
| `4` | obviative / fourth person: another animate third person |
| `0` | inanimate third person: inanimate it |

Numbers:

| Number | Meaning |
|---|---|
| singular | one |
| dual | exactly two |
| plural | more than two in VAI; more than one in many other contexts |

Pronoun anchors:

| Person | Singular | Dual / plural |
|---|---|---|
| 1+3 exclusive | `ni'n` | `ninen` |
| 1+2 inclusive | - | `ginu` |
| 2 | `gi'l` | `gilew` |
| 3 | `negm` | `negmow` |

Rules:

- Inclusive/exclusive matters for "we".
- Dual is most visible in animate intransitive verbs.
- In other verb classes, dual is often absent or merged with plural.
- Independent pronouns are often optional because the verb already identifies participants.
- Use an overt pronoun for emphasis, contrast, or discourse clarity, not as an English-style requirement.

Example rule:

- `nemi'g` already means "I see him/her" for an animate object.
- Adding `ni'n` or `negm` emphasizes "I" or "him/her"; it is not required just to identify the participants.

### 2.1 Full Person x Number Reference Matrix

From the Wiki `Person and number` page (a separate page from `Person & Number marking`, which covers the same territory from the verb-conjugation side — see [7](#vai-animate-intransitive-verbs)):

| Person | Singular | Dual | Plural |
|---|---|---|---|
| 1 exclusive | I | we (me and another, not listener) | we (me and others, not listener) |
| 1 inclusive | not applicable as singular | we (me and you) | we (me, you, and another/others) |
| 2 | you | you two | you all |
| 3 (proximate animate) | he/she/it | they two | they |
| 4 (obviative animate) | another he/she/it | another two | others |
| 0 (inanimate) | it | not applicable | it (plural) |

Guardrail, verbatim from the source:

- "Not all of these distinctions may be used outside of the VAI verb class" — the dual number in particular is described as appearing primarily with animate intransitive verbs, while other verb classes (VII, VTI, VTA) typically collapse to a singular/plural-only contrast. Do not assume a dual cell exists for VTA/VTI/VII forms unless independently attested (compare the VTA grid in [10.1](#full-present-indicative-subject-x-object-matrix), which has no dual row).
- The obviative (4th person) and inanimate (0th person) rows only apply to animate third persons and inanimate subjects/objects respectively; they are not part of the Speech Act Participant (1st/2nd person) system.

---

## 3. Nouns

### 3.1 Plural

Mi'gmaq nouns have singular vs plural, expressed by suffixation rather than a distinct dual noun form (dual number applies to verb agreement, not noun morphology — see [Section 2](#person-and-number)). The suffix depends on animacy and on the noun's final segments. Do not pluralize by English `-s`.

Full conditioning rules, from the Wiki `Plural_Nouns` page (loop 12) — this supersedes any earlier summary-only version of this section:

**Animate plural conditioning:**

| Environment | Plural shape | Examples |
|---|---|---|
| after vowels | `-g`, with vowel lengthening | `tmtmu` → `tmtmu'g` oyster; `plamu` → `plamu'g` salmon; `miti` → `miti'g` aspen/poplar; `sewlugowei` → `sewlugowe'g` rhubarb |
| after `n`, `l`, `j` (not preceded by a consonant), or multisyllabic `s` | `-g` (no lengthening) | `taqate'l` → `taqate'lg` currant; `tu'aqan` → `tu'aqang` ball; `amqwanji'j` → `amqwanji'jg` spoon; `tmato's` → `tmato'sg` tomato |
| after monosyllabic `s`-finals, `t`-finals, or consonant clusters | `-ig`, sometimes with palatalization | `e's` → `e'sig` clam; `slaps` → `slapsig` slab of wood; `e'pit` → `e'pijig` woman (note `t`→`j` palatalization, matching the general palatalization rule in [0a.2](#a.2-consonants)); `sqolj` → `sqoljig` frog; `te'pulj` → `te'puljig` goat; `epsaqtejg` → `epsaqtejgig` stove |
| after `m` | `-ug` | `jin'm` → `jin'mug` man; `paqtesm` → `paqtesmug` wolf; `tia'm` → `tia'mug` moose |
| after `p`, `gw`, or replacing word-final `aw`/`ow` | `-aq` | `sasap` → `sasapaq` jellyfish; `sulumgw` → `sulumgwaq` goose; `nasguaw` → `nasguaq` snowshoe; `guow` → `guaq` pine |
| after `g` not in a cluster, or geminate `q` | `-g` / `-q` | `alug` → `alugg` oyster/cloud; `samqwano'q` → `samqwano'qq` water jug |

Mechanism notes (loop 14 online re-validation, direct quotes from the Wiki `Plural_Nouns` page — these explain *why* the rules above work, not new rules):

- Vowel-final rule: "if the word ends in a sequence of vowels, such as `[ei]`, the final vowel is removed and the preceding vowel is lengthened" — this is the mechanism behind `sewlugowei` → `sewlugowe'g`.
- `n`/`l`/`j`/`s` rule: the `j`-final case only takes plain `-g` "so long as the `[j]` is not preceded by another consonant" — words like `migjigj` or `gajuewj` (consonant+`j` final) do **not** follow this rule and instead pattern with the monosyllabic-cluster `-ig` rule below.
- Monosyllabic/cluster rule: "before `[i]`, assimilation of place seems to occur for `[t]`, resulting in its replacement with the segment `[j]`" — the explicit mechanism for the `e'pit` → `e'pijig` palatalization already cross-referenced to [0a.2](#a.2-consonants).
- `p`/`gw`/`aw`-`ow` rule exception: "this does not apply to word-final diphthongs in which the first vowel is long" — e.g. `tmoqta'w` "log" → `tmoqta'wg` (plain `-g`, not `-aq`), because the `a` in `-a'w` is long.
- `g`/`q` rule: "a `[-q]` also geminates in the animate plural due to assimilation in place of the `[-g]` ending" — i.e. the `q`-geminate pattern is itself an assimilation of the general `-g` suffix, not a separate suffix.

Animate plural exceptions:

- Unpredictable `-aq` on stems not ending in `p`/`gw`: `muin` → `muinaq` bear; `ga't` → `ga'taq` eel; `gast'pl` → `gast'plaq` police officer; `gapiten` → `gapitenaq` captain; `je'g` → `je'gaq` Jack (playing card). The Wiki's own analysis proposes an underlying final `-a` for these stems (`muin` as underlying `/muina/`, `ga't` as `/ga'ta/`), which is why they behave like `p`/`gw`-final stems despite not surfacing with `p`/`gw`.
- Single/dual-token lexical exceptions where the attested plural does not match the expected pattern: `na'goqom` → attested `na'goqomg`, expected `na'goqomug`; `lattolaw` → attested `lattolawg`, expected `lattolaq`; `gjiaplue'w` → attested `gjiaplue'wg`, expected `gjiaplue'wug`; `la'sgw` → attested `la'sgug`, expected `la'sgwaq`; `gawatgw` → attested `gawatgug`, expected `gawatgwaq`.
- Guardrail: do not "fix" an attested irregular plural to match the general pattern; the attested form is correct and the pattern is the approximation.

**Inanimate plural conditioning** ("considerably simpler" per the source — underlying `/-l/` surfaces as `[-l]`, `[-n]`, `[-al]`, or `[-ul]`):

| Environment | Plural shape | Examples |
|---|---|---|
| after vowels, `t`, `s`, `j`, `g`, `m`, `p` | `-l` (with lengthening after vowels, not after consonants) | `p'towti` → `p'towtil` table; `lnuipi` → `lnuipi'l` native paddle (lengthened); `alawei` → `alawe'l` pea (lengthened); `magot` → `magotl` dress; `mapos` → `maposl` pocket; `gmu'j` → `gmu'jl` stick; `gawaqtejg` → `gawaqtejgl` gooseberry; `wiguom` → `wiguoml` house; `lagga'p` → `lagga'pl` cellar |
| after `n` | geminate `-n` | `tepagan` → `tepagann` car; `pguman` → `pgumann` blueberry; `sign` → `signn` stocking/sock |
| `-ew` sequence | replaced by `-al` | `mussew` → `mussal` piece; `guntew` → `guntal` rock; `maqamigew` → `maqamigal` land |
| after `gw` | `-ul` | `llutaqanatgw` → `llutaqanatgul` fencepost; `egsitpu'gwewulgw` → `egsitpu'gwewulgul` rock; `seggw` → `seggul` sweet thing |

Mechanism note (loop 14 online re-validation): the `n`-gemination rule "is due to assimilation of `[l]` and `[n]`, which is seen in several other processes in Mi'gmaq such as Obviation" — i.e. this is the same general `l`/`n` assimilation process already documented as a consonant process in [0a.2](#a.2-consonants), not a plural-specific rule, and the Wiki page itself cross-references Obviation as showing the same assimilation.

Inanimate plural exceptions:

- Only one is documented: `galiulg` (sleigh) → `galiulgul` (sleighs), described by the source as primarily an orthographic variant rather than a true morphological exception.

Local Mi'kmaq Online anchors:

| Headword | Animacy | Plural / alternate form |
|---|---|---|
| `ajioqjemin` blackberry | animate | `ajioqjeming` blackberries |
| `miti` aspen/poplar | animate | `miti'g` poplar trees |
| `atuomgomin` strawberry | animate | `atuomgoming` strawberries |
| `aloqoman` grape | inanimate | `aloqomann` grapes |
| `alawei` pea | inanimate | `alawe'l` peas |
| `alawe'ji'j` pill | inanimate | `alawe'ji'tl` pills/tablets |

Acceptance rule: if dictionary data has an `Alternate Grammatical Forms` plural, use it rather than applying the heuristic.

### 3.2 Diminutive and Size

The diminutive appears as `-ji'j`, meaning "little X", young X, or sometimes affectionate/endearing X. The Wiki says it can attach to both animate and inanimate nouns, apparently without restriction, but generation should still prefer attested examples.

Examples:

- `lpa'tuj` -> `lpa'tu'ji'j` "little boy"
- `gjigan` -> `gjiganji'j` "village"
- `jijgluewj` -> `jijgluewji'j` "lamb"
- `ji'nm` -> `ji'nmji'j` "young man"
- `lmu'j` -> `lmu'ji'j` "puppy"
- `guntew` -> `guntewji'j` "small rock, pebble"

The suffix can also be added to names for affection/endearment.

Trap: not every word ending in `-ji'j` is transparently diminutive. For example, `jipji'j` "bird" ends in `-ji'j`, but there is no ordinary larger form `jip`.

Augmentative:

- Productive strategy: use a size/property word such as `mesg'ig`.
- Older/nonproductive pattern: `gji-` appears in some lexicalized large/great forms, e.g. `ga'gaquj` crow vs `gjiga'qaquj` raven; `nisgam` god vs `gjinisgam` Great Spirit.

Generation rule:

- Use `-ji'j` for small/young/endearing forms only when the base noun and intended meaning are plausible or attested.
- Do not productively generate `gji-` augmentatives; prefer `mesg'ig` or an attested lexical form.

### 3.2a Vocatives and Feminine Suffix

Vocatives are forms used when directly addressing someone. The Wiki notes that kinship words can appear differently as vocatives than they do as ordinary possessed nouns.

Example:

| Form | Use |
|---|---|
| `*geggung tus` | rejected intended "I have a daughter" with bare `tus` |
| `tus, pasi` | "Daughter, sit!" |

Rule:

- Do not use bare inalienable kin roots as ordinary nouns just because they are possible as vocatives.
- Vocative kin forms should be treated as their own lexical/address forms.

Feminine suffix:

- The Wiki identifies `-sgw` as a feminine suffix similar to English `-ess`, but gives no full paradigm.
- Treat `-sgw` as a lexical/attested derivational suffix, not a productive gender rule for arbitrary nouns.

### 3.3 Absentative

Absentative marking indicates that a person is absent, lost, or deceased. It appears on animate nouns and related verbs.

Example pattern:

- living: `Nujj teluisit Piel` - "My father is named Piel."
- deceased/absent: `Nujaq teluisipnaq Piel` - "My deceased father was named Piel."
- `Nemijgamijaq teluisipnaq Sa'naq` - "My grandfather's name was Sa'n." / "My grandfather was called Sa'n."

Do not attach absentative freely to inanimate nouns.

### 3.4 Demonstratives

Basic anchors:

| Mi'gmaq | Rough English |
|---|---|
| `ula` | this / here-near |
| `ala` | that / there-away |

Examples:

- `Piel eig ula tet.` - "Piel is right here / at this place."
- `Piel eig ala tet.` - "Piel is over there / at that place."

Literal-translation caution, from the Wiki `Nouns` page:

- `ula nemis` translates literally as "this my big sister", which the Wiki itself flags as "badly-formed" in English. Do not force an awkward literal English gloss when translating a demonstrative-plus-possessed-noun phrase; use a natural English equivalent ("this sister of mine", "my sister here") instead.

Source-confirmed gap (Wiki, superseded below for plural forms):

- No fuller demonstrative paradigm was found on the Wiki `Nouns` page beyond `ula`/`ala` after a direct check. The Wiki discusses possession conceptually under [Section 5](#possession) rather than as a demonstrative/possessive-pronoun paradigm.

### 3.4.1 Demonstrative Plural (Delisle & Metallic 1976)

A new primary source (`research_sources/micmac-teaching-grammar-delisle-metallic-1976.pdf`, mined loop 12 via direct page-image reading) fills the plural cells the Wiki left blank, with an explicit rule:

- Source rule, verbatim in substance: "singular demonstratives do not distinguish gender [animacy]; plurals do."
- Singular (both animacies, unmarked): `ula` "this", `ala` "that" — matches the Wiki forms above exactly.
- Plural, animacy-split (source orthography):

| Number | Animate | Inanimate |
|---|---|---|
| Singular | `ula`/`ala` | `ula`/`ala` |
| Plural | `ulaig` "these" | `ulaal` "these" |
| Plural | `alaig` "those" | `alaal` "those" |

The full paradigm is now complete: a follow-up pass (loop 13) attested the previously-missing animate plural "those" cell (`alaig`), confirmed on the same page as the definiteness material in [3.6.4](#definiteness-delisle-metallic-1976) below. This paradigm is no longer partial.

Guardrails:

- This source's orthography does not fully match any of the systems already in [0b.3](#b.3-cross-orthography-comparison) (see the orthography caution in [10.7](#full-transitive-combined-ending-paradigm-delisle-metallic-1976)); convert before mixing into Listuguj-spelled generation.
- Possessive-pronoun paradigms (the other half of the previously-confirmed gap) are filled separately — see [5.3](#possessive-pronoun-paradigm-delisle-metallic-1976).

### 3.5 Numerals and Counting

Mi'gmaq distinguishes abstract number words from forms used to count objects. Counting systems can be sensitive to object class, so do not assume one English number word fits every noun phrase.

Basic abstract numerals:

| Number | Mi'gmaq |
|---:|---|
| 1 | `newt` |
| 2 | `ta'pu` |
| 3 | `si'st` |
| 4 | `ne'w` |
| 5 | `na'n` |
| 6 | `as'gom` |
| 7 | `lluigneg` |
| 8 | `ugumuljin` |
| 9 | `pesgunateg` |
| 10 | `newt-isga'q` / `mtln` |

Tens, from the Wiki `Numerals` page:

| Number | Mi'gmaq |
|---:|---|
| 10 | `newt-isga'q` / `mtlin` |
| 20 | `ta'pu-isga'q` |
| 30 | `nes-isga'q` |
| 40 | `ne'w-isga'q` |
| 50 | `na'n-isga'q` |
| 60 | `as'gom te'sisga'q` |
| 70 | `lluigneg te'sisga'q` |
| 80 | `ugumuljin te'sisga'q` |
| 90 | `pesgunateg te'sisga'q` |

Hundreds and thousands:

| Number | Mi'gmaq |
|---:|---|
| 100 | `gasg'ptnnaqan` |
| 200 | `ta'pu gasg'ptnnaqan` |
| 300 | `si'st gasg'ptnnaqan` |
| 400 | `ne'w gasg'ptnnaqan` |
| 500 | `na'n gasg'ptnnaqan` |
| 600 | `as'gom gasg'ptnnaqan` |
| 700 | `lluigneg gasg'ptnnaqan` |
| 800 | `ugumuljin gasg'ptnnaqan` |
| 900 | `pesgunateg gasg'ptnnaqan` |
| 1,000 | `pituiptnnaqan` |
| 1,000,000 | `igjipituiptnnaqan` |

Rules:

- 10-50: add `-isga'q` to the basic number word; `si'st` uses `nes-` for thirty (not the bare stem).
- 60-90: use the basic number plus `te'sisga'q`.
- Add `jel` "and" for the next digit: `newtisga'q jel newt` "eleven".
- Hundreds multiply `gasg'ptnnaqan` by the basic number word, placed before it.

Cross-source numeral variant (loop 15, Wikiversity's *Mi'kmaq language/Counting* page): this independent, lower-authority source gives noticeably different forms for the same concepts — `kaskimtlnaqn` "hundred" (vs. this sheet's `gasg'ptnnaqan`), `pituimtlnaqn` "thousand" (vs. `pituiptnnaqan`), and `kji-pituimtlnaqn` "million" (vs. `igjipituiptnnaqan` — note both use an augmentative prefix, `kji-`/`igji-`, consistent with the `gji-`/`kji-` augmentative variants already documented in [3.2](#diminutive-and-size)). Also gives `21` as `tapuiska'q jel ne'wt` and `62` as `asukom te'iska'q jel ta'pu`, structurally matching this sheet's `jel`-linking rule. Guardrail: do not silently pick one source over the other for the hundred/thousand/million words — Wikiversity is a community-editable, less-vetted source than the specialist `wiki.migmaq.org` project used throughout this sheet, but the forms are different enough that this may reflect genuine dialect variation rather than an error in either source. Mark `needs_speaker_review` before committing to one form over the other in generation. Money-counting is explicitly confirmed absent from this source too — this is now the **third independent source** (Wiki `Numerals`, Delisle & Metallic's counting sections, Wikiversity) with no money-counting content, strengthening this as a genuine ceiling rather than a coincidental gap.

Counting-class warning:

Common classes mentioned by the wiki include long/round objects, round objects, money, time units, classes/groups/types, dimensions, weights, and measures. When generating counted NPs, prefer attested dictionary or lesson examples unless the classifier pattern is known.

### 3.5.0a Ordinals, Age, and Dates (Delisle & Metallic 1976)

A new primary source fills three of the categories the Wiki's `Numerals` page named but left unfilled ([3.5.1](#classifier-rule-for-numerals) below), except money, which remains genuinely unattested in every source checked so far (loop 13, source orthography, not yet converted to Listuguj).

**Ordinal numbers**: a productive suffix `-ewey` on the cardinal number stem.

| Cardinal | Ordinal | Meaning |
|---|---|---|
| (first, no cardinal base) | `amgwesewey` | first |
| `tàpu` "two" | `tàpuewey` | second |
| `sìst` "three" | `sìstewey` | third |
| `nêw` "four" | `nêwewey` | fourth |
| (partial) | `inaĝaneg` | seventh |
| (partial) | `megwayg` | tenth |

Guardrail: not every cell 1-10 was filled in the source (several are blank student-exercise lines); only the cells above are directly attested. Note the surface similarity between this ordinal `-ewey` and the alienable-possession `-ewei` suffix already documented in [5.1](#alienable-possession) and [5.3](#possessive-pronoun-paradigm-delisle-metallic-1976) — possibly the same morpheme doing double duty (nominalizing/ordinal function), but this has not been independently verified; treat as a surface-form observation, not a confirmed shared-morpheme claim.

**Age-counting**: a dedicated, person-marked suffix attached directly to the cardinal number (not a separate classifier word):

| Question | Answer | Meaning |
|---|---|---|
| `Tawjeyn?` | `Tapuisgegipunày` | "How old are you?" / "I'm twenty years old" (`tapuisga` "twenty" + `-gipunày`, 1st person) |
| `Tawjêg?` | `Nanipunàt` | "How old is she?" / "She's five years old" (`nàn` "five" + `-ipunàt`, 3rd person) |

Guardrail: only 1sg (`-ipunay`-type) and 3sg (`-ipunàt`-type) person-marking are attested; the age suffix's other person cells were left blank in the source exercise. Do not extend to other persons by analogy without a source.

**Date-counting**: no distinct date-classifier morpheme — dates are formed by simple juxtaposition of the month name (itself suffixed with `-wigùsgw`/`-igùsgw` "moon") followed by the bare cardinal number: `Tegen nàgweg Punamujuigùsgw nàn?` "What day is the fifth of January?" (`Punamujuigùsgw` "January" + `nàn` "five"). This pattern is confirmed repeated across all 12 Western-calendar months in the source with the number held constant.

**Traditional 13-moon calendar** (source orthography), given in full: `Gisègewigùsgw`, `Majàtuigùsgw`, `Toĝàĝewigùsgw`, `Wigewigùsgw`, `Gesigewigùsgw`, `Punamujuigùsgw`, `Aĝatigùsgw` (intercalary "half-year moon"), `Apigênajitewigùsgw`, `Siggwowigùsgw`, `Penatêmuigùsgw`, `Gisagewigùsgw`, `Usgewigùsgw`, `Nipênigùsgw`. The source explains that removing the middle intercalary moon (`Aĝatigùsgw`) gives the Western 12-month system used elsewhere in the same lesson.

**Days of the week** are themselves ordinal-based, but inconsistently: Monday-Thursday use the ordinal stems (`amgwesewey`/`tàpuewey`/`sìstewey`/`nêwewey`) plus "work-day"; Friday (`weltamultimg` "good-eating day"), Saturday (`gespêteg` "the end"), and Sunday (`agantiêumg` "week-day") are not ordinal-based. Do not assume all seven days follow the ordinal pattern.

Guardrail for this whole subsection: money-counting remains a genuine, twice-confirmed gap (checked against both the Wiki `Numerals` page and this book's counting sections across multiple lessons) — do not invent a money classifier or count phrase.

### 3.5.1 Classifier Rule for Numerals

Mi'gmaq does not use classifiers as an optional decoration on every counted noun phrase. Academic sources on Mi'gmaq classifiers support a numeral-sensitive rule:

| Numeral range | Classifier behavior | Example pattern |
|---|---|---|
| 1-5, and numerals morphologically built from 1-5 | classifier disallowed | `na'n-ijig ji'nm-ug` "five men"; not `*na'n te's-ijig ji'nm-ug` |
| 6 and higher | classifier required | `asugom te's-ijig ji'nm-ug` "six men"; not `*asugom-ijig ji'nm-ug` |

Attested classifier morphemes, from the Wiki `Numerals` page, shown on `ta'pu-` "two-":

| Category | Animate classifier | Animate example | Inanimate classifier | Inanimate example |
|---|---|---|---|---|
| bare (animacy only) | `-sijig` | `ta'pu-sijig` "two animates" | `-gl` | `ta'pu'-gl` "two inanimates" |
| kinds/groups | `-nemig-` | `ta'pu-nemig-sijig` "two kinds of animates" | `-nemig-` | `ta'pu-nemi-gl` "two kinds of inanimates" |
| long/cylindrical | `-oq-` | `ta'pu-oq-sijig` "two cylinder-like animates" | `-a'-` | `ta'pu-a'-gl` "two cylinder-like inanimates" |
| flat/sheet-like | `-anqa-` | `ta'pu-anqa-sijjig` "two sheet-like animates" | `-anqe-` | `ta'pu-anqe-gl` "two sheet-like inanimates" |
| round/globe-like | `-apsg'-` | `ta'pu-apsg'-sijig` "two globe-like animates" | `-apsge-` | `tapu-apsge-gl` "two globe-like inanimates" |

Classifier categories named but **not filled with example forms** in the source (do not invent morphemes for these):

- money
- years of age
- dates
- hierarchical systems/series (ordinal-like: first, second, third; rank; floor number)

Generation rule:

1. Build the numeral first.
2. If the numeral is 1-5 or morphologically built from 1-5, do not insert a classifier.
3. If the numeral is 6 or higher, choose the classifier class from the noun's shape/semantic class and animacy, using the attested `-sijig`/`-gl`, `-nemig-`, `-oq-`/`-a'-`, `-anqa-`/`-anqe-`, or `-apsg'-`/`-apsge-` morphemes above.
4. For money, age, date, or ordinal/hierarchical counting, no classifier morpheme is attested in this source; mark `needs_speaker_review` rather than guessing, and do not reuse one of the five attested morphemes by analogy.

### 3.6 Noun Modifiers, Adjectives, and Relative Clauses

Mi'gmaq nouns can be modified by possession, demonstratives, numerals, diminutives, adjectives/property expressions, and relative clauses.

Adjective/property warning:

- Mi'gmaq "adjectives" often behave more like verbs than English adjectives.
- Verbs can describe events, such as `nem-` "see", or qualities of nouns, such as `maqtaw-` "black" and `ewe'g'-` "loose".
- Do not assume English adjective placement or form; check whether the Mi'gmaq expression is a property verb.

Modifier adjacency:

The Wiki's information-question examples show that modifier placement can affect meaning.

| Pattern | Reading |
|---|---|
| `Mali gesatg wi'gatign stoqonamu'g` | Mary likes the green book |
| `stoqonamu'g wi'gatign` | also a contiguous "green book" pattern |
| `Mali wi'gatign gesatg stoqonamu'g` | Mary likes the book that is green / emphasis on green |
| `wi'gatign Mali gesatg stoqonamu'g` | Mary likes the book that is green / contrastive-like reading |

Generation rule:

- Keep noun and modifier adjacent for ordinary "the ADJ noun" readings.
- If the modifier is separated from the noun, treat the output as contrastive, relative-clause-like, or needing review.

### 3.6.1 Comparative and Superlative (Delisle & Metallic 1976)

Built with **preverbs** on the property-verb (adjectival-verb) form, not a suffix — loop 13, source orthography, not yet converted to Listuguj.

| Degree | Marker | Example | Meaning |
|---|---|---|---|
| positive (2sg base) | — | `Wigewin` | you are fat |
| comparative | `mê` "more" + 3sg verb | `Nin nenaĝ mê wigewit` | I know a fatter one (`mê` + `wigewit` "he is fat") |
| superlative | `maw`/`mawi` "most" + 3sg verb | `Negêm maw wigewit tàn nin nenaĝ` | He's the fattest that I know |

The same `positive → mê+3sg → maw+3sg` pattern is confirmed productive across 8 adjective pairs drilled in the source: fat, big (`mesginn`), tall (`pitoĝsin`), skinny (`alusan`), short (`toĝaĝjijin`), old (`gisiguin`), young (`maljewejuin`), little (`apjejijin`).

Guardrail: only 3rd-person cells are attested for the comparative/superlative construction itself (the base positive form is drilled in 2nd person, but the graded forms are all 3sg). Do not extrapolate other persons for the comparative/superlative without a source. This is a separate system from color-term gradation below — do not conflate the two.

### 3.6.2 Color Terms and Gradation (Delisle & Metallic 1976)

Most color terms are formed by comparison with a reference object, via the suffix `-amûg` "color of": `êstoĝonamûg` "green" (literally "color of a fir tree" — this matches the cheatsheet's own `stoqonamu'g` "green" example above, a useful cross-source confirmation), `sisguamûg` "brown" ("color of mud"), `musigêsgamûg` "light blue" ("color of the sky"). A few basic colors are lexically fixed instead, ending in `-èg`: `megwèg` "red", `maĝtawèg` "black", `wapèg` "white".

Gradation uses three dedicated prefixes, distinct from the comparative/superlative preverbs in [3.6.1](#comparative-and-superlative-delisle-metallic-1976):

| Prefix | Meaning | Example (on `-mgwèg` "red") | Example (on `-stoĝonamûg` "green") |
|---|---|---|---|
| `ami-` | light | `amimgwèg` "light red" | `amistoĝonamûg` "light green" |
| `gesi-` | intense/deep | `gesimgwèg` "deep red, scarlet" | `gesistoĝonamûg` "deep/intense green" |
| `maĝtaw-` | dark | `maĝtawimgwèg` "dark red" | `maĝtawistoĝonamûg` "dark green" |

Guardrail: `maĝtaw-` "dark" (the gradation prefix) shares its root with `maĝtawèg` "black" (the lexically-fixed color term) — a real etymological connection, not a coincidence, per the source. Animacy agreement suffixes ride on top of the color+gradation stem separately (ordinary noun-class agreement), independent of the gradation prefix itself.

Relative clauses:

- `ta'n` is a broad relativizer that can translate as "that", "which", or "who".
- English gap relatives are possible but awkward in the Wiki speaker's judgment; keeping `ta'n` is preferred.

Examples:

| Mi'gmaq | Meaning |
|---|---|
| `nemi'g ta'n wen etl-wissugwat plamuewei` | I see the person who is cooking salmon |
| `Ji'nm ta'n weltesgat'p na nuj` | The man who/that you met is my father |
| `#Ji'nm weltesgat'p na nuj` | gap relative, judged awkward; keep `ta'n` |

### 3.6.3 Relative Clauses: Obligatory Resumptive Pronoun and `na` Distribution (Delisle & Metallic 1976)

This source gives a concrete grammatical explanation for the gap-relative judgment above, rather than just the Wiki speaker's "awkward" intuition:

- **Obligatory resumptive pronoun**: in a relativized clause introduced by `tàn`, a pronoun coreferential with the matrix argument is grammatically **obligatory** and "cannot be omitted" — e.g. `Sàn nemiapênn saĝamal (tàn nìn nenaĝ)` "John saw the chief (that I know)", where `nìn` "I" is required inside the `tàn`-clause. This directly explains why the cheatsheet's own gap-relative example (`#Ji'nm weltesgat'p na nuj`) is ungrammatical: the resumptive pronoun is obligatory, not merely stylistically preferred.
- **The particle `na` has a subject/object- and common/proper-noun-conditioned distribution**, more intricate than the general discourse-particle framing in [14a.1](#a.1-na):
  - For a **common noun** (e.g. `saĝamaw` "chief") that is the **subject** of the main clause and has a following relative clause: `na` is required as a "special definitizer and relative clause introducer" — `Na saĝamow (tàn nìn nenaĝ) nemiaĝênn Sànal` "The chief (that I know) saw John."
  - For the same common noun in **object** position with a following relative clause: `na` does **not** occur — `Sàn nemiapênn saĝamal (tàn nìn nenaĝ)` "John saw the chief (that I know)" (no `na` before `saĝamal`).
  - For a **proper noun** (e.g. `Sàn` "John"), the source states the distribution is the **reverse**: `na` occurs when the proper noun is in object position but not subject position, given a following relative clause. The specific worked example for this cell was not captured in this pass; treat the proper-noun-object-`na` claim as attested-in-principle but not yet directly quoted.
  - Guardrail: this is a genuinely intricate four-way distribution (common/proper × subject/object). Do not casually merge it with the existing `na` material in [14a.1](#a.1-na) without flagging both the subject/object and common/proper conditioning; treat generation involving `na` plus a relative clause as `needs_speaker_review` until the proper-noun-object cell is directly confirmed.

### 3.6.4 Definiteness (Delisle & Metallic 1976)

This source's "notion of definiteness" section gives the key rule for the English "the"/"a" distinction, which the Wiki sources consulted elsewhere in this project do not directly address:

- **Mi'gmaq nouns are default-definite.** A bare demonstrative plus noun is definite (`Ala saĝamaw nemiapênn` "That chief (pointing) saw him"), but a bare noun with **no demonstrative at all is also definite by default** (`Saĝamaw nemiapênn` "The chief saw him").
- **Indefiniteness is the marked case**, not definiteness — the reverse of English, where "a" needs no special marking and "the" is what's added. To force an indefinite reading, the word for "one" (`newtêjit`, from `newt` "one" plus a VAI-type ending) is used as a determiner: `Newtêjit saĝamaw nemiapênn` "A chief saw him" (literally "One chief saw him").
- Generation rule: when translating an English indefinite noun phrase ("a chief", "a man"), do not simply drop the article and leave a bare noun — that produces a *definite* reading in Mi'gmaq. Use `newtêjit` (or the appropriate number word) as an explicit indefinite determiner instead.
- This connects to [3.6.3](#relative-clauses-obligatory-resumptive-pronoun-and-na-distribution-delisle-metallic-1976) above: `na`'s role as a "definitizer and relative-clause introducer" for subject common nouns is consistent with default-definiteness — `na` marks/reinforces definiteness specifically in the context of an upcoming relative clause, not definiteness in general.

---

## 4. Obviation: The Third-Person Spotlight System

Use obviation when a clause or discourse contains more than one animate third-person participant.

Plain rule:

- the main third person in focus is **proximate** (`3`)
- the other animate third person is **obviative** (`4`)

For singular animate nouns, obviative is commonly marked by `-l`, `-al`, or `-tl`.

Examples:

| Mi'gmaq | Meaning | Rule |
|---|---|---|
| `lentug nemiatl mui'nal` | the deer sees the bear | deer is proximate, bear is obviative |
| `Mali gesalatl Pielal` | Mary loves Peter | Mary proximate, Peter obviative |
| `witapal` | his/her friend | possessed animate noun is obviative |

Verb agreement also reflects obviation, especially in VTA forms.

Common VTA obviative endings:

| Ending | Meaning |
|---|---|
| `-atl` | `3>4`, he/she acts on another animate third person |
| `-a'titl` | `3PL>4` |
| `-aji` | `3>4PL` |
| `-a'tiji` | `3PL>4PL` |

Spotlight can shift across clauses. Do not assume the first-mentioned person stays proximate forever.

---

## 5. Possession

Mi'gmaq distinguishes **alienable** and **inalienable** possession.

Possession can be expressed in two broad ways:

| Strategy | Availability | Notes |
|---|---|---|
| possessive noun/pronoun plus possessed noun | alienable possession only | often uses an ending like `-ewei`; the ending agrees with the possessum's animacy/number and other features |
| affixes on the possessed noun | alienable and inalienable | marks possessor person/number and possessum number |

Dialect caution:

- Some dialects restrict possession of animals. In those dialects, forms like "my dog" can be ungrammatical or strange with both affixal possession and the `-ewei` strategy.
- Use a clausal "I have an animal" construction instead when the target dialect follows this restriction.

### 5.1 Alienable Possession

Alienable possession is for relationships that can change, such as many objects. It can be expressed with possessive affixes on the possessed noun.

Typical affix pattern:

| Possessor | Singular possessum | Plural possessum |
|---|---|---|
| 1sg | `'nt-STEM-m` | `'nt-STEM-ml` |
| 1pl incl | `'nt-STEM-minu` | `'nt-STEM-minual` |
| 1pl excl | `'nt-STEM-minen` | `'nt-STEM-minenual` |
| 2sg | `'gt-STEM-m` | `'gt-STEM-ml` |
| 2pl | `'gt-STEM-muow` | `'gt-STEM-mual` |
| 3sg | `ugt-STEM-m` | `ugt-STEM-ml` |
| 3pl | `ugt-STEM-muow` | `ugt-STEM-mual` |

Notes:

- In vowel-initial contexts, alienable possession may show `nt-`.
- Before some consonants, the prefix may surface as `n-`.
- Third-person animate possessed nouns may also show obviation.
- Singular animate possessums with third-person possessors can take obviative marking, e.g. `ugt-putai-m-l` "his/her bottle".
- The `t` in the prefixes above is included to show contrast, but ordinary Listuguj spelling may omit it in some contexts.

### 5.1a Alienable Possession: Conditioning by Initial Sound (Wiki `Possession` Page, Loop 14 Online Re-Validation)

The Wiki gives a fuller phonological-conditioning table for 1sg alienable possession, by the possessed stem's initial sound class, with several cells the source itself marks uncertain (`?`):

| Initial sound class | Bare noun | Animacy | 1sg singular possessum | 1sg plural possessum |
|---|---|---|---|---|
| Vowel | `a'gusn` "hat" | inanimate | `'nt-a'gusn-m` | `'nt-a'gusn-ml` |
| Vowel | `amqwanji'j` "spoon" | animate | `'nt-amqwanji'j-m` | `'nt-amqwanji'j-gl` (source marks this cell `?`) |
| Coronal | `tepaqan` "sled" | inanimate | `'n-tepaqan-m` | `'n-tepaqan-mg` (source marks this cell `?`) |
| Coronal | `tap'tan` "potato" | animate | `'n-tap'tan-m` | `'n-tap'tan-m(p)g` |
| Velar | `ga'qan` "door" | inanimate | `'nt-ga'qan-m` | `'nt-ga'qan-ml` |
| Nasal (bilabial) | `magasan` "store" | inanimate | `'nt-magasan-m` | `'nt-magasan-ml` OR `'nt-magasann-m` (source marks both alternatives `?`) |
| Nasal (bilabial) | `ma'gn` "moccasin" | animate | `'nt-ma'gn-m` | `'nt-ma'gn-m(p)g` |
| Nasal (alveolar) | `na'gu'setewei` "clock" | inanimate | `'n-na'gu'setewei-m` | `'nt-na'gu'setewei-ml` (source marks this cell `?`) |

Guardrail: treat the `?`-marked cells as the Wiki's own uncertainty, not this sheet's — do not silently resolve them to one form. This table refines, but does not replace, the general alienable pattern above; it shows the prefix alternates between `'nt-`/`n(t)-`/`'n-` by the stem's initial-sound class, mirroring the same conditioning already documented for inalienable possession below.

### 5.2 Inalienable Possession

Inalienable nouns include:

- body parts
- family members
- some relationship words such as "friend"

Rule:

- inalienable nouns normally require a possessor
- they do not use the same mandatory `-m` possessive suffix pattern as alienable nouns
- pluralization can follow ordinary noun pluralization more directly because the alienable `-m` suffix is absent
- first-person singular vowel-initial roots use `n-`; second-person singular vowel-initial roots use `g-`
- consonant-initial roots vary between `'n-` and `nt-` in first person depending partly on speech rate and phonology

Examples from the Mi'gmaq Wiki:

- `'gpitn` - your hand
- `nunji` - my head
- `nuj` - my father
- `ugmisl` - his/her older sister

Inalienable first-person singular anchors:

| Stem | Meaning | 1sg possessed form | Plural form |
|---|---|---|---|
| `-unji` | head, IN | `n-unji` | `n-unji-l` |
| `-emis` | older sister, AN | `n-emis` | `n-emis-g` |
| `-tojm` | toe, IN | `'n-tojm` | `'n-tojm-l` |
| `-tus` | daughter, AN | `'n-tus` | `'n-tus-g` |
| `-pign` | hand, IN | `n(t)-pign` | `n(t)-pign-n` |
| `-sutuaqn` | ear, IN | `'nsutuaqn` | `'nsutuaqn-l` (loop 14 online re-validation) |
| `-gweiji'j` | little sister, AN | `n(t)-gweiji'j` | `n(t)-gweiji'j-g` (loop 14 online re-validation) |
| `-musti` | stomach, IN | `n-musti` | not attested (loop 14 online re-validation) |

Third-person inalienable caution:

- Third-person prefixes are less predictable in the Wiki's data.
- Animate third-person possessums can trigger obviation, e.g. `ug-mis-l` "his/her older sister" and `w-itap-al` "his/her friend".
- Inanimate possessums such as "head" do not trigger animate obviation.

### 5.2a Full Person Paradigm for Inalienable `-tus` "Daughter" (Wiki `Possession` Page, Loop 14 Online Re-Validation)

This is a **full 7-person possessive paradigm directly from the Wiki itself** (not only from Delisle & Metallic — see [5.3](#possessive-pronoun-paradigm-delisle-metallic-1976) for that source's independent `-mis` paradigm), closing what was previously only a 1sg/plural anchor above:

| Person | Singular possessum | Plural possessum |
|---|---|---|
| 1sg | `'n-tus` | `'n-tus-g` |
| 1pl incl | `'g-tus-inu` | `'g-tus-in-aq` |
| 1pl excl | `'n-tus-inen` | `'n-tus-in-aq` |
| 2sg | `'g-tus` | `'g-tus-g` |
| 2pl | `'g-tus-uow` | `'g-tus-u-aq` |
| 3sg | `ug-tus-l` | `ug-tus-g` |
| 3pl | `ug-tus-ual` | `ug-tus-ua` |

Cross-check against [5.3](#possessive-pronoun-paradigm-delisle-metallic-1976)'s Delisle & Metallic `-mis` "older sister" paradigm: both sources show the same overall shape (1st/2nd-person prefix, inclusive/exclusive split, 3rd-person obviative-looking `-l`/`-al` suffix on singular possessum), which is a good cross-source structural confirmation, though the two paradigms use different orthographies and cannot be compared letter-for-letter. Also note the vowel-initial-stem person table on the same Wiki page (1st `n-unji`/`n-emis`/`n-itap`, 2nd `g-unji`/`g-emis`/`g-itap`, 3rd `unji`/`ug-mis-l`/`w-itap-al`) gives a third independently-attested stem (`-itap` "male friend") at 1st/2nd/3rd person, consistent with the `-tus` pattern above.

### 5.3 Possessive Pronoun Paradigm (Delisle & Metallic 1976)

A new primary source (`research_sources/micmac-teaching-grammar-delisle-metallic-1976.pdf`, mined loop 12 via direct page-image reading) fills the possessive-pronoun gap the Wiki left open, with full 7-person tables for both an alienable and an inalienable noun. Forms are in this source's own orthography (not yet converted to Listuguj — see the orthography caution in [10.7](#full-transitive-combined-ending-paradigm-delisle-metallic-1976)).

**Alienable noun** `gwitên` "canoe" (inanimate), singular possessum:

| Person | Form |
|---|---|
| 1sg | `êntgwitênêm` |
| 2sg | `êggwitênêm` |
| 3sg | `uggwitênêm` |
| 1+2 (inclusive) | `êggwitênêminu` |
| 1+3 (exclusive) | `êntgwitênêminen` |
| 2pl | `êggwitênêmuow` |
| 3pl | `uggwitênêmuow` |

Plural possessum: same 7 persons, with `-êmêl`/`-êminal`/`-êmual`-family endings replacing the singular-possessum endings above (source gives the pattern but not every cell spelled out independently).

**Inalienable noun** `-mis` "older sister" (animate), singular possessum:

| Person | Form |
|---|---|
| 1sg | `nêmis` |
| 2sg | `gêmis` |
| 3sg | `umisêl` (obviative-marked) |
| 1+2 (inclusive) | `gêmisinu` |
| 1+3 (exclusive) | `nêmisinen` |
| 2pl | `gêmisuow` |
| 3pl | `umisual` |

Plural possessum:

| Person | Form |
|---|---|
| 1sg | `nêmisg` |
| 2sg | `gêmisg` |
| 3sg | `umisg` |
| 1+2 (inclusive) | `gêmisinaĝ` |
| 1+3 (exclusive) | `nêmisinaĝ` |
| 2pl | `gêmisuaĝ` |
| 3pl | `umisua` |

Source's own morphological rule: plural possessive forms = singular possessive prefix + `-êm` suffix; inclusive is marked by a 2nd-person prefix (`êgt-`), exclusive by a 1st-person prefix (`ênt-`/`nêt-`); plural of the possessum itself is marked by a final `-l`.

**Independent (predicative) possessive pronouns** — a distinct system from the affixal one above, used predicatively ("it's mine") rather than attributively ("my X"): `nînewey` "mine", `negêmewêl` "his", `ninênewêg` "ours (exclusive plural)". Only these three cells are attested (1sg, 3sg, 1pl-exclusive); the rest of this predicative paradigm is unattested.

Guardrails:

- This closes the previously-confirmed "no possessive-pronoun table found" gap, but only for these two specific nouns (one alienable, one inalienable). Treat the person/number *pattern* (7-cell structure, inclusive/exclusive marking strategy) as the transferable finding; do not assume every noun's possessive affixes are phonologically identical to `gwitên`'s or `-mis`'s.
- Convert via [0b.3](#b.3-cross-orthography-comparison) before mixing these forms into Listuguj-spelled generation.

### 5.3a Kinship and Body-Part Possession (Delisle & Metallic 1976)

The source's own framing: "Kinship terms in Micmac are always possessed... Only a limited number... presented here... consult Rand's dictionary" for the rest. This section is a fixed conversational drill (each line pairs a *different* kinship role or body part across 2nd/1st person, e.g. "is that your son?" / "yes, and my daughter too") — **not** a clean single-term paradigm the way [5.3](#possessive-pronoun-paradigm-delisle-metallic-1976) is. Do not restructure it as if every row were the same noun in two persons.

Kinship pairs (2nd-person possessed / 1st-person possessed, different role each row):

| 2nd person | 1st person |
|---|---|
| `gujj` "your father" | `nujj` "my father" |
| `êggwis` "your son" | `êntus` "my daughter" |
| `êgjigênam` "your younger brother" | `ênsis` "my older brother" |
| `êggwejij` "your younger sister" | (not attested — blank in source) |

Body-part pairs (same drill structure, 2nd/1st person, different part each row):

| 2nd person | 1st person |
|---|---|
| (not attested) "your cheek" | `ênsituaĝar` "my ear" |
| `êgpugug` "your eye" | `ênsisgon` "my nose" |
| `êgtun` "your mouth" | `êntugapêgên` "my chin" |
| `êgsi` "your lips" | `nipit` "my teeth" |
| `êgpusgun` "your chest" | `êntêlamilu` "my stomach" |
| `êgpaĝam` "your back" | `ênpigaĝan` "my rib" |
| `êgtêlmaĝan` "your shoulder" | `ênjitaĝan` "my neck" |
| `êgpigên` "your hand" | (not attested — blank in source, "arm") |

Guardrails:

- `nipit` "my teeth" uses a bare `ni-` prefix rather than the `ên-` prefix seen on every other 1st-person form in this drill — a genuine inconsistency in the source, not a transcription error on this sheet's part. Do not silently normalize `nipit` to `ênipit`; flag as `needs_speaker_review`.
- The "definiteness and obviation" interaction with possession (named in this source's table of contents) and the comparative/superlative adjective system were not reached in this mining pass; treat as follow-ups if needed.

---

## 6. Verb Class Is Not Optional

Mi'gmaq verbs are sorted by transitivity and animacy.

| Class | Meaning | Agreement target | Example type |
|---|---|---|---|
| `VAI` | animate intransitive | animate subject | he/she dances; he/she eats |
| `VII` | inanimate intransitive | inanimate subject | it stands; it is small |
| `VTA` | transitive animate | animate object | I see him/her; I love you |
| `VTI` | transitive inanimate | inanimate object | I see it; I understand it |

Rules:

- Intransitive class follows the subject's animacy.
- Transitive class follows the object's animacy.
- First and second persons are grammatically animate.
- All transitive verbs are generally treated as having an animate subject by default in the Mi'gmaq Wiki presentation.

Examples:

| Mi'gmaq | English | Class |
|---|---|---|
| `Alasumteket` | he/she walks through snow | VAI |
| `Etlatalk` | he/she is eating | VAI |
| `Ekuma'toq` | he/she anchors it | VTI |
| `Malqutk` | he/she eats it, inanimate food | VTI |
| `Malqomatl` | he/she eats it, animate food | VTA |
| `gaqamg` | it is standing | VII |

Local extraction counts from Mi'kmaq Online annotations confirm the same four-way split appears in the working dictionary data:

| Label in local corpus | Count |
|---|---:|
| verb animate intransitive | 895 |
| verb inanimate intransitive | 226 |
| verb animate transitive | 178 |
| verb inanimate transitive | 149 |

Corpus-backed class anchors:

| Headword | Class | Translation / clue |
|---|---|---|
| `wele'g` | VAI | he/she is living well |
| `alaqteget` | VAI | he/she sails about |
| `pegising` | VAI | he/she arrives |
| `alaqteg` | VII | it is spread out |
| `pemitg` | VII | it is flowing |
| `sipigpa'q` | VII | it is flexible |
| `wela'latl` | VTA | he/she does something good for someone |
| `aptlama'latl` | VTA | he/she smothers him/her |
| `najitugwa'latl` | VTA | he/she is going to wake him/her up |
| `genn'g` | VTI | he/she holds it |
| `alaqte'g` | VTI | he/she spreads it out |
| `apt'sqa'q` | VTI | he/she locks it up |

Selection algorithm:

1. Is there an object?
   - no -> intransitive: VAI if subject is animate, VII if subject is inanimate.
   - yes -> transitive.
2. Is the object grammatically animate?
   - yes -> VTA.
   - no -> VTI.
3. Are both subject and object third-person animate?
   - yes -> resolve obviation before conjugating VTA.
4. Is the English object "it"?
   - do not decide from English; check the Mi'gmaq noun's animacy.

### 6.1 Advanced Argument-Mapping Warning

Do not equate Mi'gmaq verb class with English transitivity too quickly. Speaker-collaborative research on Mi'kmaw argument mapping analyzes stems and the material between stem and inflection as doing more work than an English verb frame.

Advanced working notes:

| Element | Research-backed warning |
|---|---|
| stem class | stems may pattern as unergative or unaccusative |
| little-v `-a` | selects unergative stems in the studied bivalent clauses |
| little-v `-a'` | selects unaccusative stems in the studied bivalent clauses |
| `-a-t` | can introduce an internal argument to an unergative stem |
| `-a'-t` | can introduce a causer argument to an unaccusative stem |
| animacy + voice material | maps active, passive, and antipassive interpretations |

Generation rule:

- For ordinary authoring, use the VAI/VII/VTA/VTI decision tree.
- For derived causative, passive, antipassive, or "same stem with different participants" patterns, require an attested source form or speaker review.

Corpus-attested voice paradigm (Stevens, Denny, Sylliboy & Friesen 2021, speaker-collaborative, 77 verb stems):

The same stem can surface in active, antipassive, or passive voice depending on which Animacy-Voice suffix combination follows the little-v morpheme. This is attested, not a generation template for arbitrary stems.

| Stem class | Little-v | Voice | Animacy-Voice shape | Example | Meaning |
|---|---|---|---|---|---|
| unergative `wissukw-` "cook" | `-a` | active | `-t-m` | `wissukw-a-t-m` + `wius` | I am cooking the meat |
| unergative `wissukw-` "cook" | `-a` | antipassive | `-t-eke` | `wissukw-a-t-eke-y` | I am cooking [stuff], unspecified patient |
| unergative `wissukw-` "cook" | `-a` | passive | `-l-u` | `wissukw-a-l-u-t` + `jakej` | the lobster is being cooked |
| unaccusative `ik-` "arrive/put" | `-a'` | active | `-t-u` | `ik-a'-t-u` + `kutputi` ... `pataluti-iktuk` | I am putting the chair onto the table |
| unaccusative `ik-` "arrive/put" | `-a'` | antipassive | `-t-eke` | `ik-a'-t-eke-y` | I am putting [money] down (betting) |
| unaccusative `ik-` "arrive/put" | `-a'` | passive | `-l-u` | `ik-a'-l-u-t` + `ila'skw` ... `pataluti-iktuk` | the card is being put on the table |

Diagnostics used by the speaker-authors to confirm valence:

- Antipassive clauses stay bivalent even with an unspecified patient: they accept the patient-oriented preverb `a'qati-` "halfway", e.g. `a'qati-wissukw-a-t-eke-y` "I am halfway cooking [stuff]".
- Passive clauses stay bivalent even with an unspecified agent: they accept the agent-oriented preverb `o'pli-` "wrongly", e.g. `o'pli-wissukw-a-l-u-t jakej` "the lobster is being wrongly cooked".
- An intransitive stem's compatibility with an imperative or with `o'pli-` "wrongly" diagnoses whether the stem is unergative (has an external argument) or unaccusative (lacks one); do not guess this from the English translation alone.

Generation rule:

- Treat this voice table as attested anchors for the specific stems `wissukw-` and `ik-` (and the parallel pair `kes-`/`kesisp-` in the same paper). Do not extend the `-t-m`/`-t-u`/`-t-eke`/`-l-u` pattern to a new stem without checking whether that stem is independently attested as unergative or unaccusative.

## 6a. Preverbs

Preverbs attach at the left edge of a verb and modify the meaning of the material to their right. English may translate them as adverbs, prepositions, modal verbs, aspectual verbs, prefixes, or separate expressions.

Examples:

| Mi'gmaq pattern | Meaning |
|---|---|
| `poqju-wissugwatmap` | I started cooking it |
| `newti-wissugwatmap` | I cooked it alone |
| `etl-wissugwatmap` | I was cooking it |
| `me'si-wissugwatmap` | I had difficulty cooking it |
| `ala-wissugwatmap` | I cooked it around / in any direction |

Common preverb meanings (frequent anchors):

| Preverb | Approximate function |
|---|---|
| `poqju-` | begin/start |
| `getu-` | want to |
| `etl-` | progressive / in the process of |
| `minu-` | again / re- |
| `jaqal-` | quickly / energetically |
| `toqjuw-` | up |
| `newti-` | alone / one-by-one |
| `mamuni-` | very / greatly |
| `espi-` | high / level |
| `innui-` | native/person-language related |

### 6a.1 Full Preverb Inventory by Slot

The Wiki `Preverbs` page names 46 preverbs across all 7 slot positions (44 found in loop 8, corrected to 46 after loop 14's online re-validation found `me-` and `melgi-` had been missed). This supersedes the "frequent anchors" table above as the authoritative inventory; use it before treating an unlisted form as a novel/unattested preverb.

Position 7 (aspect 1):

| Preverb | Gloss |
|---|---|
| `etl-` | in the process of |
| `gi's-` | by then, already |
| `i-` | used to |

Position 6 (mode):

| Preverb | Gloss |
|---|---|
| `getu-` | want |
| `amujpa-` | have to |
| `etugjel-` | might, maybe |
| `gisi-` | can, be able to |
| `nata-` | skilled (at), knowledgeable |
| `mili-` | many, a lot |
| `nuji-` | skilled at |
| `me'si-` | difficult, difficulty (also listed under Aspect 2 below in the wiki's own table) |

Position 5 (aspect 2):

| Preverb | Gloss |
|---|---|
| `poqju-` | begin, start |
| `gaqi-` | finish |
| `mesi-` | difficult, difficulty |

Position 4 (duration/quantity):

| Preverb | Gloss |
|---|---|
| `minu-` | again (re-) |
| `siew-` | continue |

Position 3 (manner):

| Preverb | Gloss |
|---|---|
| `jaqal-` | quickly, energetically |
| `gesigew-` | loudly, quickly and loudly |
| `gaqisg-` | frequently |
| `teg-` | intentionally |
| `gimi-` | secretively, surreptitiously |
| `metu-` | difficult |

Position 2 (quantity):

| Preverb | Gloss |
|---|---|
| `newti-` | one, alone |
| `aqat-` | half |
| `toqi-` | the two of them |

Position 1 (direction/state) — the largest and most heterogeneous slot:

| Preverb | Gloss |
|---|---|
| `pem-` | by |
| `enm-` | away, home |
| `wej(i)qua)-` | towards |
| `el-` | to (away) |
| `al-` | around, any direction |
| `apaj-`/`apij-` | back (return) |
| `gigtoqw-` | around, encircle |
| `toqjuw-` | up |
| `(e)jig'l-` | to a different spot |
| `menj-` | up (from reclining) |
| `asaqom-` | across |
| `ugtejg-` | back of |
| `matam-` | to end |
| `pesg-` | into |
| `utan-` | to town |
| `wanu-` | to the cove |
| `wel-` | good/fine |
| `awan-` | awkward, unskilled |
| `lnu-` | of the people (Mi'gmaq) |
| `inn-ui-` | Native/peoples' (language) |
| `alman-uwi` | German (language) |

Position uncertain — the Wiki `Preverbs` page itself marks these with `?`, i.e. even the source does not commit to a firm slot (loop 14 online re-validation; do not silently assign these a confident position the way the rest of this inventory has one):

| Preverb | Gloss | Wiki's own position marking |
|---|---|---|
| `amal-` | in a disorganized/awkward fashion | `(1?)` |
| `mal-` | lazy | `(1?)` |
| `tel-` | condition/state | `(1?)` |
| `wenju-` | French (person), foolish | `(1?)` |
| `wenju-wi` | French (language) | `1` (confident, unlike bare `wenju-` above) |
| `teg-` | intentionally | `(3?)` |
| `me-` | more (?), non-volitional? | `(1? 2?)` — newly found in loop 14, was missing from this sheet's inventory entirely |
| `melgi-` | hard (physical) | `(1?)` — newly found in loop 14, was missing from this sheet's inventory entirely |

Guardrail:

- This inventory is drawn from a single wiki page's own categorization, including its own internal duplication (`me'si-`/`mesi-` appears listed under both Position 5 and Position 6 in the source). Do not silently pick one position; flag stacking involving this preverb as `needs_speaker_review` until resolved.
- Ethnonym/language preverbs (`lnu-`, `wenju-`, `alman-uwi`, `inn-ui-`) are semantically different in kind from the aspect/mode/manner preverbs sharing their slot; do not assume they share the same syntactic behavior just because the wiki groups them in Position 1.
- **Loop 14 online re-validation finding**: an earlier pass (loop 8) transcribed several of the "Position uncertain" preverbs above (`amal-`, `mal-`, `tel-`, `wenju-`, `teg-`) into Position 1/3 as if confidently placed, silently dropping the Wiki's own `?` uncertainty markers. This has now been corrected — those entries are moved to the "Position uncertain" table above, and two entirely new preverbs (`me-`, `melgi-`) the earlier pass missed have been added. Treat any preverb-ordering rule that depends on these entries' exact slot as `needs_speaker_review`, since the source itself is not certain.

Preverb slot guide (summary):

The Mi'gmaq Wiki presents this as a preliminary guide, not a closed rule system. Higher-numbered preverbs tend to occur farther left; lower-numbered preverbs occur closer to the verb stem.

| Position | Category | Examples | Rough meaning |
|---:|---|---|---|
| 7 | aspect 1 | `etl-`, `gi's-`, `i-` | in progress, already, used to |
| 6 | mode | `getu-`, `amujpa-`, `etugjel-`, `gisi-`, `nata-`, `mili-`, `nuji-` | want, have to, might, can, know how, many, skilled |
| 5 | aspect 2 | `poqju-`, `gaqi-`, `mesi-` | start, finish, difficulty |
| 4 | duration | `minu-`, `siew-` | again/re-, continue |
| 3 | manner | `jaqal-`, `gesigew-`, `gaqisg-`, `gimi-`, `metu-` (`teg-` is source-uncertain, see below) | quickly, loudly, often, secretly, difficult |
| 2 | quantity | `newti-`, `aqat-`, `toqi-` | alone/one, half, two |
| 1 | direction/state | 21 confidently-placed preverbs; see the full table above | around, well/good, back, up, into, town, etc. |
| uncertain | source itself marks with `?` | `amal-`, `mal-`, `tel-`, `wenju-`, `teg-`, `me-`, `melgi-` | see the dedicated table above; do not treat as confidently Position 1/3 |

Ordering example:

| Form | Meaning |
|---|---|
| `etl-poqju-newti-wissugwatman` | I am in the process of beginning to cook them by myself |
| `*newti-poqju-etl-wissugwatman` | rejected order for that intended meaning |
| `*poqju-newti-etl-wissugwatman` | rejected order for that intended meaning |

Five-preverb stacking example, from the Wiki `Preverbs` page (loop 9) — the deepest stack attested in any source found so far:

- `getu-poqju-mamuni-espi-innui-sit` "s/he wants to start to speak the people's language (Mi'gmaq) at a very high level" — stacks `getu-` (mode, position 6), `poqju-` (aspect 2, position 5), `mamuni-` (not itemized in the position 1-7 table above; treat as `needs_speaker_review` for its exact slot), `espi-` (also not itemized above), and `innui-` (position 1, direction/state) before the stem `-sit`.
- Guardrail: this example uses two preverbs (`mamuni-`, `espi-`) that appear in the cheatsheet's "frequent anchors" table but not in the full 44-preverb inventory in [6a.1](#a.1-full-preverb-inventory-by-slot) — the Wiki `Preverbs` page's own inventory table and its own worked examples are not fully self-consistent. Do not assume every preverb used in a worked example is also in the page's inventory table, or vice versa; cross-check both before treating a preverb as fully attested with a known slot.

Dependent-stem-in-context example:

- `etl-lugwe-t` "s/he is working" — the dependent stem `-lugwe-` "work/do" (see the dependent-verb warning below) appears here with the `etl-` progressive preverb, consistent with the warning that this stem is not attested bare.

Rules:

- Preverbs attach to verbs, not to nouns.
- Some verbs are independent and can occur without preverbs.
- Some stems are dependent and require a preverb; do not generate them bare.
- Multiple preverbs can stack. Their order changes scope and meaning, so do not freely permute them.
- For generation, sort known preverbs by position from high to low before the stem, then mark exceptions for review.

`mu` diagnostic:

- A separate modifier can be split from the verb by `mu`.
- A true preverb cannot be split from the verb by `mu`.

Verbatim scope statements from the Wiki `Preverbs` page (loop 9):

- Ordering: "the highest number preverb is leftmost one, and the lowest number is the rightmost, just before the verb."
- Negation placement: "`Mu` 'not' is always found before the verb that it negates. It can go between a modifier and a verb...but it cannot go between a preverb and a verb."

Examples:

| Type | Pattern | Reading |
|---|---|---|
| modifier | `esteti mu wissugwatmuap` | I might not cook it |
| true preverb | `*nata-mu-wissugwatmuap` | rejected for "I couldn't cook it" |
| true preverb with negation before it | `mu nata-wissugwatmuap` | I couldn't cook it / did not know how to cook it |

Dependent-verb warning:

The Wiki `Preverbs` page names exactly three dependent stems (verbs that require a preverb to be grammatical, i.e. are ungrammatical bare):

| Stem | Gloss |
|---|---|
| `-lugwe-` | work, do |
| `-enmi-` | laugh |
| (unnamed stem) | cry |

Guardrail:

- This is confirmed as the **complete list given by this source** — the wiki does not name the "cry" stem itself, only that a dependent "cry" root exists. Do not guess which cry-meaning stem this refers to; if a "cry" verb is encountered, mark it `needs_speaker_review` for dependent-stem status rather than assuming it is independent.
- Do not treat this three-item list as exhaustive for the language as a whole — it is exhaustive only for what this specific wiki page documents. Additional dependent stems may exist unattested in this source; if a stem is only ever attested with a preverb across multiple corpus examples, treat that as evidence it may be dependent even if not on this list.

---

## 7. VAI: Animate Intransitive Verbs

VAI verbs have one animate subject and no object.

Mi'gmaq Wiki gives three VAI conjugation classes:

| Class | Example | Meaning |
|---|---|---|
| `-i` class | `teluisi` | I am named |
| `-a` class | `amalgai` | I dance |
| `-e` class | `ewi'gigei` | I write |

Present indicative ending anchors:

| Person / number | `-i` class | `-a` class | `-e` class |
|---|---|---|---|
| 1sg | `-i` | `-ai` | `-ei` |
| 2sg | `-in` | `-an` | `-en` |
| 3sg | `-it` | `-at` | `-et` |
| 1+3 du | `-ieg` | `-aieg` | `-eieg` |
| 2 du | `-ioq` | `-aioq` | `-eioq` |
| 3 du | `-ijig` | `-ajig` | `-ejig` |
| 1+3 pl | `-ultieg` | `-a'tieg` | `-'tieg` |
| 2 pl | `-ultioq` | `-a'tioq` | `-'tioq` |
| 3 pl | `-ultijig` | `-a'tijig` | `-'tijig` |

Number morphology rule:

Modern analyses of Mi'gmaq VAI agreement treat the animate intransitive paradigm as a true singular/dual/plural contrast. The plural is built by adding a pluralizer before the nonsingular person ending.

| Person | Singular | Dual | Plural |
|---|---|---|---|
| 1+3 exclusive | `Ø` / `-an` depending on stem | `-eg` | `-ulti-eg` |
| 1+2 inclusive | not applicable as singular | `-'gw` | `-ulti-'gw` |
| 2 | `-n` | `-oq` | `-ulti-oq` |
| 3 | `-t` | `-j-ig` | `-ulti-j-ig` |

Pluralizer allomorphs include `-ulti`, `-uti`, `-u'ti`, and `-a'ti`; choose the attested stem-specific form where available.

1+2 (inclusive) variant caution:

- The Wiki's dedicated `VAI` page gives 1+2 singular as `-i'ew` (plural `-ulti'ew`) for the `-i` class.
- The Wiki's `Person & Number marking` page gives the same cell as `-i'gw` (plural `-ulti'gw`).
- Both forms are directly attested on different Wiki pages; this sheet cannot resolve which is the intended current form without source-dating or speaker review. Prefer `-i'gw` only if a specific downstream source already commits to it; otherwise flag 1+2 singular/plural as `needs_speaker_review` and surface both attested variants.

Guardrail:

- Do not use an inanimate subject with a VAI form.
- Do not collapse VAI dual and plural. Dual means exactly two; plural means more than two in this paradigm.

### 7.1 VAI Negative Present, by Conjugation Class

Source: Wiki `VAI` page. Endings replace the affirmative ending; the preceding `mu` particle is still required (see [Section 11](#negation)).

| Person / number | `-i` class | `-a` class | `-e` class |
|---|---|---|---|
| 1sg | `-iw` / `-iu` | `-aw` | `-ew` |
| 1sg (1+2) | `-iugw` | `-awgw` | `-ewgw` |
| 2sg | `-iwn` / `-iun` | `-awn` | `-ewn` |
| 3sg | `-iwg` / `-iug` | `-awg` | `-ewg` |
| 1+3 du | `-iweg` | `-aweg` | `-eweg` |
| 2 du | `-(i)woq` | `-awoq` | `-ewoq` |
| 3 du | `-i'wg` / `-iewg` | `-a'tiwg` | `-etiwg` |
| 1+3 pl | `-ultieweg` | `-a'tiweg` | `-'tiweg` |
| 1+2 pl | `-ultieweg` | `-a'tiwgw` | `-'tiwgw` |
| 2 pl | `-uwoq` | `-a'tiwoq` | `-'tiwoq` |
| 3 pl | `-ultiewg` | `-a'titiwg` | `-'titiwg` |

Guardrail:

- Obviative negative cells were not given in the source table (blank in the Wiki `VAI` page); do not invent them.
- `mijji-` (present tense `-i` class) full negative paradigm with the `mu` particle is worked in [11.1](#negative-present-anchors); use that as the whole-word template and this table for the bare ending.

### 7.2 VAI Obviative Ending (Class 1, `-i` Stem)

The Wiki `VAI` page gives one class's obviative row explicitly; the other two classes leave it blank (unattested in this source):

| Person / number | Ending |
|---|---|
| 4 (obviative) singular | `-initl` |
| 4 (obviative) dual | `-inniji` |
| 4 (obviative) plural | `-ultniji` |

Guardrail:

- Only the `-i` class row is attested. Do not derive `-a`/`-e` class obviative endings by analogy; mark them `needs_speaker_review` until found.

---

## 8. VII: Inanimate Intransitive Verbs

VII verbs have one inanimate subject and only two person/number cells (singular and plural — there is no true person distinction since the subject is always third-person inanimate). The Wiki's dedicated `VII` page notes these verbs "are usually grouped with the animate intransitives as a '0th person'" for most discussions, but keeps a separate page to highlight animacy differences.

Present indicative anchor:

| Person / number | Ending |
|---|---|
| 0sg | `-g` |
| 0pl | `-gl` |

Example:

- `gaqamg` - "it is standing"

Negative present:

- The Wiki `VII` page structures a negative-present row in its table but leaves the actual suffixes blank/unfilled in the source. This is a confirmed **gap in the source itself**, not an omission on this sheet's part.
- Do not invent VII negative endings. Mark any VII negative form as `needs_speaker_review` until a filled paradigm is found.

Past/future:

- No VII-specific past or future *paradigm* was found on the Wiki `VII` page. The general tense/evidential system in [Section 10b](#b.-tense-and-evidentiality) is stated for verbs broadly, but no VII-specific worked example (parallel to the VAI `mijji-`/`npat-` anchors) has been located yet.
- One isolated VII past cell is attested (Hamilton 2015 dissertation): `Taliaqass sepei?` "What happened this morning?" — `taliaq-` "happen" (II/VII) with the `-ass` inferential/indirect-knowledge past evidential. This is a single 3sg broad-focus-question cell, not a paradigm; do not extrapolate other persons (VII has no true person contrast) or other evidential/tense combinations from it.
- VII future is confirmed **fully unattested** in every source checked (Hamilton dissertation, Coon & Bale, wccfl35, Inglis & Johnson, Johnson tag-question, Stevens et al.). Inglis & Johnson's future paper derives part of the *AI* future's `-te(k)` element etymologically from the VII/II present stem `etek` "to exist/be located", whose infinitive is `eymik` (loop 16, fuller citation: Inglis & Johnson 2001, citing Hewson & Francis 1990:123, citing the missionary Maillard's own material — see [10c](#c.-mode-inventory) for the `eymik` infinitive itself). `eymik` "does not mean to be someone or something... it means to be somewhere", per Maillard's own gloss, illustrated with `ula eym` "I am here" and `na'te'l eymn` "thou art there". This is about the AI future's historical origin, not an attested VII future paradigm itself. Do not read this etymology as evidence for a VII future.
- Treat VII past/future forms beyond the single `taliaqass` cell as `needs_speaker_review` pending a worked example.

Guardrail:

- Do not use VII for people, animals, or other grammatically animate nouns.

---

## 9. VTI: Transitive Inanimate Verbs

VTI verbs have an animate subject and an inanimate object.

Two main classes:

| Class | Example | Meaning |
|---|---|---|
| `-m` class | `nestm` | I understand it |
| `-tu` class | `nemitu'nn` | you see them, inanimate |

Present indicative anchors:

| Subject | `-m` class, 0sg object | `-m` class, 0pl object | `-tu` class, 0sg object | `-tu` class, 0pl object |
|---|---|---|---|---|
| 1 | `-m` | `-mann` | `-tu` | `-tuann` |
| 1+3 | `-meg` | `-megl` | `-tueg` | `-tuegl` |
| 1+2 | `-mu'gw` | `-mu'gwl` | `-tu'gw` | `-tu'gwl` |
| 2 | `-mn` | `-mnn` | `-tu'n` | `-tu'nn` |
| 2pl | `-moq` | `-moql` | `-tuoq` | `-utoqol` |
| 3 | `-'g` | `-'gl` | `-toq` | `-toqol` |
| 3pl | `-mi'tij` | `-mi'titl` | `-tu'tij` | `-tu'tijl` |

Negative present anchors, both classes (Wiki `VTI` page):

| Subject | `-m` class, 0sg | `-m` class, 0pl | `-tu` class, 0sg | `-tu` class, 0pl |
|---|---|---|---|---|
| 1 | `-mu` | `-muann` | `-tu` | `-tuan` |
| 1+3 | `-mueg` | `-muegl` | `-tueg` | `-tuegl` |
| 1+2 | (not given in source) | (not given in source) | `-tu'gw` | `-tu'gw` |
| 2 | `-mu'n` | `-mu'nn` | `-tu'n` | `-tu'nn` |
| 2pl | `-muoq` | `-muoqol` | `-tuoq` | `-tuoqol` |
| 3 | `-mug` | `-mugl` | `-tugw` | `-tugwl` |
| 3pl | `-mu'tiwgw` | `-mu'tiwgwl` | `-tu'tigw` | `-tu'tiwgl` |

Guardrails:

- The 1+2 negative cell for the `-m` class is a genuine gap in the source; do not invent it.
- The `-tu` class negative present looks nearly identical in shape to its affirmative for several cells (`-tu`, `-tueg`, `-tu'gw`, `-tu'n`, `-tuoq`); this matches the source table as fetched. The negative particle `mu` before the verb is what actually distinguishes the clause (see [Section 11](#negation)) — do not assume the ending alone always carries the negation for this class.
- If the object is animate, switch to VTA.

### 9.1 Attested Past-Tense Cells (Isolated, Not a Paradigm)

Hamilton (2015) attests four VTI past forms across four different stems, covering only 2sg and 3sg subjects (no 1st person or plural subject cell found anywhere):

| Form | Stem/gloss | Meaning |
|---|---|---|
| `maqutmu'tp` | eat-DFLT-2.PST | "You ate an/the apple and bread." (`wenju'su'n aq pipnaqan`) |
| `maqutmu'sp` | eat-DFLT-2.IK.PST | "What did you eat?" (question form; indirect-knowledge/inferential past) |
| `pegwatelgp` | buy-DFLT-3.DK.PST | "Mary bought John's book." (direct-knowledge past) |
| `pegwatelg's` | buy-DFLT-3.IK.PST | "Whose book did Mary buy?" (question form) |
| `egitg'p` | read-DFLT-3.PST.DK | "...that she read" (embedded/relative clause) |
| `pegisitoqs'p` | bring-DFLT-3.PST | "Who brought what?" |

Guardrails:

- These six forms are isolated attested cells from Hamilton's running-text examples, not a filled paradigm table. Only 2sg and 3sg subjects are covered, each with a direct-knowledge (`DK`) and indirect-knowledge/question (`IK`) evidential contrast. No 1sg, 1+2, 1+3, 2pl, or 3pl VTI past cell has been found in any source checked.
- The morpheme segmentation shown in the source's running-text glosses is simplified (e.g. `pegisitoqs'p` is glossed only "3.PST", collapsing the visible `-oq-`/`-s'p` material). Do not treat the compressed gloss as the full morpheme-by-morpheme breakdown; if a fuller segmentation is needed, mark it `needs_speaker_review`.
- VTI future is confirmed **fully unattested** — no VTI future form was found in Hamilton, Coon & Bale, wccfl35, Inglis & Johnson, Johnson's tag-question paper, or Stevens et al. Do not generate a VTI future form; mark it `needs_speaker_review`.
- VTI-specific question forms beyond the two IK/question cells above were not found; treat other VTI question paradigms as `needs_speaker_review`.
- If the object is animate, switch to VTA.

---

## 10. VTA: Transitive Animate Verbs

VTA verbs have an animate object.

Examples:

- `gesalul` - I love you
- `nemi'g` - I see him/her

Present indicative non-obviative ending anchors:

| Subject -> object | Ending |
|---|---|
| 1 -> 2 | `-ul` |
| 1 -> 2pl | `-ulnoq` |
| 1 -> 3 | `-(V)'g` |
| 1 -> 3pl | `-(V)'gig` |
| 2 -> 1 | `-i'lin` |
| 2pl -> 1 | `-i'lioq` |
| 3 -> 1 | `-i'lit` |
| 3 -> 2 | `-(V)'sg` |
| 3pl -> 2 | `-(V)'sgig` |

### 10.1 Full Present Indicative Subject x Object Matrix

The Wiki's dedicated `VTA` page gives a full subject-by-object grid (28 non-obviative combinations; diagonal cells where subject = object are reflexive, not ordinary transitive, forms — see [10a](#a.-reflexives)). Row = subject, column = object.

Affirmative present indicative:

| Subj \ Obj | 1 | 1+3 | 1+2 | 2 | 2pl | 3 | 3pl |
|---|---|---|---|---|---|---|---|
| **1** | REFL | `-ul` | `-ulnoq` | `-(V)'g`* | `-(V)'gig` | — | — |
| **1+3** | — | REFL | `-ulneg` | `-(Ve)g't` | `-(Ve)g'jig` | — | — |
| **1+2** | — | — | REFL | `-ugg` | `-uggwig` | — | — |
| **2** | `-i'lin` | `-i'lieg` | — | REFL | `-(V)'t` | `-(V)'jig` | — |
| **2pl** | `-i'lioq` | `-i'lieg` | — | — | REFL | `-(V)oq` | `-(V)oqig` |
| **3** | `-i'lit` | `-ugsieg` | `-ugsi'gw` | `-(V)'sg` | `-ugsioq` | — | REFL |
| **3pl** | `-i'lijig` | `-ugsieg` | `-ugsi'gwig` | `-(V)'sgig` | `-ugsioq` | — | REFL |

\* `(V)` notation: if the stem ends in a vowel, that vowel lengthens; if the stem ends in a consonant, the linking vowel is a schwa.

Negative present indicative, same grid:

| Subj \ Obj | 1 | 1+3 | 1+2 | 2 | 2pl | 3 | 3pl |
|---|---|---|---|---|---|---|---|
| **1** | REFL | `-ulnu` | `-uluoq` | `-aq` | `-aqig` | — | — |
| **1+3** | — | REFL | `-ul(n)ueg` | `-aqat` | `-aqajig` | — | — |
| **1+2** | — | — | REFL | `-agw` | `-alggwig` | — | — |
| **2** | `-iwn` | `-iweg` | — | REFL | `-awt` | `-awjig` | — |
| **2pl** | `-iwoq` | `-iweg` | — | — | REFL | `-awoq` | `-awoqig` |
| **3** | `-igw` | `-ugsiweg` | `-ugsigw` | `-ulnug` | `-ugsiwoq` | — | REFL |
| **3pl** | `-i'gw` | `-ugsiwegig` | `-ugsi'gwig` | `-ul(n)u'g` | `-ugsiwoqig` | — | REFL |

Guardrails:

- These grids are non-obviative (proximate 3/3pl only). For a 3rd-person subject or object that is obviative, use the obviative endings in [Section 4](#obviation-the-third-person-spotlight-system) and [10.2](#vta-obviative-cross-reference) instead of this grid's `3`/`3pl` columns.
- Blank/`—` cells (e.g. any row/column combining two proximate third persons, or 1 acting on 1+3/1+2) are not attested in this source; do not fill them by pattern-matching the rest of the grid.
- Past and future VTA paradigms across this full grid were not found in this pass; only the AI-style future anchor in [10b](#b.-tense-and-evidentiality) is attested, and it is for VAI, not VTA. Treat VTA past/future beyond the Coon & Bale Slot1/Slot2/Past-Evid template in 10.3 as `needs_speaker_review`.

### 10.2 VTA Obviative Cross-Reference

From the Wiki `Obviation` page (full table repeated here for the VTA-specific view; see also [Section 4](#obviation-the-third-person-spotlight-system)):

| Ending | Meaning | Example |
|---|---|---|
| `-atl` | 3>4 (he/she acts on OBV) | `gesalatl` "he/she likes him/her (obv)" |
| `-a'titl` | 3pl>4 | `gesala'titl` "they like him/her (obv)" |
| `-aji` | 3>4pl | `gesalaji` "he/she likes them (obv)" |
| `-a'tiji` | 3pl>4pl | `gesala'tiji` "they like them (obv)" |

Discourse rule (verbatim from the Wiki `Obviation` page):

- "If there are two animate third person participants in a phrase, the object of the phrase will usually be marked as the obviative by adding `-l`, `-al`, or `-tl`" — singular nouns only; plural nouns do not carry obviation marking.
- "When there are two or more animate third persons within a given stretch of discourse in Mi'gmaq, only one third person is allowed to be proximate or in the spotlight." The spotlight can shift clause to clause based on discourse prominence, not fixed by first mention.

Guardrail:

- Negative and past/future obviative VTA forms were not found in this pass; treat them as `needs_speaker_review`.

Advanced VTA matrix template:

For transitive matrix verbs with two animate participants, Coon & Bale describe a narrower template:

`Stem-Slot1-(Neg)-Slot2-(Past/Evid)-(3PL/OBV)`

| Slot | What it does |
|---|---|
| `Stem` | lexical verb stem, possibly complex |
| `Slot1` | agreement/direction-like material; often object-sensitive |
| `(Neg)` | internal negative morphology when the verb is negated |
| `Slot2` | agreement material that can be subject-sensitive or participant-plural-sensitive |
| `(Past/Evid)` | past/evidential morphology |
| `(3PL/OBV)` | final third-person plural or obviative material |

Slot anchors from Coon & Bale:

| Slot | Person/category | Shape |
|---|---|---|
| Slot 1 | 1 | `-i'li` |
| Slot 1 | 2 | `-u'l(n)` |
| Slot 1 | 3 | `-a` |
| Slot 1 | 3 acting on participant plural | `-ugsi` |
| Slot 2 | 1 | `(-an)` |
| Slot 2 | 2 | `-n` |
| Slot 2 | 3 | `-t` / `-g` |
| Slot 2 | 1 inclusive | `-gw` |
| Slot 2 | 1 exclusive | `-eg` |
| Slot 2 | 2 plural | `-oq` |

`-ugsi` warning:

- `-ugsi` appears in `3 > participant plural` contexts, such as "he/she does not see us" or "he/she does not see you plural".
- It behaves like an inverse-like portmanteau in the analysis, but the full Mi'gmaq system is not a simple copy of more familiar Algonquian inverse paradigms.
- Treat `-ugsi` forms as their own reviewed pattern. Do not generate them by mechanically combining an English subject and object.

Notes:

- VTA paradigms are interaction tables: subject and object both matter.
- Forms involving the obviative require separate care.
- `REFL` cells in the wiki table are reflexive forms, not ordinary transitive forms.
- Third-person plural and obviative can surface late in the word, after past/evidential material.

Guardrail:

- Do not translate English "it" mechanically. If "it" is a grammatically animate Mi'gmaq noun, use VTA.

See [10.3](#theme-signs-directinverse-and-the-obviative-row) below for a fuller theme-sign table (Hamilton 2015) that fills in the obviative-subject cells this Slot 1 table leaves out, and [10.4](#inner-suffix-and-the-personnumber-hierarchy) for the Slot 2/inner-suffix hierarchy in more detail.

### 10.3 Theme Signs: Direct/Inverse and the Obviative Row

Hamilton (2015) gives a fuller theme-sign table than Coon & Bale's Slot 1, because it adds the two obviative-subject cells (glossed `4`/`4PL` here, matching this sheet's `OBV` obviation labels). Theme sign = the morpheme immediately after the verb final; it is what Coon & Bale call Slot 1.

Full theme-sign distribution (adapted; `PROX` = proximate 3rd person, `OBV` = obviative 3rd person):

| Subject \\ Object | 1sg | 1pl excl | 1pl incl | 2sg | 2pl | 3 PROX sg | 3 PROX pl | 3 OBV sg | 3 OBV pl |
|---|---|---|---|---|---|---|---|---|---|
| 1 | - | - | - | `-u'l(n)` | `-ugsi` | `-a` | `-a` | - | - |
| 1pl excl | - | - | REFL | - | - | - | - | - | - |
| 1pl incl | - | REFL | - | - | - | `-a` | - | - | - |
| 2 | `-i('li)` | - | - | - | - | `-a` | - | - | - |
| 2pl | - | `-ugsi` | - | REFL | - | `-u'l(n)` | `-ugsi` | - | - |
| 3 PROX | `-i('li)` | - | - | `-u'l(n)` | - | REFL | - | `-a` (direct) | `-a` |
| 3 PROX pl | - | `-ugsi` | - | `-ugsi` | - | - | - | - | - |
| 3 OBV | - | - | - | - | - | `-gw`/`-gu` (inverse) | - | REFL | - |
| 3 OBV pl | - | - | - | - | - | - | - | - | - |

Theme-sign gloss key (Hamilton's Table 2.5):

| Theme sign | Gloss | Environment |
|---|---|---|
| `-i('li)` | `1OBJ` | first-person object |
| `-u'l(n)` | `2OBJ` | second-person object |
| `-a` | `3OBJ/DIR` | third-person object, and the direct case: proximate subject acting on obviative object |
| `-ugsi` | `3>SAPPL` | third-person subject acting on a Speech Act Participant plural object (see the Coon & Bale warning above) |
| `-gw` / `-gu` | `INV` | inverse: obviative subject acting on proximate object |

Direct vs. inverse (Hamilton 2015, citing the classic Algonquian direct-inverse distinction, restricted in Mi'gmaq to third-person-only forms):

- **Direct**: proximate subject acting on obviative object. Marked with the `-a` theme sign.
- **Inverse**: obviative subject acting on proximate object. Marked with the `-gw`/`-gu` theme sign (surfaces as zero in some affirmative forms; visible once negation is added).

Minimal pair (affirmative, `ges-` "love"):

| Form | Gloss | Meaning |
|---|---|---|
| `gesalatl` | love-AN-DIR-3-OBV | he/she(proximate) loves him/her(obviative) |
| `gesaltl` | love-AN-3-OBV (inverse, zero theme sign) | he/she(obviative) loves him/her(proximate) |

Same pair with negation added, which makes the inverse theme sign visible (Coon & Bale 2014; Hamilton 2015):

| Form | Gloss | Meaning |
|---|---|---|
| `mu gesalagul` | NEG love-AN-DIR-3-NEG-OBV | he/she(proximate) doesn't love him/her(obviative) |
| `mu gesalgugul` | NEG love-AN-INV-3-NEG-OBV | he/she(obviative) doesn't love him/her(proximate) |

Guardrail:

- Only third-person forms show the direct/inverse contrast in Mi'gmaq (unlike some other Algonquian languages, where it also covers first/second person subjects acting on third person). SAP-vs-3 forms use ordinary object-agreement theme signs (`-i('li)`, `-u'l(n)`, `-a`), not the `-gw`/`-gu` inverse marker.
- Do not gloss `-a` as "direct" when the object is a Speech Act Participant; in that environment `-a` is plain 3rd-person object agreement, not direction marking. Only gloss `-a` as `DIR` when both arguments are 3rd person and the subject is proximate.
- Treat cells marked `-` above as unattested/impossible combinations in the source (includes reflexive-blocked cells and feature-overlap gaps); do not fill them by analogy.

### 10.4 Inner Suffix and the Person/Number Hierarchy

The inner suffix (Coon & Bale's Slot 2) is a second agreement position, after the theme sign (and after negation, when present). Two independent research teams describe overlapping but not identical hierarchies for which argument the inner suffix indexes — record both rather than picking one.

Coon & Bale (2014) hierarchy (their focus is Speech-Act-Participant-plural competition):

`1EXCL ≫ 2PL ≫ {1SG, 2SG, or 3 subject}`

Hamilton (2015) hierarchy (broader, includes 3rd person plural and singular explicitly):

`1PL ≫ 2PL ≫ {3PL, 3SG} ≫ {1SG, 2SG}`

Source-honesty note:

- Both papers agree: a plural Speech Act Participant argument (1st or 2nd person plural) is indexed by the inner suffix over any singular argument, regardless of whether it is the subject or the object.
- The papers differ on where 3rd person singular/plural rank relative to 1st/2nd singular once no PART-plural argument is present. Hamilton's table places 3rd person (singular or plural) above 1st/2nd singular; Coon & Bale's discussion is narrower and does not make this specific claim. Do not silently resolve this disagreement — flag any generation depending on the 3-vs-1sg/2sg ranking as `needs_speaker_review`.

A **third, different-in-kind** hierarchy (Hewson 1991:864, via the Inglis 2002 dissertation, loop 12) governs deferential evidential marking, not inner-suffix agreement competition — see [10b.1](#b.1-full-per-person-modal-paradigm-independent-order-ai) for its application:

`2 ≫ 1 ≫ 3(proximate) ≫ 4(obviative) ≫ 0(inanimate)`

Guardrail: do not conflate this hierarchy with the two above. Coon & Bale's and Hamilton's hierarchies both rank arguments for *inner-suffix agreement competition* (which argument the verb's inner suffix indexes); this one ranks persons for *evidential deference* (which person gets the `-s(i)p(n)` deferential marker rather than plain `-s(n)`). All three are legitimate, independently-sourced, but answer different questions.

Inner-suffix forms (realis; from Hamilton's Table 2.7):

| Person/number | Inner suffix |
|---|---|
| 1pl | `-eg` |
| 1+2 pl (inclusive) | `-gw` |
| 2pl | `-oq` |
| 3pl | `-'tit` |
| 3sg | `-t` / `-g` |
| 2sg | `-n` |
| 1sg | `-n` |

Worked examples of the hierarchy (Hamilton 2015):

| Form | Inner suffix indexes | Meaning |
|---|---|---|
| `gesaloq` | 2pl (object), even though subject is 1pl | "we(excl) love her/him" |
| `gesalugsioq` | 2pl (object, via `-ugsi` theme sign since subject is 3rd) | "he/she loves us(excl)" |
| `gesaluln'eg` | 1pl (subject), since 1pl outranks 2sg/2pl object | "we(excl) love you(-all)" |
| `gesali'eg` | 1pl (object), since object is 1pl and subject is 2 | "you(-all) love us(excl)" |
| `gesala'titl` | 3pl (subject only; the 3pl inner suffix appears only when the subject, not the object, is 3rd-person plural) | "they love her/him(obv)" |
| `gesalaji` | 3sg default, not 3pl inner suffix, even though the object is 3rd-person plural | "he/she loves them" |

Generation rule:

- The inner suffix and the theme sign are independent morphemes; do not assume they always index the same argument. In `-ugsi` forms, the theme sign indexes "3rd-person subject acting on SAP-plural object" as a portmanteau, while the inner suffix separately indexes the object.
- The 3rd-person-plural inner suffix `-'tit` is subject-only: it does not appear when the object (rather than the subject) is 3rd-person plural.

### 10.5 Full Verb Template with Applicative Slot (TA+O)

Ditransitive (TA+O, "does X for/to Y") verbs add an applicative morpheme between the verb final and the theme sign. This is the fullest attested template and supersedes the Slot1/Slot2-only template above when a goal/benefactive argument is present:

`(mu) root-verb.final-(Appl)-theme.sign-(Neg)-inner.suffix-(Tense/Evid)-(outer.suffix: 3PL/OBV)`

Worked example (Hamilton 2015):

| Morpheme | `mu` | `elug` | `-atm` | `-u` | `-i` | `-w` | `-g` | `-pn` | `-ig` |
|---|---|---|---|---|---|---|---|---|---|
| Gloss | NEG | fix | DFLT (verb final) | APPL | 1OBJ | NEG | 3 | PST.DK | 3PL |

Translation: "They didn't fix it for me."

Applicative pair showing the same root with and without the benefactive argument:

| Form | Gloss | Meaning |
|---|---|---|
| `elugwatg` | fix-DFLT-3 | he/she fixes it (inanimate) |
| `elugwatmuit` | fix-DFLT-APPL-1OBJ-3 | he/she fixes it (inanimate) for me |

Generation rule:

- Use this fuller template (with the `Appl` slot) whenever the English sentence has a benefactive/goal argument ("for me", "to me") in addition to a theme argument. Use the plain Slot1/Slot2 template from section 10 above for ordinary two-argument VTA clauses.
- The applicative morpheme's own shape (`-u`, `-w`, etc.) needs a source-attested example; do not invent applicative allomorphs by analogy to `-atm-u`.

### 10.6 Attested Past and Future Cells (Isolated, Not a Full Grid)

No source found (Wiki or academic) gives a systematic VTA past or future grid comparable to the present-indicative 7x7 matrix in [10.1](#full-present-indicative-subject-x-object-matrix). This appears to be the practical ceiling of what current sources provide — filling the grid would need a new source such as Hewson & Francis 1990, which `research_sources/README.md` records as access-restricted. The cells below (Hamilton 2015) are isolated attestations, not a paradigm; do not interpolate other cells from them.

Past (ordinary, non-applicative, non-passive):

| Form | Gloss | Meaning |
|---|---|---|
| `gesalip` | love-AN-1OBJ-3.PST | "S/he loved me" (3>1, direct) |
| `gesalapnn` | love-AN-3OBJ/DIR-PST-OBV | "S/he loved her/him (obv)" (3>4, direct) |

Past, negated (makes the inverse theme sign visible — compare [10.3](#theme-signs-directinverse-and-the-obviative-row)):

| Form | Gloss | Meaning |
|---|---|---|
| `weltesguagupnn` | meet.AN-3OBJ-3-NEG-PST-OBV | "...before s/he met John" (3>4, negated) |

Past, passive and applicative variants (for reference; passive/applicative morphology is separate from the plain transitive grid):

| Form | Gloss | Meaning |
|---|---|---|
| `gesalim'g'p` | love-AN-1OBJ.PASS-PST | "I was loved" |
| `gesalu't'p` | love-AN-PASS.3-PST | "S/he was loved" |
| `elugwatmui'pnn` | fix-DFLT-APPL-1OBJ-3.PST-OBV | "S/he fixed a net for me" |
| `elugwatmuimg'p` | fix-DFLT-APPL-2OBJ-1PL-PST | "I was fixed a net" |

Future — one attested cell, but structurally important:

| Form | Gloss | Meaning |
|---|---|---|
| `gesalieg` | love-AN-1OBJ-2PL | "You-all love us" (realis present, 2pl>1pl) |
| `'gsalitisnen` | love-AN-1OBJ-FUT-2PL | "You-all will love us" (irrealis future, 2pl>1pl) |

Structural finding from this minimal pair:

- The inner suffix shows **mood-conditioned allomorphy**: `-eg` in realis (present) mood vs. `-nen` in irrealis (future) mood, for the same 2pl-subject cell.
- The tense/mood/evidential morpheme's position **shifts relative to the inner suffix depending on mood**: in realis forms elsewhere in this sheet the inner suffix precedes tense/evidential material (see the Slot1/Slot2 and applicative templates in [10.5](#full-verb-template-with-applicative-slot-tao)), but in this irrealis-future cell the future marker `-tis` appears to sit before the inner suffix `-nen`. This is a genuine word-internal ordering difference by mood, not a transcription inconsistency in this sheet.
- Guardrail: do not assume the Slot1/Slot2/applicative templates' fixed morpheme order applies unchanged to future/irrealis forms. Treat future VTA word structure as `needs_speaker_review` beyond this one attested cell, and do not mechanically extend `-tisnen` to other person/number combinations.

Guardrail for this whole subsection:

- Only 3>1, 3>4, and one negated 3>4 past cell, plus one 2pl>1pl future cell, are attested for ordinary VTA forms. No 1>2, 1>3, 2>1, 2>3, 3>2, or any plural-subject/plural-object past or future cell has been found in any source checked. Do not fill in the rest of the past/future grid by analogy to the present-indicative matrix.

### 10.7 Full Transitive Combined-Ending Paradigm (Delisle & Metallic 1976)

The single richest VTA agreement paradigm found in this entire project, from a newly-acquired primary source: Delisle & Metallic's 1976 *Micmac Teaching Grammar* (`research_sources/micmac-teaching-grammar-delisle-metallic-1976.pdf`, a 629-page scanned teaching grammar; mined loop 12 by rendering and reading scanned page images directly, since `pdftotext` cannot extract usable text from this scan). "Table 1: Transitive Combined Endings" and "Table 2: Reflexives and Reciprocals" (pp. 477-481) give a combined subject×object ending table for the stem `nemî-` "see" that is far denser than the Wiki `VTA` page's 7×7 grid in [10.1](#full-present-indicative-subject-x-object-matrix).

**Orthography note (corrected after fuller front-matter review, loop 12):** this source is co-authored by Manny L. Metallic and its schwa symbol (`ê`) and long-vowel accents (`à è ì ò ù`) match the abbreviated "Metallic orthography" row already in [0b.3](#b.3-cross-orthography-comparison) (previously sourced only from the Wiki `Spelling` page's secondhand description). However, a fuller read of this book's own ~23-page orthography front matter shows additional conventions the Wiki's brief Metallic summary does not capture: a phonologically-conditioned `g`/`ĝ` alternation (`g`→`ĝ` after `a`/`o`, with lexical exceptions), and an apostrophe used specifically to mark voiced/voiceless stop alternations too complex to predict by rule (distinct from the apostrophe's length-marking use in the Listuguj-based systems). Treat this book's orthography as a **richer, firsthand version of the same Metallic system** the Wiki abbreviates — not a contradiction of it, but not a byte-for-byte match either. Forms below are given in this source's own orthography; convert via [0b.3](#b.3-cross-orthography-comparison) before mixing into Listuguj-spelled generation, and expect the conversion to be lossy in the `g`/`ĝ` and voicing-apostrophe cases until those are added to [0b.3](#b.3-cross-orthography-comparison) itself.

Table 1a — subject (rows) acting on 1st/2nd/3rd-proximate/1st-plural objects (columns: I, You, He, We-incl-pl, We-excl-pl):

| Subj \ Obj | I | You | He | We-incl-pl | We-excl-pl |
|---|---|---|---|---|---|
| I | REFL | `-ûl` | `-g` | n/a | n/a |
| You | `-in` | REFL | `-t` | n/a | `-ieg` |
| He | `-it` | `-sg` | REFL/`-atêl` (obv) | `-ùgsigw` | `-ùgsi...` (cut off) |
| We-incl-pl | n/a | n/a | `-ùgg` | REFL | n/a |
| We-excl-pl | n/a | `-ùleg` | `-gêtt` | n/a | REFL |
| You-pl | `-ioĝ` | n/a | `-oĝ` | n/a | `-ie...` (cut off) |
| They-pl | `-ijig` | `-sgig` | `-àtitêl` (obv) | `-ùgsigwig` | `-ùgsi...` (cut off) |
| It | `-ig` | `-sg` | `-j` | `-ùgsigw` | `-ùgs...` (cut off) |
| Those-things | `-iqêl` | `-sqêl` | `-têl` | `-ùgsigul` | `-ùgsi...` (cut off) |

Table 1b — same subjects, objects You-plural/They-plural/It/Those-things (complete, no scan cutoff):

| Subj \ Obj | You-pl | They-pl | It | Those-things |
|---|---|---|---|---|
| I | `-ûloĝ` | `-gig` | `-tu` | `-tuann` |
| You | n/a | `-jig` | `-tûn` | `-tûun` |
| He | `-ùgsiog` | `-aji` (obv) | `-toĝ` | `-toĝol` |
| We-incl-pl | n/a | `-ùggig` | `-tûgw` | `-tûgul` |
| We-excl-pl | `-uleg` | `-gêtjig` | `-tueg` | `-tueĝel` |
| You-pl | REFL | `-oĝig` | `-tuoĝ` | `-tuoĝol` |
| They-pl | `-ùgsioĝ` | REFL/`-àtiji` (obv) | `-tûtij` | `-tûtitêl` |
| It | `-ùgsioĝ` | `-gwîtij` | REFL | n/a |
| Those-things | `-ùgsioĝêl` | `-gwîtitêl` | n/a | REFL |

Guardrails for Tables 1a/1b:

- The rightmost column of Table 1a (object = "We, exclusive plural") is cropped at the physical scan's right margin on every row past the header — confirmed as a genuine scan limitation (re-rendered at higher DPI, same crop), not fixable without the physical book. Do not guess the missing endings; mark that column `needs_speaker_review`/unattested.
- `n/a` cells are the source's own declared impossible/inapplicable combinations (e.g. "I" cannot act on "We-inclusive-plural", since that would include the speaker in the object). Do not fill them by analogy.
- `REFL` cells (subject = object) are deferred to Table 2 below, not given in Table 1 itself.
- Obviative forms are marked `(obv)` where the source uses a distinct 3rd-person-acting-on-3rd-person(obviative) ending; cross-check against the obviative endings in [10.2](#vta-obviative-cross-reference) and [10.3](#theme-signs-directinverse-and-the-obviative-row) — these largely converge in shape.

**Table 2: Reflexives and Reciprocals** (fills Table 1's `REFL` diagonal):

| Person/number | Reflexive ("...self") | Reciprocal ("...each other") |
|---|---|---|
| I/I | `-si` (`nemisi` "I see myself") | n/a (no reciprocal reading for 1st singular) |
| You/You | `-sin` | n/a |
| He/He | `-sit` | `-tijig` "they(dual) see each other" |
| We-incl-dual/same | `-sigw` | `-tigw` |
| We-incl-dual (alt)/same | `-sultigw` | `-tultigw` |
| We-excl-dual/same | `-sieg` | `-tieg` |
| We-excl-dual (alt)/same | `-sultieg` | `-tultieg` |
| You-dual/same | `-sioĝ` | `-tultioĝ` |
| You-plural/same | `-sultioĝ` | `-tultioĝ` |
| They-dual/same | `-sijig` | `-tultijig` |
| They-plural/same | `-sultijig` | `-tultijig` |
| It/It | `-sig` | n/a |
| Those-things/same | `-sigêl` | `-tigêl` |
| Those-things (alt)/same | `-sultigêl` | `-tultigêl` |

Source quote on the reflexive/reciprocal distinction: "A REFLEXIVE is indicated in English by '...-self'; a RECIPROCAL by '...each other'... the comb[ined] pronoun for I/I + self is the reflexive `-si`... he/he + self is `-sit`... The reciprocal combined pronoun for the same persons... is `-tijig`."

**VTA/VTI unification insight** — a structural claim not found in any other source in this project: "most transitive animate and transitive inanimate verbs of Mi'gmaq are really one verb. The unmarked verb is the animate verb, and the same verb with the inanimate object marker... is the inanimate verb." Only two inanimate-object endings are really needed in practice (`-têm` and `-tu`); a third (`-m`) "only occurs after verb stems ending in a long vowel" and is described as reducible to the `-têm` class.

Worked animate/inanimate minimal pairs on the same stem (source orthography):

| Animate object | Inanimate object | Meaning |
|---|---|---|
| `nemîg` | `nemitu` | I see him / I see it |
| `majuggwalg` | `majuggwatêm` | I follow him / it |
| `pastêg` | `pastêm` | I smash him / it |
| `gesgelmêg` | `gesgeltêm` (also `wijitgôtêm`) | I assist him / it |
| `wijèwêg` | `wijôtêm` | I accompany |
| `wenaĝàlêg` | `wenaĝàtu` | I lift |
| `gesalêg` | `gesatêm` | I love |
| `amaltêg` | `amaltêm` | I hit playfully |

Generation rule: when authoring a VTI form for a stem that already has an attested VTA form, prefer deriving it via this animate/inanimate object-marker alternation (checking whether the stem takes `-têm`, `-tu`, or long-vowel `-m`) over treating VTA and VTI as unrelated lexical entries.

**Conditional mode** (p. 442): built with the preverb `gisi-` "can/be able" plus the verb, with past marking added for "could/was able": "gisi + verb = 'can'/'be able'; gisi + verb + past = 'could'/'was-were able'." Example: `Êl'pa na gisiamalgàsêp, amalgaĝĝ?` "If you could dance, would you?" Stem changes are noted as occurring in this construction, consistent with this sheet's existing stem-change cautions elsewhere.

**Imperative formation** (p. 505): the bare stem ending (after stripping the reflexive `-si`) IS the imperative ending — no additional suffix. Source quote: "nothing is added to the verb in the imperative and the verb ending is therefore the same as the verb stem ending... do not forget the stem change that most (not all) imperatives undergo." Attested bare VTA imperatives (object "him" implied): `Aĝĝam!` "Look at him!"; `Angweyu!` "Take care of him!"; `Sêm!` "Feed him!"; `Samàl!` "Touch him!"; `Matta!` "Hit him!" (compare `mattêg` "I hit him"). Negative imperative uses `mut` in this source's examples (e.g. `Moĝwà, mut aĝĝamaw` "No, don't look at him.") — note this differs in spelling from `mutt` used elsewhere in this sheet from Wiki sources; flag as a possible orthography/source variant rather than silently normalizing one to the other.

**Applicative/benefactive construction** (p. 514): adding `-ul` to a VTI stem gives a benefactive "do X for/to Y" reading — e.g. `tagtêmul` "I hit it/him for you" (cf. `tagtêm` "I hit it"), `getapegiatemul` "I sing it/him for you." This is a different-source confirmation of the applicative slot already documented (Hamilton 2015) in [10.5](#full-verb-template-with-applicative-slot-tao); cross-check the `-ul` shape here against the `-u`/`-w` applicative allomorphs already flagged there as needing more attestation.

**Passive construction** (p. 516): marker `-mg`/`-img` added to the VTA stem: `aĝĝamg` "I look at him" → `Etêliaĝĝamimg` "I'm being watched"; `êtĝotalg` "I bury him" → "I'm being buried"; `angweyaĝ` "I take care of him" → "I'm being taken care of." This is a new, concrete passive paradigm anchor, complementing the abstract `-l-u`/`-t-eke` voice table already in [6.1](#advanced-argument-mapping-warning) (Stevens et al. 2021) — the two sources use different example stems and slightly different marker shapes (`-mg`/`-img` here vs. `-l-u` there); do not assume they are the same morpheme without further checking, flag as `needs_speaker_review`.

Guardrail for this whole subsection: this table is for the single stem `nemî-` "see". Treat the endings as a confirmed structural template (which cells exist, how many persons/numbers, the REFL/reciprocal split) rather than assuming every other VTA stem's endings are phonologically identical — cross-check the shape against this sheet's other VTA sources (Wiki `VTA` page, Hamilton 2015) where they overlap, and prefer the Listuguj-spelled versions there for generation unless specifically working with this source's material.

## 10a. Reflexives

Reflexive verbs are marked by `V'si` or `Vlsi`, historically analyzable as `-Vlsi`. They conjugate like animate intransitive verbs after reflexivization.

Examples:

| Form | Analysis clue | Meaning |
|---|---|---|
| `gesispalsin` | wash-REFL-2sg | you wash yourself |
| `nemi'sit` | see-REFL-3sg | he/she sees himself/herself |

VAI-like reflexive ending anchors:

| Person / number | Reflexive shape |
|---|---|
| 1sg | `-Vlsi` |
| 2sg | `-Vlsin` |
| 3sg | `-Vlsit` |
| 1+3 du | `-Vlsieg` |
| 2 du | `-Vlsioq` |
| 3 du | `-Vlsijig` |
| 1+3 pl | `-Vlsultieg` |
| 2 pl | `-Vlsultioq` |
| 3 pl | `-Vlsultijig` |
| 1+2 sg | `-Vlsi'gw` |
| 1+2 pl | `-Vlsulti'gw` |
| 4 (obviative) sg | `-Vlsinitl` |
| 4 (obviative) du | `-Vlsinniji` |
| 4 (obviative) pl | `-Vlsultniji` |

Negative present, from the Wiki `Reflexive` page (same `-i` class pattern as [7.1](#vai-negative-present-by-conjugation-class)):

| Person / number | Negative reflexive shape |
|---|---|
| 1sg | `-Vlsiw` / `-Vlsiu` |
| 1+2 sg | `-Vlsiugw` |
| 2sg | `-Vlsiwn` / `-Vlsiun` |
| 3sg | `-Vlsiwg` / `-Vlsiug` |
| 1+3 du | `-Vlsiweg` |
| 2 du | `-Vls(i)woq` |
| 3 du | `-Vlsi'wg` / `-Vlsiewg` |
| 1+3 pl | `-Vlsultieweg` |
| 1+2 pl | `-Vlsultieweg` |
| 2 pl | `-Vlsuwoq` |
| 3 pl | `-Vlsultiewg` |

Guardrails:

- Do not keep a transitive object after making the verb reflexive unless the source construction explicitly licenses it.
- Obviative negative reflexive cells were not given in the source (blank in the Wiki `Reflexive` page); do not invent them.
- Past and future reflexive paradigms were not found in this pass; treat them as `needs_speaker_review`.
- These anchors are drawn from the `-i` class specifically. `-a`/`-e` class reflexive forms were not separately attested; apply the `-i` class pattern only as a provisional guide, not a confirmed paradigm.

## 10b. Tense and Evidentiality

Present:

- Present tense is unmarked for tense when event time overlaps discourse time.

Evidential markers:

Mi'gmaq past and future authoring must account for source-of-knowledge marking.

| Marker | Common label | Core use | Tense interaction |
|---|---|---|---|
| `-p(n)` | direct / attestive | speaker has direct evidence or certainty | always gives a past reading |
| `-s(n)` | indirect / suppositive | report, hearsay, non-firsthand source | past contexts and future environments |
| `-s(i)p(n)` | inferential / tag-question-like | speaker seeks confirmation or marks inference/tag-question force | especially important in questions and some future/person forms |

Direct vs. indirect chosen by consciousness of participation, not just "did I witness it" (Wiki `Tense` page, loop 14 online re-validation) — a concrete classroom example: a student arrives late having fallen asleep. Asked `Tami e'g-s'p?` "where were you?", the student can answer either way depending on whether falling asleep was a conscious/willed act or something that just happened to them:

| Form | Meaning |
|---|---|
| `nepai-ap` (direct) | "I (purposefully) fell asleep" |
| `nepai-as` (indirect) | "I (accidentally) fell asleep" |

Guardrail: do not choose direct vs. indirect evidential purely on "did the speaker witness the event" — for first-person subjects, whether the event was a conscious/willed act also determines the choice, as this minimal pair shows.

Allomorph rule:

- The final `n` is dropped word-finally in many forms.
- The `n` is retained in embedded and some non-final contexts.
- Refined rule (Inglis 2002 dissertation, loop 12): word-final `/n/` retention specifically marks **counterfactual/contrary-to-fact** meaning, not just "embedded context" in general. Minimal pair: `ktuksiyqs` "if I was sleepy" (no counterfactual meaning, `n` dropped) vs. `ktuksiyqsn` "if I had been sleepy [but I was not]" (counterfactual, `n` retained). Treat `n`-retention as semantically meaningful, not a free phonological variant, whenever a counterfactual reading is intended.

### 10b.0a Counterfactual: A Third Function of the Evidential Suffixes

Beyond their past-tense-evidential use (above) and their tag-question use (see [10d](#d.-tag-questions-and-confirmation-seeking-forms)), Inglis (2002) documents a third function for the same three suffixes: **counterfactual** (contrary-to-fact, like English "should have"/"would have"/"might have... but didn't").

| Suffix | Counterfactual label | Clause type | Example | Meaning |
|---|---|---|---|---|
| `-p(n)` | attestive counterfactual | main clauses | `Isak tluisikpn` | "You should have been called Isaac" |
| `-p(n)` | attestive counterfactual | main clauses | `Liekapn` | "I would have gone" |
| `-s(i)p(n)` | deferential counterfactual | dependent clauses | `i'mu'sipn ula tett wijikitiyekaq` | "...if you had been here..." (from `Nsaqmam, i'mu'sipn ula tett wijikitiyekaq mu npuisoqq` "Lord, if you had been here, my brother would not have died") |

Distribution rule (Inglis 2002, verbatim in substance): attestive counterfactual suffixes always occur on verbs in main clauses; suppositive and deferential counterfactual suffixes always occur on verbs in dependent clauses.

Guardrail: do not assume every past-tense-looking `-p(n)`/`-s(n)`/`-s(i)p(n)` form is evidential-past; check whether the context is contrary-to-fact ("should have", "would have", "if...had") before choosing the counterfactual reading over the plain past-evidential reading. The two functions share the same suffixes but are semantically distinct.

### 10b.0b Full Stem vs. Reduced Stem (Realis/Irrealis)

Inglis (2002) documents a stem-level realis/irrealis distinction, separate from and underlying the evidential system above — not previously in this sheet.

- Historically, Proto-Algonquian stems that underwent "initial change" surface in Mi'kmaq as a **full stem** (used for realis) vs. a **reduced stem** (used for irrealis), via historical reduction of the stem's initial vowel to schwa or zero.
- Worked pair: `nep-` "sleep" (full/realis) vs. `np-` "sleep" (reduced/irrealis) — e.g. `Nepat` "S/he sleeps" (full stem) vs. `Npan` "if you sleep" (reduced stem).
- Worked When-conjunct vs. If-conjunct minimal pair: `kesikawi'pij` "when she runs fast" (full stem, realis) vs. `ksikawi'pij` "if she runs fast" (reduced stem, irrealis) — the initial `e` reduces to zero.

Guardrail — this alternation is not universal:

- "Not all verb stems in Mi'kmaq exhibit initial change" — only stems whose first syllable was historically `/e/` (and sometimes short `/a/` or `/o/`) show full/reduced alternation. Do not assume every AI stem has a reduced form.
- For stems that do not alternate, word order alone disambiguates realis/irrealis using the identical stem: `Tukwieyan, na lietes ampalewitiktuk` "If I wake up, I will go to the doctor" (protasis-first = irrealis) vs. `Lietes, (ta'n) tukwieyan` "I will go, (when) I wake up" (main-clause-first = realis) — both use `tukwieyan` unchanged.
- Generation rule: before generating a "reduced stem" form, check whether the specific stem is attested with initial change. If not attested, use word order (irrealis clause first) rather than inventing a reduced stem.

Past:

- Past tense is marked by suffixes such as `-p'n`, `-s'n`, and `-s'p'n`.
- These suffixes also interact with evidentiality, i.e. the source of the speaker's knowledge.
- Past marking appears after person marking and before some plurality/obviation material.
- Word-final variants can drop final `n`, except in contexts such as conditionals and embedded clauses.

Examples from the wiki:

| Form | Meaning / rule |
|---|---|
| `negmow nemia'tipnig` | they saw them; past plus plural |
| `gil nemit'p` | you saw me; word-final past variant |
| `ulagu etug lugwegapn` | yesterday maybe I would have worked; conditional keeps `n` |
| `teltasiap nemiap'n` | I thought that he saw him; embedded clause keeps fuller past |
| `negum nemiapnn` | he/she saw him/her; obviation changes the following marker |

Future:

- Future is not just a plain English-style tense suffix. Inglis & Johnson analyze the AI future as built from an irrealis/reduced stem, an existential `-te(k)` element, and evidential material.
- In negated future clauses, `ma'` replaces `mu` and the verb takes the negated form.

AI future anchor from `-np` "sleep":

| Person | Ending | Example | Meaning |
|---|---|---|---|
| 1 | `-tes` | `npates` | I will sleep |
| 2 | `-tesk` / `-teks` | `npateks` | you will sleep |
| 3 | `-tew` | `npatew` | he/she will sleep |
| 1+2 | `-tesnu` / `-teksnu` | `npate(k)snu` | we inclusive will sleep |
| 1+3 | `-tesnen` / `-teksnen` | `npate(k)snen` | we exclusive will sleep |
| 2 plural | `-toqsip` | `npatoqsip` | you plural will sleep |
| 3 plural | `-taq` | `npataq` | they will sleep |

Generation rule:

- Do not use English tense alone to pick one suffix. Past forms may encode evidence/source as well as time.
- Future forms should be treated as modal/evidential forms, not plain tense.
- Past yes/no questions need question/evidential morphology; do not create them by adding a question mark to a past statement. Two attested surface variants of the same past-tense question exist side by side: `wigtmu-s'p go'gli'gwtjewei gisna nme'jewei` and `wigteg-'s go'gli'gwtjewei gisna nme'jewei`, both "Did you like chicken or fish?" (loop 14 online re-validation, Wiki `Tense` page). Treat both as attested alternates, not a copy error.
- For production, use attested paradigms or keep the tense form as "needs speaker review" unless the exact paradigm is in this sheet.

### 10b.1 Full Per-Person Modal Paradigm (Independent Order, AI)

Inglis & Johnson (2001) give a per-person AI paradigm across neutral (unmarked), attestive (direct evidential), suppositive (indirect evidential), inferential (tag-question-like), conditional, future, and if-conjunct forms. This is the only source found so far with more than a 3sg cell for non-indicative/non-future forms, so it fills the gap the Wiki's `teluis-` 3sg-only table in [10c](#c.-mode-inventory) leaves open for other persons.

**Orthography caution:** this table is transcribed in Inglis & Johnson's source orthography (Smith-Francis, per Hewson & Francis 1990), not the Listuguj orthography used elsewhere in this sheet. Do not mix these endings directly into Listuguj-spelled generation without a conversion pass; treat them as a structural/paradigmatic reference first, and a literal spelling source second. `V` = the stem vowel; `j` = an epenthetic schwa breaking a three-consonant cluster; `y` = a linking element between stem and inflection (Dawe 1986); person labels follow the paper's own numbering (`1`=1sg, `2`=2sg, `3`=3sg, `12`=1incl pl, `13`=1excl pl, `23`=2pl, `33`=3pl).

| Person | Neutral | Attestive (direct) | Suppositive (indirect) | Inferential (tag-like) |
|---|---|---|---|---|
| 1 | `V-y(an)` | `V-yap(n)` | `V-yas(n)` | (not attested) |
| 2 | `V-n` | `V-p(n)` | (not attested) | `V-s(i)p(n)` |
| 3 | `V-t` | `V-p(n)` | `V-s(n)` | `V-s(i)p(n)` |
| 12 | `V-yikw` | `V-yikup(n)` | `V-yikus(n)` | `V-yikus(i)p(n)` |
| 13 | `V-yek` | `V-yekip(n)` | `V-yeks(n)` | `V-yeks(i)p(n)` |
| 23 | `V-yoq` | `V-yoqop(n)` | `V-yoqs(n)` | `V-yoqs(i)p(n)` |
| 33 | `V-jik` | `V-pnik` | `V-snik` | `V-sipnik` |

| Person | Conditional (neutral) | Future | If-conjunct (neutral) | If-conjunct (suppositive) |
|---|---|---|---|---|
| 1 | `V-k` | `-tes` | `V-yan` | `V-yas(n)` |
| 2 | `V-k` | `-tesk`/`-teks` | `V-n` | `V-s(i)p(n)` |
| 3 | `V-s(n)` | `-tew` | `V-j` | `V-s(n)` |
| 12 | `V-kup(n)` | `-te(k)snu` | `V-yikw` | `V-yikus` |
| 13 | `V-kek` | `-te(k)snen` | `V-yek` | `V-yeks(i)p(n)` |
| 23 | `V-koq` | `-toqsip` | `V-yoq` | `V-yoqs(i)p(n)` |
| 33 | `V-tis(n)` | `-taq` | `V'-tij` | `V-tis(n)` |

Notes:

- The future column here matches the `-np` "sleep" anchor table above (same source), given per-person rather than by example word.
- Evidential gaps in the table (e.g. no attested 1st-person inferential, no attested 2nd-person suppositive) are the paper's own gaps, not omissions by this sheet. Johnson's tag-question paper independently predicts the 1st-person inferential gap on pragmatic grounds — see [10d](#d.-tag-questions-and-confirmation-seeking-forms).
- 3rd-person and 3rd-person-plural (`3`, `33`) forms carry no evidential suffix in the future column, consistent with the rule below.
- The suffix `-oq` recurs across several `23` cells; Inglis & Johnson note its function beyond person/number marking is not fully explained in their source.
- **These are not random gaps — they follow a systematic rule** (Inglis 2002 dissertation, loop 12, refining the "gaps" framing above): the deferential suffix `-s(i)p(n)` distributes across verb orders as follows: **Independent** (main clauses) takes it on all persons **except 1st**; **If-conjunct** (dependent clauses) takes it only with **2, 23, and 13**; **Future** (main clauses) takes it only with **23**. Direct quote: "non-attestive 2nd person singular only carries the -s(i)p(n) evidential, while non-attestive 1st person singular only carries the -s(n) suppositive evidential." Use this rule to predict which cells should carry `-s(i)p(n)` vs. plain `-s(n)` for a given verb order, rather than treating unfilled cells as arbitrary.
- Typological explanation for the 2nd-over-1st asymmetry (Hewson 1991:864, via Inglis 2002): the general Algonquian person hierarchy is `2 > 1 > 3(proximate) > 4(obviative) > 0(inanimate)` — 2nd person outranks 1st. This explains why 2nd person takes the deferential marker (the speaker "invoke[s] the evidential knowledge of the addressee"): the addressee outranks the speaker. **This is a third, independently-sourced person hierarchy**, distinct in kind from the two already in [10.4](#inner-suffix-and-the-personnumber-hierarchy) (Coon & Bale's and Hamilton's hierarchies both rank *plural-competition for inner-suffix agreement*; this one ranks *deference for evidential marking*). Do not conflate the three; each governs a different phenomenon.

Generation rule for evidentials and Speech Act Participants:

- First and second persons (Speech Act Participants, SAPs) are the persons most likely to carry an evidential suffix, since only a discourse participant can comment on the reliability of their own knowledge source.
- Third person is a non-SAP and shows no evidential marking in the future paradigm.
- Do not assume every mode/tense cell has a filled evidential slot for every person; treat blank cells above as "unattested in this source", not "impossible", pending a fuller source.

### 10b.2 Subordinative Endings and Historical Personal Affixes

Inglis & Johnson also give the AI Subordinative ("that..." embedded-clause) endings, compared against the historical personal affixes attested for possessed inanimate singular nouns (Hewson & Francis 1990, citing Pacifique 1939):

| Person | Subordinative personal prefix (historical, now dropped) | Subordinative ending | Possessed-noun personal suffix (for comparison) |
|---|---|---|---|
| 1 | `n-` | `-n` | `-n/a` |
| 2 | `k-` | `-n` | `-n/a` |
| 3 | `w-` | `-n` | `-n/a` |
| 12 | `k-` | `-nenu` | `-inu` |
| 13 | `n-` | `-nen` | `-inen` |
| 23 | `k-` | `-new` | `-wow` |
| 33 | `w-` | `-new` | `-wow` |

Notes:

- Pacifique's 1939 grammar (via Hewson & Francis 1990) still shows personal prefixes (`n-`, `k-`, `w-`) on the Subordinative; in current Mi'gmaq/Mi'kmaq use these prefixes are gone, but the endings `-nenu`, `-nen`, `-new` (12/13/23/33) are argued to be frozen relics of the old personal-suffix system, which is why they resemble the possessed-noun suffix column.
- The Future (`10b.1` above) shows the same historical pattern: personal-suffix-like endings survive on the `12`/`13`/`33` future forms while `1`/`2`/`3` forms do not, because both the Future and the Subordinative are argued to descend from a Proto-Algonquian verb type that originally had full personal prefixes and suffixes, unlike most other Mi'gmaq verb orders.
- Do not add the historical prefixes (`n-`, `k-`, `w-`) to generated Subordinative forms; they are attested as obsolete in current usage per this source.

### 10b.3 Immediate vs. Unspecified Past (Delisle & Metallic 1976)

A genuine two-way past-tense system, not documented anywhere else in this project, from `research_sources/micmac-teaching-grammar-delisle-metallic-1976.pdf` (loop 12; source orthography, not yet converted to Listuguj — see [10.7](#full-transitive-combined-ending-paradigm-delisle-metallic-1976) for the orthography caution).

- **Unspecified past**: suffix `-êp`/`-ap`/`-op` (allomorphs conditioned by vowel harmony and dialect). Example: `Newtêjit jînêm nepgêp` "A man died" (no specified recency).
- **Immediate past** ("just X-ed"): suffix `-aĝ`. Example: `Newtêjitaĝ jînêmaĝ nepgaĝ` "A man just died."
- Unusual agreement fact, flagged by the source itself as "agreement gone wild": with the immediate past, **the subject noun itself also takes the `-aĝ` marker** (`jînêmaĝ`, not the bare `jînêm`) — this does not happen with the unspecified past, where only the verb is marked (`Wapêg jînêm nepgêp` "A white man died", noun unmarked).
- A bare noun marked with `-aĝ` can function alone as an elliptical question: `Jînêmaĝ?` "Where's the man (who I just missed)?"
- Plural forms exist for both tenses, but plural immediate-past *questions* about inanimates are answered with unspecified-past-plural forms only — a distributional gap in the immediate-past-plural cell, not an error.

**Real VTA/VTI immediate-past paradigm cells** (verb `nemig`/`nemitu` "I see him/it") — this directly extends the isolated past-tense cells already documented in [9.1](#attested-past-tense-cells-isolated-not-a-paradigm) and [10.6](#attested-past-and-future-cells-isolated-not-a-full-grid):

| Class | Present | Unspecified past | Immediate past |
|---|---|---|---|
| VTA sg | `nemîg` "I see him" | `nemîgêp` "I saw him" | `atel gis nêmîg` "I just saw him" |
| VTA pl | `nemîgig` "I see them" | `nemigêpênig` "I saw them" | `atel gis nêmîgig` "I just saw them" |
| VTI sg | `nemitu` "I see it" | `nemituap` "I saw it" | `atel gis nêmitu` "I just saw it" |
| VTI pl | `nemituann` "I see them (inan.)" | `nemituapênn` "I saw them (inan.)" | `atel gis nêmituann` "I just saw them (inan.)" |

Structural asymmetry: unlike the intransitive `-aĝ` suffix above, the transitive immediate past is **periphrastic** — built with the particle `atel gis` plus the ordinary present-tense verb form, not a suffix on the verb itself. Do not generate a transitive immediate-past form by adding `-aĝ` to a VTA/VTI stem; use the `atel gis` + present construction instead.

Cross-reference to the evidential system: this source's independent "past-interrogative `-s-` used without rising intonation, functioning as a reportative/dubitative in storytelling" (attributed by the source to consultant Don Deblois) covers the same territory as the Wiki's `-s(n)`/`-s(i)p(n)` evidential system already in [10b](#b.-tense-and-evidentiality) above, from a fully independent source. Treat this as independent confirmation of the evidential-marking phenomenon generally, not as a new, separate mechanism to layer on top.

Guardrail: this is still not a full past-tense grid — only 1sg VTA/VTI cells (plus 1sg-acting-on-plural-object) are attested here. No 2nd/3rd person or plural-subject transitive past cells were found. Combine with, but do not treat as replacing, the isolated cells in [9.1](#attested-past-tense-cells-isolated-not-a-paradigm) and [10.6](#attested-past-and-future-cells-isolated-not-a-full-grid).

## 10c. Mode Inventory

The Mi'gmaq Wiki's dedicated `Mood` page is confirmed empty (a stub with no article text as of this pass). However, the `Verbs: Overview` page carries a full one-cell-per-mode conjugation table for the VAI `-i` stem `teluis-` "to be named" (3sg, "his/her name is/was/will be..."), citing Bloomfield 1946, Payne 1997, and Hewson & Francis 1990. This is the single richest mode-paradigm source found so far and should anchor the mode system until a fuller per-person table is located.

Default:

| Mode | Gloss | Use |
|---|---|---|
| indicative | `IND` | default; no need to gloss if unmarked |

`teluis-` 3sg mode/tense paradigm from `Verbs: Overview` (affirmative / negative):

| Mode | Tense | Affirmative | Negative | Gloss |
|---|---|---|---|---|
| Indicative | present | `teluisit` | `mu teluisiwk` | his/her name is.../isn't... |
| Indicative | past | `teluisiss` / `teluisip` / `teluisisp` | `mu teluisiwksip` | his/her name was.../wasn't... |
| Indicative | future | `tluisitew` | `ma' tluisiwk` | his/her name will/will not be... |
| Imperative | - | `tluisij` | `mu tluisiwj` | let his/her name be.../not be... |
| Subjunctive "when..." | present | `teluisijl` | `mu teluisikwl` | when his/her name is.../isn't... |
| Subjunctive "when..." | past | `teluisitek` | `mu teluisikwek` | when his/her name was.../wasn't... |
| Subjunctive "if..." | present | `tluisij` | `mu tluisiwk` | if his/her name is.../isn't... |
| Subjunctive "if..." | past | `tluisiss` | `mu tluisiwksip` | if his/her name was.../wasn't... |
| Subjunctive "if..." | pluperfect | `tluisisn` | `mu tluisiwksipn` | if his/her name had/had not been... |
| Conditional | present | `teluisiss` | `mu teluisiss` | his/her name would/would not be... |
| Conditional | past | `teluisisoqq` | `mu teluisisoqq` | his/her name would/would not have been... |
| Subordinative | - | `wtluisin` | (not given) | that his/her name is... |

Notes and cautions:

- This table is 3sg-only. Do not extrapolate other persons/numbers from it; the sheet's separate VAI, VTA, VTI, VII paradigm tables are the source for other persons.
- `Indicative present` and `Subjunctive "if..." present` share the negative shape `mu teluisiwk`, and `Conditional present/past` show identical affirmative and negative surface forms in the source table (`teluisiss` / `teluisisoqq`) — this is what the source gives verbatim, not a transcription error on this sheet's part; treat any generation from these rows as `needs_speaker_review` since the affirmative/negative contrast is not visibly carried by the suffix alone in this data.
- No infinitive or impersonal mode forms were found in this pass; treat those two modes as still unattested pending a fuller source.

Non-default modes to recognize:

| Mode | Gloss | Rough use |
|---|---|---|
| imperative | `IMP` | commands |
| subjunctive | `SBJV` | "when..." (realis) or "if..." (irrealis) contexts; the wiki treats these as two distinct subjunctive subtypes, not one |
| conditional | `COND` | conditional or would-like contexts |
| subordinative | `SUBV` | embedded/subordinate clauses |
| dubitative | `DUB` | "might X"; new mode found in loop 12, see below |
| infinitive | `INF` | non-finite/infinitival contexts; one derivational rule found in loop 12 (`-mg` suffix), see below — still not a full paradigm |
| impersonal | `IMPS` | impersonal forms; unattested in every source checked so far, including loop 12's new primary sources |

**Dubitative mode** (Inglis 2002 dissertation, loop 12) — a mode not in the Wiki's own inventory at all, expressing "might X" (contrasted with Future "will X"):

- Formed by the suffix `-tuk` on the **reduced stem** (see [10b.0b](#b.0b-full-stem-vs.-reduced-stem-realisirrealis)).
- Examples: `Wi'kituk` "S/he might write" (`wi'k-i'-tuk`); `Alasutmatuk` "S/he might pray".
- Described by the source as "non-paradigmatic" — it does not inflect across the full person set the way Independent-order forms do. Treat it as a fixed modal construction rather than a full person-by-person paradigm until a fuller source is found.
- Contrast: "In English this contrast is expressed by the modal auxiliaries *might* (Dubitative) versus *will* (Future). In Mi'kmaq it would appear that this contrast is expressed by the modal suffixes *-tuk* (Dubitative) versus... *-t(e)(k)* (Future)."

**Delisle & Metallic's (1976) four-mode framing** — an independent, second source's mode inventory (loop 12), useful as cross-confirmation:

- The book states its inventory as a closed set: "we will be distinguishing four basic modes in Micmac: indicative, imperative, conditional, subjunctive." Two independent sources (this book and the Wiki) now agree on these four as the core set; **neither source attests infinitive or impersonal as part of this core inventory** — treat the core four as solid and the other two as a different, less-attested category (see below).
- Source's own mode definitions (verbatim in substance): "The indicative mode is used for simple statement of fact... The imperative mode is used to communicate a demand for action or a command... The conditional mode is to make statements that aren't binding in themselves but dependent upon conditions... The subjunctive is a hypothetical mode... also used to express desire, wish, or doubt."
- 1sg/2sg worked example set (verb `amalgay` "dance"): indicative present `amalgay`; indicative past `amalgàp`; indicative future `amalgàs`; imperative `amalga!`; conditional present `amalgagĝ` "I would dance"; subjunctive `amalgàn` "if I dance"; desiderative use of subjunctive `êgsatémugg gisiamalgàn` "I wish I were able to dance". Only 1sg/2sg cells are attested (not a full person table); do not extrapolate other persons from these.
- **Aspect is preverb-marked and stackable**, confirmed with a clean worked example distinct from the existing preverb-stacking material in [6a](#a.-preverbs): `etêli-` (progressive) + `ali-` ("here and there"/haphazard) stack as `telialiamalgay` "I'm dancing around". Individual aspect preverbs attested: `etêli-` progressive, `ali-` haphazard/"here and there", `gisi-` completed/perfect, `pemi-` "moving by".

**Infinitive mode — found (Delisle & Metallic 1976, loop 12)**, the first infinitive rule found in this project:

- Rule: "`-mg` added to a verb stem makes it infinitive." Example: stem `amalgam-` "dance" → infinitive `amalgamg` "to dance", used in `Amalgamg oĝo gisoĝon` lit. "To dance because it's fun" (= "Because it's fun to dance").
- Related: the preverb `naji-` "to go" combines with a verb for purposive/andative ("going in order to") meaning, distinct from but interacting with the infinitive `-mg`.

**A second, independent infinitive attestation (loop 16)**, from Inglis & Johnson (2001), citing Hewson & Francis (1990:123) citing the 18th-century missionary Maillard's own Micmac material: the VII stem `etek` "to be, to exist" (already cited elsewhere in this sheet as the etymological source of the AI future's `-tek` element — see [10b](#b.-tense-and-evidentiality)) has the infinitive form `eymik`. Maillard's own gloss, quoted by Inglis & Johnson: `eymik` "does not mean to be someone or something... it means to be somewhere", illustrated with `ula eym` "I am here" and `na'te'l eymn` "thou art there".

Guardrail: this gives a second real infinitive form (`eymik`, VII/existential) alongside the first (`amalgamg`, VAI, via the productive `-mg` rule) — two different formation strategies from two different sources, not necessarily the same morphological process. Do not assume `-mg` derives `eymik` from `etek`, or vice versa; treat these as two independent data points rather than one confirmed rule. This is still one derivational rule plus one isolated historical form, not a full paradigm across persons or verb classes. Impersonal mode remains entirely unattested in **every source checked in this project** (loop 16 confirmed a zero-hit grep for "impersonal" across all 8+ downloaded academic papers, in addition to the Wiki and both teaching-grammar sources) — this is now a very solidly confirmed absence, not a search gap.

Generation rule:

- Do not invent mode forms from the label alone.
- For the `teluis-` 3sg cell, use the table above directly. For any other person/number/stem-class combination in a non-indicative, non-imperative mode, require an attested paradigm or mark `needs_speaker_review`.
- Keep mode separate from tense/evidentiality in glossing, even when both are expressed on the same verb.
- "When..." and "if..." subjunctives are grammatically distinct slots in the source table (different affirmative shapes for present: `teluisijl` vs `tluisij`); do not collapse them into one subjunctive gloss without the discourse distinction.

## 10d. Tag Questions and Confirmation-Seeking Forms

Johnson's tag-question paper analyzes the inferential evidential suffix `-s(i)p(n)` (the same suffix as the `-s(i)p(n)` row in [10b](#b.-tense-and-evidentiality) and [10b.1](#b.1-full-per-person-modal-paradigm-independent-order-ai)) as also giving rise to a dedicated tag-question reading, glossed `TAG`, built from the interaction of the direct evidential `-p(n)` and the indirect evidential `-s(n)`.

Minimal evidential-to-tag-question set (Johnson, citing Inglis 2002):

| Form | Gloss | Meaning |
|---|---|---|
| `I'wape'kip` | PST-white-DIR | "It used to be white." (speaker has direct evidence) |
| `I'wape'kis` | PST-white-IND | "It used to be white, so I'm told." (indirect/reported) |
| `I'wape'ksip` | PST-white-TAG | "It used to be white, didn't it?" (tag question) |

Two readings of a Mi'gmaq tag question, both attested and pragmatically distinct:

1. **Confirmation-seeking (biased-question) reading**: the speaker expects a positive answer but is open to contradiction. Example: `Panta'teksip tuo'puti.` "The window, it was open, wasn't it?" — said while looking at a closed, cold window; the speaker infers from indirect evidence (the cold room) and seeks confirmation.
2. **Asserted-belief reading**: the speaker is not neutrally asking but asserting a proposition they hold to be true, while using the tag form. Example: `I'wape'ksip to'q.` "It used to be white, didn't it? [everyone knows that]" — compatible with the community-knowledge particle `to'q`, which shows the speaker treats the proposition as an established fact, not an open question.

Generation rule:

- Use the `-s(i)p(n)` tag-question suffix (not a rising-intonation-only strategy) whenever English uses a tag ("..., isn't it?", "..., didn't he?") that seeks confirmation of a proposition the speaker already leans toward believing.
- Distinguish tag questions from ordinary yes/no questions (see [13.2](#yesno-questions)): a plain yes/no question does not carry the speaker's prior expectation of a particular answer; a tag question does.
- The paper predicts a **gap**: the tag-question suffix is not available in first-person forms, because a speaker cannot coherently seek the addressee's confirmation, or assert a belief about report-worthiness, of the speaker's own first-hand proposition. Treat first-person tag questions as ungrammatical/unattested rather than inventing a `-s(i)p(n)` form for `1sg`/`1pl`. This is consistent with the per-person paradigm in [10b.1](#b.1-full-per-person-modal-paradigm-independent-order-ai), where no 1st-person inferential cell is attested.
- The particle `to'q` "apparently / community knowledge" can co-occur with a tag question to push the interpretation toward the asserted-belief reading; its absence leaves the confirmation-seeking reading available. Do not treat `to'q` as required for every tag question.

---

## 11. Negation

Negation is not just a free word like English "not". It normally has two parts:

1. a negative particle before the negated verb or constituent
2. a negative form of the verb

Main particles:

| Particle | Use |
|---|---|
| `mu` | before negated present and past |
| `ma'` | before negated future and before `gis` "can/be able" |
| `mutt` | negative imperative: do not |
| `mu wen` | nobody |
| `mu goqwei` | nothing |
| `me' mnaq` | not yet |
| `'lpa mu` | not even (present/past) |

Examples:

| Mi'gmaq | Meaning |
|---|---|
| `mu mijjigw` | he/she does not eat |
| `ma' mijjigw` | he/she will not eat |
| `mutt mijjiw` | do not eat |
| `mu goqwei etnug` | there is nothing there |
| `'lpa'tuj eig'p` | the boy was there |
| `'lpa'tuj mu eimugup` | the boy was not there |

Rules:

- `mu` must precede the verb it negates.
- `ma'` is used for future negation and with `gis`.
- A negative particle requires a negative verb form.
- Mi'gmaq allows negative concord: multiple negative elements still express one negative meaning (verbatim from the Wiki `Negation` page: "double or multiple negatives do not express an affirmative but a negative").
- Some particles such as `me' mnaq` "not yet" and `mowen`/`mu wen` "nobody" also require the negative verb form.
- With `gis` "can/be able", `ma'` can be used even outside ordinary future meaning.
- In plural negative forms, the negative marker is inserted after the pluralizer `-ulti-`, not before it.
- The Wiki `Negation` page states the third-person negative ending always contains `-g` ("the -g third person is ALWAYS found" in negated forms) — use this as a sanity check on generated negative 3rd-person forms.

### 11.1 Negative Present Anchors

For the VAI `-i` stem `mijji-` "eat":

| Person | Affirmative | Negative |
|---|---|---|
| 1sg | `mijji` | `mu mijjiw` |
| 2sg | `mijjin` | `mu mijjiun` |
| 3sg | `mijjit` | `mu mijjigw` |
| 1+3 du | `mijjieg` | `mu mijjiweg` |
| 2 du | `mijjioq` | `mu mijjiwoq` |
| 3 du | `mijjijig` | `mu mijji'gw` |
| 1+3 pl | `mijjultieg` | `mu mijjultiweg` |
| 2 pl | `mijjultioq` | `mu mijjultiwoq` |
| 3 pl | `mijjultijig` | `mu mijjulti'gw` |

VAI third-person negative anchors by stem class:

| Stem type | Affirmative 3sg | Negative 3sg |
|---|---|---|
| `-i` | `mijjit` | `mu mijjigw` |
| `-a` | `amalgat` | `mu amalgagw` |
| `-a'si` | `ala'sit` | `mu ala'sigw` |
| `-e` | `eliet` | `mu eliegw` |

VTI `malqut-` "eat it" negative anchors:

| Subject/object | Affirmative | Negative |
|---|---|---|
| 1 -> 0sg | `malqutm` | `mu malqutmu` |
| 2 -> 0sg | `malqutmn` | `mu malqutmu'n` |
| 3 -> 0sg | `malqutmeg` | `mu malqutmug` |
| 1 -> 0pl | `malqutmann` | `mu malqutmuann` |
| 3 -> 0pl | `malqutmegl` | `mu malqutmugul` |

### 11.1a Negative Past and Future Anchors

For the VAI `-i` stem `mijji-` "eat", from the Wiki `Negation` page:

Past tense:

| Person | Affirmative | Negative |
|---|---|---|
| 1sg | `mijjiap` | `mu mijjiwap` |
| 2sg | `mijjit'p` | `mu mijjiwt'p` |
| 3sg | `mijjip` | `mu mijjigup` |
| 1+2 du | `mijji'gup` | `mu mijjiwgup` |
| 1+3 du | `mijjieg'p` | `mu mijjiweg'p` |
| 2 du | `mijjioqop` | `mu mijjiwoqop` |
| 3 du | `mijjipnig` | `mu mijjigupnig` |
| 1+2 pl | `mijjulti'gup` | `mu mijjultiwgup` / `mu mijjultiggup` (alternate, loop 14 online re-validation) |
| 1+3 pl | `mijjultieg'p` | `mu mijjultiweg'p` |
| 2 pl | `mijjultioqop` | `mu mijjultiwoqop` |
| 3 pl | `mijjultipnig` | `mu mijjultigupnig` |

Future tense:

| Person | Affirmative | Negative |
|---|---|---|
| 1sg | `mijjit's` / `mijjia's` (Listuguj-specific alternate, loop 14 online re-validation) | `ma' mijjiw` |
| 2sg | `mijjit'sg` | `ma' mijjiun` |
| 3sg | `mijjitew` | `ma' mijjigw` |
| 1+2 du | `mijjitesnu` | `ma' mijjigw` |
| 1+3 du | `mijjitesnen` | `ma' mijjiweg` |
| 2 du | `mijjitoqs'p` | `ma' mijjiwoq` |
| 3 du | `mijjitaq` | `ma' mijji'gw` |
| 1+2 pl | `mijjultitesnu` | `ma' mijjultigw` |
| 1+3 pl | `mijjultitesnen` | `ma' mijjultiweg` |
| 2 pl | `mijjultitoqs'p` | `ma' mijjultiwoq` |
| 3 pl | `mijjultitaq` | `ma' mijjulti'gw` |

Guardrails:

- 1sg and 1+2 du have no listed affirmative cell for past ("n/a" in source) — the paradigm as fetched is 3rd-person/2nd-person-anchored for some cells; do not backfill missing cells.
- The negative-future column repeats several `mu`-negated present/past-looking shapes rather than a unique future-specific negative suffix set; the source's own "Negated Future Endings" sub-table was empty for all persons. Treat the future negative row as **word-level attested but sub-morpheme-level unconfirmed** — use the whole forms above, but do not decompose them into a novel "future negative ending" for other stems.
- These are `-i` class VAI-only anchors. Do not generalize to `-a`/`-e` class VAI, or to VII/VTI/VTA, without separate attested forms.

### 11.2 Negative Imperative

Affirmative imperative:

| Number | Form |
|---|---|
| singular | `mijji` |
| dual | `mijjigw` |
| plural | `mijjultigw` |

Negative imperative:

| Number | Form |
|---|---|
| singular | `mutt mijjiw` |
| dual | `mutt mijjinew` |
| plural | `mutt mijjultinew` |

### 11.3 Negation Word Order

Accepted patterns from the wiki:

- `Mali mu amalgagup` - Mali did not dance.
- `mu Mali amalgagup` - Mali did not dance.
- `mu eimugup lpa'tuj` - the boy was not there.
- `mu lpa'tuj eimugup` - the boy was not there.

Rejected patterns:

- verb ... `mu`
- noun verb `mu`
- post-verbal `mu` for ordinary verbal negation

Scope rule:

- If negating a noun phrase rather than the verb, place the negative particle before that noun phrase.

---

## 12. Word Order

Mi'gmaq has flexible, discourse-sensitive word order. The verb often carries enough person/object information to stand as a sentence by itself, and overt noun phrases can be omitted when they are recoverable from context.

Practical rules:

- Do not force English SVO order.
- Do not infer subject and object from word order alone.
- Use verb morphology, animacy, obviation, and context before word order.
- Use word order for discourse emphasis, focus, topic continuity, and contrast.
- Keep negative particles before the verb or constituent they negate.
- If a noun is omitted, make sure the verb morphology still identifies the participants.
- A focused constituent often appears early in the utterance, but this is a discourse tendency, not an English-style subject position rule.

Example from the grammar materials:

- `sapmi'k ala nemaqt'k na tett tia'm kaqamit`
- `sapmi'k ala tia'm nemaqt'k na tett kaqamit`

Both can express "I saw a moose standing right there on the hill"; placing `tia'm` earlier emphasizes "moose".

Generation guardrail:

- If a clause contains two overt animate third-person noun phrases, use obviation and verb morphology to identify who acts on whom.
- If a clause omits an argument, require prior discourse or a verb form that makes the intended participant recoverable.

---

## 13. Questions and Relatives

Mi'gmaq question words overlap with relative-clause marking, but not always one-to-one with English.

Question word anchors:

| Question word | Relative form | English |
|---|---|---|
| `wen` | `ta'n` | who |
| `wenewei` | `ta'n ugt` | whose |
| `tal` | `goqwei` | what |
| `ta'n`, `ta'n tujiw` | `ta'n` | when |
| `tami` | `ta'n` | where |
| `tal gis` | `ta'n goqwei ugjit` | why, asking for explanation |
| `ugjit goqwei` | `ta'n goqwei ugjit` | why, for what purpose |
| `tegen` | `ta'n goqwei` | which |
| `ta'sit` | `ta's'g` | how much / how many |

Rules:

- Yes/no questions rely heavily on word order and intonation; no universal question particle is required aside from question words themselves.
- `ta'n` can function like a broad relativizer: who/that/which.
- English "who" vs "whom" does not map to separate Mi'gmaq forms; Mi'gmaq lacks a subject/object distinction in interrogatives generally (confirmed on the Wiki `Questions` overview page, loop 12).
- Multiple English wh-questions may need rephrasing with obviation or "other" rather than two `wen` forms; the Wiki `Questions` overview page confirms this generally: multiple wh-words in a single question are ungrammatical, not just for the `wen`/`wen` case already documented in [13.1](#information-questions).
- The two "why" forms differ: `tal gis` asks for an explanation of facts/concepts; `ugjit goqwei` asks for purpose or use, roughly "for what".
- The particle `me'` "how" combined with `wen` "who" can express "anyone" in interrogative contexts (Wiki `Questions` overview page) — add this as a fourth strategy alongside the bare/`nata-`/`tampas`/`ta'n` indefinite groups in [13.3](#indefinite-pronouns).

Example:

- `Ji'nm ta'n weltesgat'p na nuj.` - "The man who/that you met is my father."
- `Wen iginmuas'n igtigl wi'gatign?` - "Who gave the other a book?" Use `igtig-l` "other-OBV" rather than a second `wen`.
- `*Wen iginmuas'n wen wi'gatign?` - rejected for "Who gave whom a book?"

### 13.1 Information Questions

Information questions normally put the question word first.

| Mi'gmaq | Meaning |
|---|---|
| `Goqwei peguatelmus'p?` | What did you purchase? |
| `Goqwei nemitus'p?` | What did you see? |

Moving the same word later can create an indefinite-pronoun reading instead of a question-word reading:

| Mi'gmaq | Meaning |
|---|---|
| `Nemitus'p goqwei?` | Did you see anything? |
| `Peguatelg's wen goqwei?` | Did anyone buy anything? |
| `Goqwei wen peguatelg's?` | What did someone buy? |
| `Wen goqwei peguatelg's?` | Who bought something? / Who bought what? |

Generation rule:

- If English asks "what/who/where/when", put the question word clause-initial unless intentionally generating an echo or indefinite reading.
- Do not produce multiple `wen` forms for "who gave whom"; use an obviation strategy.
- If English asks "which N", prefer pied-piping the noun phrase: front `tegen` plus the noun.

### 13.1a Echo and Embedded Questions

Echo questions:

- English can leave a wh-word in place: "You saw him where?"
- The Wiki says echo questions are generally not possible in Mi'gmaq; a speaker found it difficult to place a wh-word in the middle of a sentence.
- Rephrase as an ordinary information question when possible.

Example:

| Form | Status / meaning |
|---|---|
| `*tami tett etl-nemis'p?` | rejected intended "You saw him where all the time?" |
| `tami tett i-nemis'p?` | Where did you usually see him/her? |
| `*i-nemis'p tami tett` | rejected for the same intended question |

Embedded questions:

- Embedded questions can keep question-like constituent order; English-style reordering is not required.
- Some embedded question positions are rigid, especially around the verb `geitu` "know" and time expressions.

Examples:

| Direct / embedded | Meaning |
|---|---|
| `Tami eteg wi'gatign?` | Where is the book? |
| `Geitun tami eteg wi'gatign?` | Do you know where the book is? |
| `Wen na?` | Who is he/she? |
| `Gis-tlimitis wen na?` | Can/could you tell me who he/she is? |
| `Geitu ta'n tes ajiet?` | Do you know what time it is? |

Pied-piping:

- For "which N" questions, keeping the question word and noun together is preferred.
- `Tegen wi'gatign gesatg?` "Which book does he/she like?" is preferred over `Tegen gesatg wi'gatign?`.

### 13.2 Yes/No Questions

Present and future yes/no questions may be identical to statements except for intonation.

| Form | Reading |
|---|---|
| `nepan` | you are asleep / are you asleep? |
| `getlams'tw'n` | you believe me / do you believe me? |
| `miji` | I eat / do I eat? |
| `amalgat's` | you will dance / will you dance? |

Past yes/no questions require question morphology; a plain past statement with rising intonation is not enough.

| Statement | Question |
|---|---|
| `mijiap` I ate | `mijias?` did I eat? |
| `nemi't'p` you saw him/her | `nemi's'p?` did you see him/her? |
| `mu nemiaut'p` you did not see him/her | `mu nemiaus'p?` did you not see him/her? |

Rule:

- Present/future yes-no: intonation can do the work.
- Past yes-no: use the question form.

Tag questions (Wiki `Yes/No Questions` page):

- The tag particle `a` is added clause-finally (never clause-initially) to a statement to request confirmation, similar to English "eh?" or "isn't that right?".
- Example: `mu telimautp a?` "you didn't tell him, did you?" — negative past statement `mu telimautp` plus the tag particle `a`.
- Constraint: the tag particle `a` cannot combine with the past-tense interrogative morpheme `-s(')` in the same clause — the two are competing ways of marking the same clause as a question, so a clause is either an ordinary `-s(')`-marked past question or an `a`-tagged statement, not both.
- This overlaps with the `-s(i)p(n)` inferential/tag-question-like evidential marker detailed in [10d](#d.-tag-questions-and-confirmation-seeking-forms); do not conflate the clause-final particle `a` with the verb-internal evidential suffix — they are two different tag/confirmation-seeking strategies attested in different sources (Wiki `Yes/No Questions` page vs. Johnson's tag-question paper).

Rhetorical questions:

- Rhetorical questions use no special marking or question particle; they are formally identical to statements.
- Example: `elue'wien?` "are you crazy?!" / "you are crazy." — read from context/intonation alone.
- `wen geitoq?` "who knows?" functions only rhetorically in the source; it is not usable as a genuine information-seeking question. Speakers reportedly prefer a negative-statement equivalent when a literal reading is intended.

Guardrail:

- Do not generate a clause with both the past interrogative `-s(')` suffix and the tag particle `a`; treat that combination as ungrammatical.
- Do not mark a rhetorical question with `a` or `-s(')` — rhetorical questions in this source carry no dedicated question morphology at all.

### 13.3 Indefinite Pronouns

Indefinite pronouns are often built from question words:

| Base | Question use | Indefinite use |
|---|---|---|
| `wen` | who | someone / anyone |
| `goqwei` | what | something / anything |
| `tami` | where | somewhere / anywhere |
| `tal` | how | somehow / any way |

Position matters:

- Sentence-initial `wen` is usually "who?"
- Later `wen` can mean "someone/anyone".

Examples:

| Mi'gmaq | Meaning |
|---|---|
| `wen telim'sg's?` | who told you? |
| `telim'sg's wen?` | did anyone/someone tell you? |
| `nemij wen, tlimitis` | if you see anyone/someone, tell me |
| `mo wen pegisinug'p` | no one arrived |
| `mu pegisinug'p wen` | no one arrived |

With future negation, `mu` changes to `ma`.

Indefinite pronoun groups:

| Group | Form pattern | Typical English use | Notes |
|---|---|---|---|
| bare question word | `wen`, `goqwei`, `tami`, `tal` | someone/anyone, something/anything, somewhere/anywhere, somehow/any way | position and polarity determine question vs indefinite reading |
| `nata-` group | `natawen`, `natgoqwei`, `natami`, `natal` | some- only | written as one word; not usually "any-" |
| `tampas` group | `tampas wen`, `tampas goqwei`, `tampas tami`, `tampas tal` | any- without negative `mu` | `tampas` is written separately |
| `ta'n` group | `ta'n-wen`, etc. | some-/any- in restricted contexts | Wiki marks the exact distribution as still uncertain |
| `me' wen` | `me' wen` | anyone | from the Wiki `Questions` overview page (loop 12); `me'` "how" plus `wen` "who" |

Decision rule:

1. If the word is sentence-initial and the clause is an information question, read it as a question word.
2. If the same word appears later in the sentence, it may be an indefinite.
3. If English requires "some-" and not "any-", use `nata-`.
4. If English requires "any-" without a negative `mu`, use `tampas`.
5. If the phrase is under negation, bare `wen/goqwei` with `mu/mo` can give "no one/nothing" readings.
6. Use `ta'n-` indefinite forms only from attested examples or with review.

Additional examples:

| Mi'gmaq | Meaning |
|---|---|
| `nata-wen pegising'p` | someone arrived |
| `nata-wen nutaqap` | I heard someone |
| `amujpa nata-wen piluwei pipanimatis` | you will have to ask someone else |
| `Ma'li me misgilg aq tampas wen` | Mary is bigger than anybody else |
| `gis tlimatis tampas wen` | you may tell anyone |
| `ma wen 'pgsinug` | no one will arrive |

---

## 14. Dictionary and Source-Entry Workflow

When building sentence pairs or lexical rules from the local extraction:

1. Prefer modern dictionary headword spelling for generated Mi'gmaq.
2. Keep source transcription/transliteration separately.
3. Use `Part of Speech` from the parsed annotation box to decide noun animacy or verb class.
4. Use `Alternate Grammatical Forms` for plural and related forms where present.
5. Link every example back to the page JSON and original page URL.

Local file examples:

| Need | Local path |
|---|---|
| PDM page 307 JSON | `reference_materials/PDM/pages/page-0307.json` |
| PDM page 307 Markdown | `reference_materials/PDM/markdown/page-0307.md` |
| PDM page 307 scan | `reference_materials/PDM/images/page-0307.jpg` |
| Rand page 31 Markdown | `reference_materials/Rand/markdown/page-0031.md` |

## 14a. Discourse Particles and Predicate Frames

### 14a.1 `na`

`na` is a high-frequency discourse particle. In many simple clauses it can translate like a copular "is/am/are", but it should not be treated as a full English-style verb "to be".

Examples:

| Mi'gmaq | Meaning |
|---|---|
| `ula na ji'nm` | this is a man |
| `ni'n na Piel` | I am Piel |
| `ula na nmis` | this is my older sister |

Generation rule:

- Use `na` for simple identificational frames only when supported by examples.
- Do not force `na` into every English "is" sentence. Property predicates often use verb-like forms instead.

### 14a.2 Particles in the Local Dictionary Extraction

Local Mi'kmaq Online annotation boxes label these as particles:

| Particle | Translation | Local example |
|---|---|---|
| `ala` | that / there | `Ala magasan eteg.` "The store is there." |
| `moqwa'` | no | `Tegen mussew "moqwa'" mu' nestasiwun?` "Which part of 'no' don't you understand?" |
| `mestawgjuow` | very close | `Ntjignam wigit mestawgjuow.` "My brother lives very close." |
| `nangmiw` | immediately | `... tet nangmiw juguwa's.` "... immediately ..." |
| `jiptug` | perhaps | `Jiptug sapo'nug gis(i)lia's qame'g?` "Maybe tomorrow I can go to town?" |

Use particles as separate lexical items unless a source shows them integrated into a verb or fixed expression.

Generation rule:

- Treat `na` as the best-sourced discourse particle, not as a complete particle inventory.
- Treat the local `particle` labels as lexical anchors. Do not infer placement, scope, or pragmatic force from the English gloss alone.
- Preserve source punctuation around quoted particles, as in `"moqwa'"`.

### 14a.3 Conversational Phrase Seeds

The conversational phrase list is useful because it exposes person/number distinctions in ordinary speech. Mi'gmaq distinguishes second-person singular, dual, and plural; when addressing "you", choose the one-person, two-person, or three-plus-person form. The Wiki's own framing (loop 14 online re-validation): "Unlike in English, Mi'gmaq makes a distinction between you singular and you plural (similar to 'y'all')" — a useful comparison for English-speaking learners already familiar with regional "y'all"-type plurals, though Mi'gmaq additionally distinguishes dual from plural where "y'all" does not.

The Wiki page organizes its phrases into 8 categories (loop 14 online re-validation; not all individually reproducible here due to the source's own copyright framing, but useful as a coverage checklist): greetings, thanks, yes/no, casual conversation, names/origin, food, comprehension, and apologies/forgiveness. This sheet's phrase-seed table below covers all of these except **food** — treat food-related conversational phrases as a known, specific gap rather than an oversight.

| English frame | Mi'gmaq seed | Person/number note |
|---|---|---|
| Hi | `Gwe'` | greeting |
| Thank you | `Wela'lin` | one person to one person |
| Thank you | `Wela'lioq` | one person to many people |
| Thank you | `Wela'lieg` | two or more people to one or more people |
| Yes / no | `E'e` / `Moqwa'` | `E'e` is pronounced like "ehe" in the Wiki note |
| What's up? | `Taliaq?` | conversational question |
| Not much | `Mu talianug` | negative conversational response |
| How are you? | `Me' talein?` | asking one person |
| How are you? | `Me' talioq?` / `Me' taloltioq?` | asking two / asking three or more |
| I'm fine. And you? | `Welei. Gatu gi'l(ew)?` | `gi'l` singular; `gi'lew` dual/plural |
| What is your name? | `Taluisin (gi'l)?` | one addressee |
| What is your name? | `Taluisioq (gilew)?` | two addressees |
| What is your name? | `Taluisultioq gilew?` | three or more addressees |
| Where are you from? | `Tami tett tle'iawin?` | one addressee |
| Where are you from? | `Tami tett tle'iawioq?` | two addressees |
| Where are you from? | `Tami tett tle'iawultioq?` | three or more addressees |
| I am from ... | `Tle'iawi ... -g` | the final `-g` marks location, e.g. `Listugujg` |
| I do not understand | `Mu nestmu` | negated comprehension |
| Do you speak Mi'gmaq? | `'Nnuisin?` | to one person |
| Yes, I speak Mi'gmaq | `E'e, 'nnuisi` | first-person answer |
| No, but I understand | `Moqwa, pasna nestasi.` | contrastive conversational answer |
| Speak to me in Mi'gmaq | `'Nnugluli` | directive |
| Sorry / very sorry | `Mesgei` / `Mawimsgei` | apology scale |

Use these as fixed phrase seeds first. Generalize only the person/number contrasts that are supported elsewhere in the verb sections.

## 14b. Local Corpus Anchors for Authoring

The extracted Mi'kmaq Online pages give modern headwords, source references, part-of-speech labels, examples, recordings, and alternate forms. These are the safest anchors for generated lexical choices.

Generated local evidence index:

- `docs/micmac-corpus-example-bank.md` summarizes 2,362 parsed entries from `reference_materials/*/pages/*.json`.
- It includes counts by part of speech, example sentences by class, and alternate grammatical forms.
- Regenerate it with `python3 tools/build_mikmaq_corpus_example_bank.py` after re-extracting or changing the parser.

Current parsed coverage:

| Part of speech | Entries | With examples | With alternate forms |
|---|---:|---:|---:|
| noun animate | 238 | 218 | 232 |
| noun inanimate | 533 | 434 | 457 |
| verb animate intransitive | 895 | 774 | 864 |
| verb inanimate intransitive | 226 | 201 | 203 |
| verb animate transitive | 178 | 142 | 168 |
| verb inanimate transitive | 149 | 134 | 149 |
| particle | 13 | 13 | 0 |
| loc | 22 | 20 | 13 |

### 14b.1 Animate Nouns

| Headword | Meaning | Alternate form clue |
|---|---|---|
| `ajioqjemin` | blackberry | `ajioqjeming` blackberries |
| `miti` | aspen / poplar | `miti'g` poplar trees |
| `atuomgomin` | strawberry | `atuomgoming` strawberries |
| `aqamoq` | white ash tree | `aqamoqq` white ash trees |
| `pi'gun` | feather | animate noun in dictionary |
| `utmaqann` | his/her pipe | animate possessed noun |

### 14b.2 Inanimate Nouns

| Headword | Meaning | Alternate form clue |
|---|---|---|
| `aloqoman` | grape | `aloqomann` grapes |
| `amalo'qoman` | fruit | `amalo'qomann` fruits |
| `alawei` | pea | `alawe'l` peas |
| `apjelmultimgewei` | rice | `apjelmultimgewe'l` plural/mass-related form |
| `pugtew` | fire | inanimate noun |
| `ugpitn` | his/her hand | inanimate noun in local entry |

### 14b.3 Verb Class Pairs

Use these to test the animate/inanimate object split:

| Class | Headword | Meaning |
|---|---|---|
| VAI | `wele'g` | he/she is living well |
| VAI | `mi'wet` | he/she is thankful |
| VII | `alaqteg` | it is spread out |
| VII | `pemitg` | it is flowing |
| VTA | `wela'latl` | he/she does good for someone |
| VTA | `oqonoqo'pilatl` | he/she blindfolds him/her |
| VTI | `genn'g` | he/she holds it |
| VTI | `sa'se'wa'toq` | he/she exchanges it |

### 14b.3a Corpus-Attested Cross-Check for Verb Paradigm Cells

The Wiki paradigm tables in [Section 7](#vai-animate-intransitive-verbs) and [Section 10](#vta-transitive-animate-verbs) give abstract endings; `docs/micmac-corpus-example-bank.md`'s "Alternate Forms" tables independently attest real inflected words for several of the same person/number and subject/object cells, extracted from the Clark dictionary. This cross-check increases confidence in the abstract endings and gives generation-ready real-word anchors, not just suffix templates.

VAI 1sg/1+3 dual/1+3 plural, cross-checked against multiple stems (all Clark, matching the `-i` class endings `-i`/`-ieg`/`-ultieg` in [7](#vai-animate-intransitive-verbs)):

| Stem | 1sg | 1+3 dual | 1+3 plural |
|---|---|---|---|
| `tia'mugwet` "hunt moose" | `tia'mugwei` | `tia'mugweieg` | `tia'mugweia'tieg` |
| `egtapluit` "hunts" | `egtaplui` | `egtapluieg` | `egtaplultieg` |
| `a'sutmat` "pray" | `a'sutmai` | `a'sutmaieg` | `a'sutma'tieg` |
| `alu'sat` "skinny" | `alu'sai` | `alu'saieg` | `alu'sa'tieg` |
| `alaqsing` "fly around" | `alaqsin` | `alaqsineg` | `alaqsultieg` |

Guardrail: these confirm the `-i class` singular/dual/plural pattern from the Wiki `VAI` page holds across independently-sourced dictionary stems — a useful sanity check before generating a new stem's paradigm, but still only `-i` class; `-a`/`-e` class forms were not independently cross-checked this way in the corpus scan.

VTA 1sg subject acting on 1/2/3 object, cross-checked against multiple stems (Clark), matching the `1->2`/`1->3` and `3->1` cells in [10](#vta-transitive-animate-verbs) and [10.1](#full-present-indicative-subject-x-object-matrix):

| Stem | 1->3 ("I ... him/her") | 1->2 ("I ... you") | 3->1 ("he/she ... me") |
|---|---|---|---|
| `ewlamatl` "looks at with pity" | `ewlamg` | `ewlamul` | `ewlamit` |
| `ewleiwatl` "treats poorly" | `ewleiaq` | `ewleiul` | `ewleiwit` |
| `ewlistuatl` "heeds request" | `ewlistaq` | `ewlistl` | `ewlistuit` |
| `apt'sqa'tl` "lock up" | `apt'sqa'q` | `apt'sqo'l` | `apt'sqa'it` |
| `aptlama'latl` "smother" | `aptlama'l'g` | `aptlama'lul` | `aptlama'lit` |

Guardrail: the corpus's own free-text tags (`1-3`, `1-2`, `3-1`) match this sheet's subject-object notation directly, which is a useful parser cross-check; but the corpus gives no negative, past, future, or obviative-tagged VTA cell, consistent with the reference_materials corpus containing no dedicated grammar/paradigm pages (confirmed in loop 7 — see `docs/micmac-missing-details.md`).

VTI 1sg/1+3 plural subject acting on a singular inanimate object, cross-checked against multiple stems (Clark), matching the `-tu` class cells in [9](#vti-transitive-inanimate-verbs):

| Stem | 1 ("I ... it") | 1+3 ("we ... it") |
|---|---|---|
| `pepga'toq` "thin out" | `pepga'tu` | `pepga'tueg` |
| `esna'toq` "pack down" | `esna'tu` | `esna'tueg` |
| `esnamqa'toq` "squeeze together" | `esnamqa'tu` | `esnamqa'tueg` |
| `espa'toq` "lift up high" | `espa'tu` | `espa'tueg` |
| `mest'g` "taste" | `mestm` | `mestmeg` (note: `-m` class, not `-tu` class, despite the shared meaning pattern) |

Generation rule for this cross-check:

- Prefer a corpus-attested real-word form from these tables over a mechanically-generated ending when authoring an example sentence for these specific stems.
- For a new stem not in these tables, the abstract endings in Sections 7/9/10 remain the authoritative generation source; treat the corpus tables here as confirmation evidence, not a replacement inventory.
- Do not extend this cross-check to negative, past, future, or obviative cells — the local corpus (`reference_materials/`) has no attested examples in those categories (confirmed by direct search in loop 7).

### 14b.4 Locative-Labeled Entries

Some dictionary entries are labeled `loc`. Treat these as lexicalized location expressions or locative forms, not ordinary nouns.

| Headword | Meaning | Local example |
|---|---|---|
| `piliganig` | there are new homes built there | `Nugu' ms't tami elapa'timg, piliganig.` "Now no matter where you look, there are new homes built there." |
| `usgit` | surface / on top | lexical base for surface/top entries |
| `usgitug` | on the top / surface | `Usgitug lega'tu mawmujgajewei a'sun.` "Put the best blanket on top." |
| `qaspemg` | at the lake edge | `Nti gesatg altugwi'g qaspemg.` "My dog likes running about along the lake edge." |
| `qasgisipug` | at the edge of the river/water | `Nmigneg eteg'pneg ala qasgisipuigtug.` "My fishing gear was at the river's edge." |
| `gegiasqatug` | on the edge of anything | `... gegiasqatug aq smtug apa'ja'tieg.` "... at the edge ... and immediately came back." |

Generation rule:

- Do not add another locative marker to an already locative lexical form unless a source shows it.
- If the headword is already glossed as "at/on/in/there", treat the location meaning as part of the lexical form.
- Use the ordinary noun entry, not the `loc` form, when generating a non-locative noun phrase.

### 14b.5 Parser and Label Triage

The local corpus has some labels that are useful for QA but not safe as direct grammar rules.

| Label / pattern | Handling rule |
|---|---|
| `vii` | Normalize to `verb inanimate intransitive` in parser output and QA reports. |
| `unclassified part of speech` | Do not generate from the label; inspect the source entry manually. |
| `??` | Treat as unusable for generation pending source or speaker review. |
| `Borrowed Word` | Preserve as a lexical entry and flag the spelling/source language for review. |
| `Related Entry` / stray `Meanings:` labels | Treat as parser noise unless the page-level source confirms a lexical category. |

---

## 15. Common Pitfalls

1. **Do not infer animacy from English.** Check the dictionary label.
2. **Do not use one English verb form for all objects.** "I see him/her" and "I see it" use different verb classes.
3. **Do not ignore obviation.** Two animate third persons require a spotlight decision.
4. **Do not pluralize nouns with English `-s`.** Animate and inanimate nouns use different Mi'gmaq plural patterns.
5. **Do not leave inalienable body-part or kin nouns bare when a possessor is required.**
6. **Do not use `mu` without the negative verb form.**
7. **Do not place `mu` after the verb.**
8. **Do not assume dual is available everywhere.** It is strongest in VAI and often absent/merged elsewhere.
9. **Do not mix Listuguj and historical spellings in one generated sentence.**
10. **Do not treat adjectives as English-style modifiers by default.** Many property expressions behave verbally and agree with animacy.
11. **Do not generate bare dependent verb stems.** If a source only shows a stem with a preverb, keep a preverb.
12. **Do not use a plain past statement as a past yes/no question.** Past questions require question morphology.
13. **Do not treat `na` as a universal copula.** Use it in attested identificational frames.
14. **Do not add schwa apostrophes from pronunciation guesses.** Follow the written source.
15. **Do not apply a plural heuristic when Mi'kmaq Online gives an alternate form.**
16. **Do not ignore evidentiality in past-tense authoring.** Mark uncertain past forms for review.
17. **Do not treat future as a plain English tense.** Future forms include modal/evidential structure.
18. **Do not use classifiers with 1-5 counted nouns, and do not omit them with 6+ counted nouns.**
19. **Do not use word order alone to identify subject and object.** Check morphology, animacy, obviation, and discourse.
20. **Do not generate `-ugsi` VTA forms mechanically.** Treat participant-plural inverse-like contexts as reviewed patterns.

## 15a. Sentence QA Checklist

Before accepting a generated row:

| Check | Pass condition |
|---|---|
| Orthography | one spelling system; no mixed historical/modern forms |
| Noun animacy | every noun with agreement/plural role has AN/INAN resolved |
| Verb class | VAI/VII/VTA/VTI selected from subject/object animacy |
| Person/number | inclusive/exclusive and dual/plural checked where relevant |
| Obviation | all animate third-person pairs have a proximate/obviative decision |
| Counted NPs | classifier rule checked for numeral range and noun class |
| Possession | alienable/inalienable pattern checked; possessed animate nouns reviewed for OBV |
| Tense/evidentiality | present/past/future morphology and source-of-knowledge marking supported by paradigm or marked for review |
| Negation | negative particle plus negative verb form; particle before target |
| Question | yes/no vs information vs echo vs indefinite reading resolved |
| Preverbs | no bare dependent stems; stacked preverbs preserve intended scope |
| Word order | discourse role checked; subject/object not inferred from position alone |
| Local evidence | lexical choices cite Mi'kmaq Online page JSON or a grammar source |
| Review flag | anything not covered by this sheet is marked `needs_speaker_review` |

---

## 16. Sources and Provenance

Primary online grammar sources used:

- Mi'gmaq Wiki main page: https://wiki.migmaq.org/index.php?title=Main_Page
- Person and number: https://wiki.migmaq.org/index.php?title=Person_and_number
- Animacy: https://wiki.migmaq.org/index.php?title=Animacy
- Obviation: https://wiki.migmaq.org/index.php?title=Obviation
- Nouns: https://wiki.migmaq.org/index.php?title=Nouns
- Plural nouns: https://wiki.migmaq.org/index.php?title=Plural_Nouns
- Absentative: https://wiki.migmaq.org/index.php?title=Absentative
- Diminutive and augmentative: https://wiki.migmaq.org/index.php?title=Diminutive_and_Augmentative
- Possession: https://wiki.migmaq.org/index.php?title=Possession
- Spelling: https://wiki.migmaq.org/index.php?title=Spelling
- Vowels: https://wiki.migmaq.org/index.php?title=Vowels
- Consonants: https://wiki.migmaq.org/index.php?title=Consonants
- Syllables: https://wiki.migmaq.org/index.php?title=Syllables
- Stress: https://wiki.migmaq.org/index.php?title=Stress
- Writing schwa: https://wiki.migmaq.org/index.php?title=Writing_Schwa
- Sound length: https://wiki.migmaq.org/index.php?title=Sound_Length
- Pronunciation of Q: https://wiki.migmaq.org/index.php?title=Pronunciation_of_Q
- Obstruents: https://wiki.migmaq.org/index.php?title=Obstruents
- W and I: https://wiki.migmaq.org/index.php?title=W_and_I
- Laxed vowels: https://wiki.migmaq.org/index.php?title=Laxed_Vowels
- Glosses: https://wiki.migmaq.org/index.php?title=Glosses
- Mood: https://wiki.migmaq.org/index.php?title=Mood
- VAI: https://wiki.migmaq.org/index.php?title=VAI
- VII: https://wiki.migmaq.org/index.php?title=VII
- VTI: https://wiki.migmaq.org/index.php?title=VTI
- VTA: https://wiki.migmaq.org/index.php?title=VTA
- Preverbs: https://wiki.migmaq.org/index.php?title=Preverbs
- Tense: https://wiki.migmaq.org/index.php?title=Tense
- Reflexive: https://wiki.migmaq.org/index.php?title=Reflexive
- Questions: https://wiki.migmaq.org/index.php?title=Questions
- Information questions: https://wiki.migmaq.org/index.php?title=Information_Questions
- Yes/no questions: https://wiki.migmaq.org/index.php?title=Yes/No_Questions
- Indefinite pronouns: https://wiki.migmaq.org/index.php?title=Indefinite_Pronouns
- Negation: https://wiki.migmaq.org/index.php?title=Negation
- Discourse particles: https://wiki.migmaq.org/index.php?title=Discourse_Particles
- Numerals: https://wiki.migmaq.org/index.php?title=Numerals
- Wikiversity Mi'kmaq grammar overview: https://en.wikiversity.org/wiki/Mi%27kmaq_language/Grammar
- Native Languages of the Americas animacy examples: https://www.native-languages.org/mikmaq_animate.htm
- Mi'kmaq Online dictionary/reference corpus: https://mikmaqonline.org/

Research sources added for v0.3:

- Research dossier: `docs/micmac-research-dossier.md`
- Downloaded source manifest: `research_sources/README.md`
- Inglis & Johnson, "The Mi'kmaq Future: An Analysis": https://ojs.library.carleton.ca/index.php/ALGQP/article/download/548/449/1492
- Johnson, "Pragmatic underspecification of tag question evidentials in Mi'kmaq": https://conf.ling.cornell.edu/SULA7/johnson.pdf
- Stevens, Denny, Sylliboy, and Friesen, "Argument Mapping in Mi'kmaw": https://cla-acl.ca/pdfs/actes-2021/Stevens_et_al-Argument_mapping_in_Mikmaw.pdf
- Coon & Bale, "The interaction of person and number in Mi'gmaq": https://septentrio.uit.no/index.php/nordlyd/article/download/3235/3184/12521
- Little, "A Binary Feature Analysis of Mi'gmaq Number Agreement": https://www.lingref.com/cpp/wccfl/35/paper3395.pdf
- Bale & Coon, classifier poster: https://s3.amazonaws.com/files.commons.gc.cuny.edu/wp-content/blogs.dir/799/files/2012/10/Bale-Alan-Concordia-University-Coon-Jessica-McGill-University.pdf
- Lam, "Beyond one, two, three: Number matters in classifier languages": https://langsci-press.org/catalog/view/275/2501/1957-1
- Hamilton, "The syntax of Mi'gmaq: A configurational account": https://michaeldavidhamilton.wordpress.com/research/

Local extracted materials:

- `reference_materials/manifest.json`
- `reference_materials/*/pages/*.json`
- `reference_materials/*/markdown/*.md`
- `reference_materials/*/images/*.jpg`
