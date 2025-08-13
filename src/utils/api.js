export function getBaseUrl() {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  // fallback
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
    // https://ourapp.com-uughg.com
  }

  return `http://localhost:3000`;
}

// /api
