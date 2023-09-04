/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationDatabasesHandler, AppHealthGetApplicationDatabasesResolver } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationDatabasesResolver', () =>
{
    let resolver: AppHealthGetApplicationDatabasesResolver;
    let handler: AppHealthGetApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationDatabasesResolver,
                {
                    provide : AppHealthGetApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationDatabasesResolver>(AppHealthGetApplicationDatabasesResolver);
        handler = module.get<AppHealthGetApplicationDatabasesHandler>(AppHealthGetApplicationDatabasesHandler);
    });

    test('AppHealthGetApplicationDatabasesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationDatabasesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationDatabaseData);
        });
    });
});
