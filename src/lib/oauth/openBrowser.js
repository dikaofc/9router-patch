// Vercel-safe browser opener.
// On Vercel there is no local browser / display, so we just print the auth URL
// instead of spawning a browser process (which would throw on the serverless
// runtime). On self-hosted / Termux we try `open` and fall back to printing the
// URL if no browser is available (e.g. headless Termux).
const IS_VERCEL = !!(process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_REGION);

// NO_BROWSER=1 is exported by start-termux.sh / `start-platform.js
// --no-browser` for hosts with no display: print the URL instead of spawning a
// browser opener that would silently fail.
const NO_BROWSER = /^(1|true|yes)$/i.test(process.env.NO_BROWSER || "");

export async function openBrowser(url) {
  if (IS_VERCEL || NO_BROWSER) {
    console.log(`\n🌐 Open this URL in your browser to authenticate:\n${url}\n`);
    return;
  }
  try {
    const open = (await import("open")).default;
    await open(url);
  } catch {
    console.log(`\n🌐 Open this URL in your browser to authenticate:\n${url}\n`);
  }
}
