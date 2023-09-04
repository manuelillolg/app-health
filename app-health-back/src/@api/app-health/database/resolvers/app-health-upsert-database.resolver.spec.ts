/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertDatabaseHandler, AppHealthUpsertDatabaseResolver } from '@api/app-health/database';
import { AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertDatabaseResolver', () =>
{
    let resolver: AppHealthUpsertDatabaseResolver;
    let handler: AppHealthUpsertDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertDatabaseResolver,
                {
                    provide : AppHealthUpsertDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertDatabaseResolver>(AppHealthUpsertDatabaseResolver);
        handler = module.get<AppHealthUpsertDatabaseHandler>(AppHealthUpsertDatabaseHandler);
    });

    test('AppHealthUpsertDatabaseResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertDatabaseResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an database upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main(<AppHealthUpdateDatabaseByIdInput>appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
