export default ({ env }) => ({
    url: env("API_HEROKU_URL"),
    cron: {
      enabled: true, // Active les cron jobs
    },
  });
  