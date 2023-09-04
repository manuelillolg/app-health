/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationDatabaseHandler, AppHealthUpsertApplicationDatabaseResolver } from '@api/app-health/application-database';
import { AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationDatabaseResolver', () =>
{
    let resolver: AppHealthUpsertApplicationDatabaseResolver;
    let handler: AppHealthUpsertApplicationDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationDatabaseResolver,
                {
                    provide : AppHealthUpsertApplicationDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationDatabaseResolver>(AppHealthUpsertApplicationDatabaseResolver);
        handler = module.get<AppHealthUpsertApplicationDatabaseHandler>(AppHealthUpsertApplicationDatabaseHandler);
    });

    test('AppHealthUpsertApplicationDatabaseResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationDatabaseResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationDatabase upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationDatabaseByIdInput>appHealthMockApplicationDatabaseData[0])).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
