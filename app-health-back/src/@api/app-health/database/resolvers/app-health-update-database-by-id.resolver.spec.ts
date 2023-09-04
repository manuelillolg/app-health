/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateDatabaseByIdHandler, AppHealthUpdateDatabaseByIdResolver } from '@api/app-health/database';
import { AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateDatabaseByIdResolver', () =>
{
    let resolver: AppHealthUpdateDatabaseByIdResolver;
    let handler: AppHealthUpdateDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateDatabaseByIdResolver,
                {
                    provide : AppHealthUpdateDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateDatabaseByIdResolver>(AppHealthUpdateDatabaseByIdResolver);
        handler = module.get<AppHealthUpdateDatabaseByIdHandler>(AppHealthUpdateDatabaseByIdHandler);
    });

    test('AppHealthUpdateDatabaseByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateDatabaseByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a database by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main(<AppHealthUpdateDatabaseByIdInput>appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
