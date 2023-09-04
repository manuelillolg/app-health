import { AppHealthCreateDatabasesHandler, AppHealthCreateDatabasesResolver } from '@api/app-health/database';
import { AppHealthCreateDatabaseInput } from '@api/graphql';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateDatabasesResolver', () =>
{
    let resolver: AppHealthCreateDatabasesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateDatabasesResolver,
                {
                    provide : AppHealthCreateDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateDatabasesResolver>(AppHealthCreateDatabasesResolver);
    });

    test('AppHealthCreateDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an databases created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateDatabaseInput[]>appHealthMockDatabaseData)).toBe(undefined);
        });
    });
});
