/**
 * MarinaMap — a keyless Google Maps embed.
 *
 * This replaces the old MapView, which loaded the Google Maps JavaScript API
 * through Manus's Forge proxy using a Manus-issued key. Off that platform the
 * key resolves to `undefined` and the map never renders.
 *
 * The site only ever did two things with the full JS API: centre the map and
 * drop a single pin. Google's `/maps` embed does both through query parameters,
 * with no API key, no billing account and no quota — so there is nothing here
 * to configure, expire, or bill.
 *
 * Do not reintroduce MapView. It pulls the Forge proxy dependency back in.
 */

import { cn } from "@/lib/utils";

interface MarinaMapProps {
  className?: string;
  /** Decimal degrees. Defaults to Prince William Marina. */
  lat?: number;
  lng?: number;
  /** Roughly the old initialZoom. 14 shows the marina and the river bend. */
  zoom?: number;
  /** Accessible name for the frame, and the pin's label. */
  title?: string;
}

export function MarinaMap({
  className,
  lat = 38.6818,
  lng = -77.2598,
  zoom = 14,
  title = "Prince William Marina — Luna Sea Marine",
}: MarinaMapProps) {
  // `q` places the marker, `ll` centres the view, `z` sets zoom, `output=embed`
  // returns the iframe-safe renderer.
  const src =
    "https://maps.google.com/maps?" +
    new URLSearchParams({
      q: `${lat},${lng}`,
      ll: `${lat},${lng}`,
      z: String(zoom),
      output: "embed",
    }).toString();

  return (
    <iframe
      src={src}
      title={title}
      aria-label={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={cn("w-full h-[500px] border-0", className)}
    />
  );
}
