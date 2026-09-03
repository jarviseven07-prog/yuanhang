import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://jarviseven07-prog.github.io' : 'https://yuanhang-demo.vercel.app',
  base: isGitHubPages ? '/yuanhang' : '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
