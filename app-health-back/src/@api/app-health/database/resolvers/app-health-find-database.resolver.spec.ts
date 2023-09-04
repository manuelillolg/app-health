/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindDatabaseHandler, AppHealthFindDatabaseResolver } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindDatabaseResolver', () =>
{
    let resolver: AppHealthFindDatabaseResolver;
    let handler: AppHealthFindDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindDatabaseResolver,
                {
                    provide : AppHealthFindDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindDatabaseResolver>(AppHealthFindDatabaseResolver);
        handler = module.get<AppHealthFindDatabaseHandler>(AppHealthFindDatabaseHandler);
    });

    test('AppHealthFindDatabaseResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a database', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main()).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
