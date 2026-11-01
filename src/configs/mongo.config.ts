import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => ({
	uri: getMongoConnectionString(configService),
	...getMongoOptions(),
});

const getMongoConnectionString = (configService: ConfigService): string => {
	const login = configService.get('MONGO_LOGIN');
	const password = configService.get('MONGO_PASSWORD');
	const host = configService.get('MONGO_HOST');
	const port = configService.get('MONGO_PORT');
	const authDB = configService.get('MONGO_AUTHDATABASE');
	return `mongodb://${login}:${password}@${host}:${port}/${authDB}`;
};

const getMongoOptions = (): Omit<MongooseModuleOptions, 'uri'> => ({
	// Тут при необходимости можно добавить middleware
	// См. https://docs.nestjs.com/data/mongodb
});
