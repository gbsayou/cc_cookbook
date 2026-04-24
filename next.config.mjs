import nextra from 'nextra';

const withNextra = nextra({
  // Nextra 4: content lives in /content by default,
  // theme config moved to app/(docs)/layout.tsx
});

export default withNextra({
  reactStrictMode: true,
});
