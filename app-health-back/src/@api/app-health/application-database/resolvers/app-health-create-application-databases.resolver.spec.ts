import { AppHealthCreateApplicationDatabasesHandler, AppHealthCreateApplicationDatabasesResolver } from '@api/app-health/application-database';
import { AppHealthCreateApplicationDatabaseInput } from '@api/graphql';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationDatabasesResolver', () =>
{
    let resolver: AppHealthCreateApplicationDatabasesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationDatabasesResolver,
                {
                    provide : AppHealthCreateApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationDatabasesResolver>(AppHealthCreateApplicationDatabasesResolver);
    });

    test('AppHealthCreateApplicationDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationDatabases created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationDatabaseInput[]>appHealthMockApplicationDatabaseData)).toBe(undefined);
        });
    });
});
