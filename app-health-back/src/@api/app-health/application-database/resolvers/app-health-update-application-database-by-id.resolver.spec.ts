/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationDatabaseByIdHandler, AppHealthUpdateApplicationDatabaseByIdResolver } from '@api/app-health/application-database';
import { AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationDatabaseByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationDatabaseByIdResolver;
    let handler: AppHealthUpdateApplicationDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationDatabaseByIdResolver,
                {
                    provide : AppHealthUpdateApplicationDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationDatabaseByIdResolver>(AppHealthUpdateApplicationDatabaseByIdResolver);
        handler = module.get<AppHealthUpdateApplicationDatabaseByIdHandler>(AppHealthUpdateApplicationDatabaseByIdHandler);
    });

    test('AppHealthUpdateApplicationDatabaseByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationDatabaseByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationDatabase by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationDatabaseByIdInput>appHealthMockApplicationDatabaseData[0])).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
