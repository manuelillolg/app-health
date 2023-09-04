/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindDatabaseByIdHandler, AppHealthFindDatabaseByIdResolver } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindDatabaseByIdResolver', () =>
{
    let resolver: AppHealthFindDatabaseByIdResolver;
    let handler: AppHealthFindDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindDatabaseByIdResolver,
                {
                    provide : AppHealthFindDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindDatabaseByIdResolver>(AppHealthFindDatabaseByIdResolver);
        handler = module.get<AppHealthFindDatabaseByIdHandler>(AppHealthFindDatabaseByIdHandler);
    });

    test('AppHealthFindDatabaseByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an database by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main(appHealthMockDatabaseData[0].id)).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
