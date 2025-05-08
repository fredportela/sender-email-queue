module.exports = {
  apps: [
    {
      name: 'nestjs-sender-queue',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'dist'],
      max_memory_restart: '500M',
      node_args: "--env-file .env",
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
