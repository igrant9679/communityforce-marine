# Dead image references — resolved, kept as a record

Nothing is missing any more. `image-manifest.json` lists 72 images and
`vendor-images.mjs` fetches all 72. A clean build reports `fetched 72/72` with no
warnings. If you see any failure, something has actually changed — investigate,
do not assume it is expected.

This file used to claim three photographs were lost and had to be re-shot. That
was wrong, and the reasoning behind the correction is worth keeping so nobody
repeats it.

## What the earlier diagnosis got wrong

Four manifest keys answered **403** on the CloudFront distribution:

| Key | Believed | Actually |
| --- | --- | --- |
| `IMG_0884_0eb5630e.JPG` | private original, must re-shoot | key never existed |
| `IMG_0787_3b05bbdf.JPG` | private original, must re-shoot | key never existed |
| `b3_6de55c03.jpg` | private original, must re-shoot | key never existed |
| `hero_sunset-…r47R25…webp` | not noticed at all | one-character typo, unused variable |

**403 on this bucket does not mean "private".** Requesting an invented key —
`this-key-definitely-does-not-exist-12345.jpg` — also returns `403` with an
`application/xml` body, because the bucket denies `ListBucket` and S3 reports a
missing object as `AccessDenied`. So a 403 tells you a key is unreadable, never
that a photograph exists behind it.

The earlier "73 fetch, 3 fail" split was never measured. It was inferred from URL
*shape* — absolute CloudFront URLs assumed live, `/manus-storage/` paths assumed
private — and the inference was off by one. The real figure was 72/4. Diagnosing
this from a cloud sandbox is impossible: sandbox egress rules also answer 403, so
every image looks private from in there.

## How they were resolved

No new photography was needed. Manus assigns a fresh hash suffix each time the
same file is re-uploaded, so most dead keys had a live sibling sharing a base
name. `b6_536f6ef7.jpg` and `b6_e68c25be.jpg` are both exactly 41,956 bytes,
which is what put the pattern beyond doubt.

| Was | Now | Why |
| --- | --- | --- |
| `IMG_0884_0eb5630e.JPG` | `lunasea2_landscape_d63608ce.png` | Luna Sea at her actual Prince William Marina slip — transom reads `Luna Sea / OCCOQUAN, VA` |
| `IMG_0787_3b05bbdf.JPG` | `IMG_0787_03fa7333.JPG` | Live sibling; genuinely shows the 390 on the Occoquan |
| `b3_6de55c03.jpg` | `pw_marina2_landscape_f37bf649.png` | No swim-platform photograph exists in the set, so the tile became the marina waterfront and its caption was corrected to match |
| `hero_sunset-…r47R25…webp` | *(removed)* | `Home.tsx` has `r47S25`, `SocialVenue.tsx` had `r47R25`. Only `S` exists. The variable was never rendered |

`StayAboard`'s `swimPlatform` key was deleted rather than repointed: its only
file was dead and nothing ever rendered it.

## Still worth having

A real photograph of **the swim platform**. `Home.tsx` had a gallery tile
captioned "swim platform — family day on the water" and no image in the set
shows one, so the caption now describes the marina instead. A genuine swim
platform photo would let that tile go back to what it was for.

Strip EXIF before committing anything new — iPhone originals carry GPS:

```bash
magick input.jpg -auto-orient -resize '2048x2048>' -strip output.jpg
```

`-auto-orient` before `-strip` matters: it bakes the rotation into the pixels
first, so removing the orientation tag does not leave the photo sideways.
