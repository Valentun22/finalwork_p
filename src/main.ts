import './config/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule);

		const configService = app.get(ConfigService);
		const port = configService.get<number>('PORT') || 8000;

		const config = new DocumentBuilder()
			.setTitle('Pub API')
			.setDescription('The Pub API description')
			.setVersion('1.0')
			.addBearerAuth({
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header',
			})
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerHelper.setDefaultResponses(document);

		SwaggerModule.setup('docs', app, document, {
			swaggerOptions: {
				docExpansion: 'none',
				defaultModelsExpandDepth: 1,
				persistAuthorization: true,
			},
			customSiteTitle: 'Pub API Documentation',
		});

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
				forbidNonWhitelisted: true,
			}),
		);

		await app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
			console.log(`Swagger documentation available at http://localhost:${port}/docs`);
		});
	} catch (err) {
		console.error('Error during app initialization:', err);
		process.exit(1);
	}
}

bootstrap().catch((err) => {
	console.error('Unhandled error during bootstrap:', err);
});
