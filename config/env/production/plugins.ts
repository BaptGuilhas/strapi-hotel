// export default () => ({
     
    module.exports = ({ env }) => ({
        'users-permissions': {
          config: {
            jwtSecret: env('JWT_SECRET'), // Utilisation de la variable d'environnement
          },
        },
        upload: {
          config: {
            provider: 'aws-s3',
            providerOptions: {
              credentials: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
              },
              region: env('AWS_REGION'),
              params: {
                ACL: null,
                Bucket: env('AWS_BUCKET'),
              },
            },
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
          },
        },
  });
// });

    // ~/strapi-aws-s3/backend/config/plugins.js
   