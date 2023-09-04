/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteDatabasesHandler, AppHealthDeleteDatabasesResolver } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteDatabasesResolver', () =>
{
    let resolver: AppHealthDeleteDatabasesResolver;
    let handler: AppHealthDeleteDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteDatabasesResolver,
                {
                    provide : AppHealthDeleteDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteDatabasesResolver>(AppHealthDeleteDatabasesResolver);
        handler = module.get<AppHealthDeleteDatabasesHandler>(AppHealthDeleteDatabasesHandler);
    });

    test('AppHealthDeleteDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockDatabaseData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData)));
            expect(await resolver.main()).toBe(appHealthMockDatabaseData);
        });
    });
});
