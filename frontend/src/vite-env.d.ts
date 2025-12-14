
interface ImportMetaEnv {
	readonly VITE_BASE_API: string
	readonly VITE_DOMAIN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}