export function isWriteAllowed(
  configuredKey: string | null | undefined,
  requestKey: string | null | undefined,
  origin?: string | null
) {
  if (origin === "https://77zmf.github.io") {
    return Boolean(configuredKey) && requestKey === configuredKey;
  }
  if (!configuredKey) return true;
  return requestKey === configuredKey;
}
