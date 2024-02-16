export default function getCurrentBasePath() {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PRODUCT_UR ?? '';
  }
  return process.env.NEXT_PUBLIC_LOCAL_URL ?? '';
}
