// PM2 process config.
// Usage:
//   npm run build
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup   (persist across server reboots)
module.exports = {
  apps: [
    {
      name: "jcfm-website",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
