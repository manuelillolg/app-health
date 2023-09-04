/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationDatabaseByIdHandler, AppHealthDeleteApplicationDatabaseByIdResolver } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationDatabaseByIdResolver', () =>
{
    let resolver: AppHealthDeleteApplicationDatabaseByIdResolver;
    let handler: AppHealthDeleteApplicationDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationDatabaseByIdResolver,
                {
                    provide : AppHealthDeleteApplicationDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationDatabaseByIdResolver>(AppHealthDeleteApplicationDatabaseByIdResolver);
        handler = module.get<AppHealthDeleteApplicationDatabaseByIdHandler>(AppHealthDeleteApplicationDatabaseByIdHandler);
    });

    test('AppHealthDeleteApplicationDatabaseByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationDatabaseByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationDatabase deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await resolver.main(appHealthMockApplicationDatabaseData[0].id)).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
