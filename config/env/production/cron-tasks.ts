import AWS from "aws-sdk";

export default {
  s3Sync: {
    task: async ({ strapi }) => {
      console.log("🔄 Synchronisation des fichiers S3 → Strapi...");

      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const bucket = process.env.AWS_BUCKET;

      try {
        // Liste les fichiers sur S3
        const { Contents } = await s3.listObjectsV2({ Bucket: bucket }).promise();

        for (const file of Contents || []) {
          const fileUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`;

          // Vérifie si le fichier est déjà dans Strapi
          const existingFile = await strapi.entityService.findMany("plugin::upload.file", {
            filters: { url: fileUrl },
          });

          if (!existingFile.length) {
            // Ajoute le fichier à Strapi
            await strapi.entityService.create("plugin::upload.file", {
              data: {
                name: file.Key,
                url: fileUrl,
                provider: "aws-s3",
              },
            });

            console.log(`✅ Ajouté : ${fileUrl}`);
          }
        }

        console.log("✅ Synchronisation terminée !");
      } catch (error) {
        console.error("❌ Erreur lors de la synchronisation :", error);
      }
    },
    options: {
      rule: "0 0 * * *", // Exécute le cron tous les jours à minuit
    },
  },
};
