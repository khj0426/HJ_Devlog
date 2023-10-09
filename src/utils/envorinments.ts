export const Environment = {
  baseURL: process.env.NEXT_PUBLIC_SECURE_BASE_URL,

  naverID: process.env.NEXT_PUBLIC_SECURE_NAVER_ID,

  naverSecret: process.env.NEXT_PUBLIC_SECURE_NAVER_SECRET,

  naverCallback: process.env.NEXT_PUBLIC_SECURE_NAVER_CALLBACK,
} as const;
