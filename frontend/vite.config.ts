import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const useProxy = env.VITE_USE_PROXY === "true";
  const target = env.VITE_CHAT_API_BASE_URL ?? "https://chat-api.xr50.eu";

  const apiToken = env.VITE_CHAT_API_TOKEN ?? "";

  return {
    plugins: [react()],
    server: {
      proxy: useProxy
        ? {
            "/api/chat": {
              target,
              changeOrigin: true,
              configure: (proxy) => {
                proxy.on("proxyReq", (proxyReq) => {
                  if (apiToken) {
                    proxyReq.setHeader("Authorization", `Bearer ${apiToken}`);
                  }
                });
              },
            },
          }
        : undefined,
    },
  };
});
