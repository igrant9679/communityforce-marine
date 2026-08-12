# Images that must be supplied by hand

Every image the site serves is listed in `image-manifest.json` and fetched into
`client/public/images/` by `vendor-images.mjs`. Three of them cannot be fetched.

They lived in Manus's **private** storage, referenced through a `/manus-storage/`
path that only a Vite dev-server plugin ever served. On the public CloudFront
distribution they answer **403** while the other 73 answer 200. They appear to be
original photographs of the vessel and exist nowhere reachable.

| Filename                | Appears as                                                      | What to shoot |
| ----------------------- | --------------------------------------------------------------- | ------------- |
| `IMG_0884_0eb5630e.JPG` | Home `boatReal1`, Stay Aboard `boatDay`, Social Charters gallery | The boat at Prince William Marina |
| `IMG_0787_3b05bbdf.JPG` | Home `boatReal2`, Stay Aboard `boatRiver`                        | The boat on the Occoquan River |
| `b3_6de55c03.jpg`       | Home `boatReal3`, Stay Aboard `swimPlatform`                     | The swim platform |

## Supplying them

Drop the files into `client/public/images/` under those **exact** filenames —
case included, note the uppercase `.JPG` on two of them — and commit.
`vendor-images.mjs` skips anything already on disk, so no other change is needed.

Strip EXIF before committing. iPhone originals carry GPS coordinates, and there
is no reason to ship the owner's location history to visitors:

```bash
# resize to 2048px on the long edge and drop all metadata
magick input.jpg -auto-orient -resize '2048x2048>' -strip output.jpg
```

`-auto-orient` before `-strip` matters: it bakes the rotation into the pixels
first, so stripping the orientation tag does not leave the photo sideways.

## Until then

The three files 404, which is deliberate and visible — the Express server returns
a real 404 for any path with a file extension rather than quietly answering
`200 text/html`. Expect exactly these three to fail in a build log or a browser
check. Anything else failing is a real problem.
