module.exports = {
  apps: [
    {
      name: "poller",
      script: "./build/index.js",
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
