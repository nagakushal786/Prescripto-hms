import swaggerJsDoc from 'swagger-jsdoc';
import { config } from 'dotenv';

config({path: "./env/config.env"});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Hospital Management System API',
            version: '1.0.0',
            description: 'API documentation for the Hospital Management System',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`, // Change this to your server URL
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
