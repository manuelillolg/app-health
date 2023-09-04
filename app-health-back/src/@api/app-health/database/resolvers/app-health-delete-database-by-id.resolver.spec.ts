/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteDatabaseByIdHandler, AppHealthDeleteDatabaseByIdResolver } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteDatabaseByIdResolver', () =>
{
    let resolver: AppHealthDeleteDatabaseByIdResolver;
    let handler: AppHealthDeleteDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteDatabaseByIdResolver,
                {
                    provide : AppHealthDeleteDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteDatabaseByIdResolver>(AppHealthDeleteDatabaseByIdResolver);
        handler = module.get<AppHealthDeleteDatabaseByIdHandler>(AppHealthDeleteDatabaseByIdHandler);
    });

    test('AppHealthDeleteDatabaseByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabaseByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an database deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await resolver.main(appHealthMockDatabaseData[0].id)).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
