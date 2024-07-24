export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'My API',
          version: '1.0.0',
          description: 'API Documentation',
        },
        servers: [
          {
            url: 'http://localhost:3000',
          },
        ],
    },
    apis: ['./src/controllers/*.ts'], // Путь к вашим контроллерам
};