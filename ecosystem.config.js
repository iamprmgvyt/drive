module.exports = {
  apps: [
    {
      name: 'vercel-control-plane',
      script: 'apps/vercel-control-plane/src/index.ts',
    },
    {
      name: 'vps-storage',
      script: 'apps/vps-storage/src/server.ts',
    },
  ],
};
