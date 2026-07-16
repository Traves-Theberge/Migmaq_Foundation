# Mi'kmaq Research Source Manifest

Research archive created for the Mi'kmaq grammar cheatsheet project.

## Downloaded sources

| Local file | Source URL | Notes |
| --- | --- | --- |
| `micmac-teaching-grammar-delisle-metallic-1976.pdf` | https://csclub.uwaterloo.ca/~rfburger/micmac-teaching-grammar-gilles-l-delisle-manny-l-metallic-1976.pdf | Delisle & Metallic teaching grammar, 629 pages (Restigouche/Manny Metallic dialect). `pdftotext` still produces no usable text (CVISION-compressed scan). **Successfully mined in loop 12** by rendering pages to PNG with `pdftoppm -png -r 150` and reading them directly with vision (no tesseract/OCR available or used — this is direct human-equivalent reading of legible scanned pages, not automated OCR, so the project's "don't trust unverified OCR" caution does not apply the same way; treat individual transcriptions as carefully-read but still subject to the usual scan-crop/legibility limits noted inline in the cheatsheet, e.g. the cropped rightmost column in the VTA combined-ending table). This became the single richest source in the project for VTA combined endings, possessive pronouns, demonstrative plurals, immediate/unspecified past, and the only infinitive-mode rule found anywhere. |
| `inglis-johnson-mikmaq-future-2001.pdf` / `.txt` | https://ojs.library.carleton.ca/index.php/ALGQP/article/download/548/449/1492 | Future as modality/evidential analysis. |
| `johnson-tag-question-evidentials-mikmaq.pdf` / `.txt` | https://conf.ling.cornell.edu/SULA7/johnson.pdf | Tag-question/evidential suffix `-s(i)p(n)`. |
| `stevens-et-al-argument-mapping-mikmaw-2021.pdf` / `.txt` | https://cla-acl.ca/pdfs/actes-2021/Stevens_et_al-Argument_mapping_in_Mikmaw.pdf | Argument mapping, voice, animacy, stem classes. |
| `coon-bale-interaction-person-number-migmaq-2014.pdf` / `.txt` | https://septentrio.uit.no/index.php/nordlyd/article/download/3235/3184/12521 | Person/number agreement, transitive template, `-ugsi`. |
| `wccfl35-number-agreement-migmaq.pdf` / `.txt` | https://www.lingref.com/cpp/wccfl/35/paper3395.pdf | Singular/dual/plural agreement in animate intransitives. |
| `bale-coon-classifiers-numerals-poster-2012.pdf` / `.txt` | https://s3.amazonaws.com/files.commons.gc.cuny.edu/wp-content/blogs.dir/799/files/2012/10/Bale-Alan-Concordia-University-Coon-Jessica-McGill-University.pdf | Numeral classifier behavior in Mi'gmaq and Chol. |
| `beyond-one-two-three-number-classifier-languages.pdf` / `.txt` | https://langsci-press.org/catalog/view/275/2501/1957-1 | Secondary source summarizing Bale & Coon 2014 classifier pattern. |
| `hamilton-syntax-migmaq-dissertation-2015.pdf` / `.txt` | https://www.dropbox.com/scl/fi/8sx96opjcropbzgrrgclx/MDHamilton-2015-SyntaxMi-gmaq_Diss.pdf?rlkey=jl0apxz13vfa20og366pjjfja&dl=1 | Syntax, word order, obviation, animacy, agreement. |
| `inglis-speakers-experience-modality-thesis.pdf` / `.txt` | https://memorial.scholaris.ca/bitstreams/d2ef9a79-8dbd-43ca-84ef-f3cdb63e7d86/download | Downloaded loop 12 (2026-07-12) — the lead below was successfully re-tried and is no longer blocked. Stephanie H. Inglis 2002 PhD dissertation, Memorial University of Newfoundland, "Speaker's Experience: A Study of Mi'kmaq Modality" — 227 pages, epistemic modality in AI verbs, full/reduced stem realis/irrealis system, evidential suffixes. `pdftotext -layout` extraction has minor OCR noise (e.g. "Mnunaq" for "Mi'kmaq") but is otherwise usable. |
| `rand-1888-key-to-pronunciation.txt` | https://archive.org/stream/dictionaryoflang00rand/dictionaryoflang00rand_djvu.txt | Re-checked loop 15 (2026-07-12). Fetched the archive.org full-OCR-text viewer for Rand's 1888 dictionary directly (not just the borrow/restricted book page checked in loop 12). Confirmed the OCR **did not preserve Rand's breve/macron diacritics** — they degrade to stray characters (e.g. `2`, `S`, `fl` in place of marked vowels) — so this does **not** resolve the "Rand orthography cannot be validated from local text" ceiling from loop 12. However, Rand's own prose "Key to the Pronunciation" (explaining his vowel system in English words, not symbols) came through cleanly and is saved here as a genuine first-party quote. |

## Leads not fully downloaded

| Source | URL | Status |
| --- | --- | --- |
| Father Pacifique / Hewson & Francis grammar | https://archive.org/details/micmacgrammaroff0000paci ; alternate mirror tried loop 15: https://vdoc.pub/documents/the-micmac-grammar-of-father-pacifique-2l746cpo9ocg | Re-checked loop 12 (archive.org) and loop 15 (vdoc.pub mirror), 2026-07-12: both access-restricted. The vdoc.pub mirror exposes only the table of contents (33 lessons; confirmed lesson titles for AI/TI/TA conjugation classes — see the cheatsheet's mode/verb sections for how this maps to existing content) — the actual paradigm tables in Lessons 9-20 are login-gated. Confirmed genuine ceiling from two independent access attempts now, not a stale check. |
| Bale & Coon 2014, *Classifiers Are for Numerals, Not for Nouns* | https://direct.mit.edu/ling/article/45/4/695/578/Classifiers-Are-for-Numerals-Not-for-Nouns | Paywalled primary article; open poster and open secondary discussion downloaded. Not re-checked in loop 12. |

