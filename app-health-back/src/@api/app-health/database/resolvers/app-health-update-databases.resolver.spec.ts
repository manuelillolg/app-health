/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateDatabasesHandler, AppHealthUpdateDatabasesResolver } from '@api/app-health/database';
import { AppHealthUpdateDatabasesInput } from '@api/graphql';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateDatabasesResolver', () =>
{
    let resolver: AppHealthUpdateDatabasesResolver;
    let handler: AppHealthUpdateDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateDatabasesResolver,
                {
                    provide : AppHealthUpdateDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateDatabasesResolver>(AppHealthUpdateDatabasesResolver);
        handler = module.get<AppHealthUpdateDatabasesHandler>(AppHealthUpdateDatabasesHandler);
    });

    test('AppHealthUpdateDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a databases updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main(<AppHealthUpdateDatabasesInput>appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
