/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateDatabaseHandler, AppHealthCreateDatabaseResolver } from '@api/app-health/database';
import { AppHealthCreateDatabaseInput } from '@api/graphql';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateDatabaseResolver', () =>
{
    let resolver: AppHealthCreateDatabaseResolver;
    let handler: AppHealthCreateDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateDatabaseResolver,
                {
                    provide : AppHealthCreateDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateDatabaseResolver>(AppHealthCreateDatabaseResolver);
        handler = module.get<AppHealthCreateDatabaseHandler>(AppHealthCreateDatabaseHandler);
    });

    test('AppHealthCreateDatabaseResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabaseResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an database created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main(<AppHealthCreateDatabaseInput>appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
