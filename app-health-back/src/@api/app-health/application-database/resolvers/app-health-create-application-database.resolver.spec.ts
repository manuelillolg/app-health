/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationDatabaseHandler, AppHealthCreateApplicationDatabaseResolver } from '@api/app-health/application-database';
import { AppHealthCreateApplicationDatabaseInput } from '@api/graphql';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationDatabaseResolver', () =>
{
    let resolver: AppHealthCreateApplicationDatabaseResolver;
    let handler: AppHealthCreateApplicationDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationDatabaseResolver,
                {
                    provide : AppHealthCreateApplicationDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationDatabaseResolver>(AppHealthCreateApplicationDatabaseResolver);
        handler = module.get<AppHealthCreateApplicationDatabaseHandler>(AppHealthCreateApplicationDatabaseHandler);
    });

    test('AppHealthCreateApplicationDatabaseResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabaseResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationDatabase created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationDatabaseInput>appHealthMockApplicationDatabaseData[0])).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
