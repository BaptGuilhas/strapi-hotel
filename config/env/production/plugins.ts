// export default () => ({
    console.log("Boujoujou")
    export default ({ env }) => ({
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
              baseUrl: `https://${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`, // Ajoute cette ligne,
            },
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
            breakpoints: [64, 128, 256, 512], // Active la génération des miniatures
          },
        },
  });
// });

    // ~/strapi-aws-s3/backend/config/plugins.js
   