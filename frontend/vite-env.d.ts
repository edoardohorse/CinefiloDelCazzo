interface ImportMetaEnv {
  readonly DEV: string;
  readonly PROD: string;

  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;

  // KEYCLOAK
  readonly VITE_AUTH_URL: string;
  readonly VITE_REALM: string;
  readonly VITE_CLIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
