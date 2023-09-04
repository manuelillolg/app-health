/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationDatabasesHandler, AppHealthDeleteApplicationDatabasesResolver } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationDatabasesResolver', () =>
{
    let resolver: AppHealthDeleteApplicationDatabasesResolver;
    let handler: AppHealthDeleteApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationDatabasesResolver,
                {
                    provide : AppHealthDeleteApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationDatabasesResolver>(AppHealthDeleteApplicationDatabasesResolver);
        handler = module.get<AppHealthDeleteApplicationDatabasesHandler>(AppHealthDeleteApplicationDatabasesHandler);
    });

    test('AppHealthDeleteApplicationDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockApplicationDatabaseData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationDatabaseData);
        });
    });
});
