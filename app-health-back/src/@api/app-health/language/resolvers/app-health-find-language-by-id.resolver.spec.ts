/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindLanguageByIdHandler, AppHealthFindLanguageByIdResolver } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindLanguageByIdResolver', () =>
{
    let resolver: AppHealthFindLanguageByIdResolver;
    let handler: AppHealthFindLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindLanguageByIdResolver,
                {
                    provide : AppHealthFindLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindLanguageByIdResolver>(AppHealthFindLanguageByIdResolver);
        handler = module.get<AppHealthFindLanguageByIdHandler>(AppHealthFindLanguageByIdHandler);
    });

    test('AppHealthFindLanguageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an language by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await resolver.main(appHealthMockLanguageData[0].id)).toBe(appHealthMockLanguageData[0]);
        });
    });
});
