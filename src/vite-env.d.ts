/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string;
  readonly VITE_PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
