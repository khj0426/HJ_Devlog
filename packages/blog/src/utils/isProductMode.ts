export default function isProductionMode() {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }
  return false;
}
