/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationLanguageByIdHandler, AppHealthDeleteApplicationLanguageByIdResolver } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationLanguageByIdResolver', () =>
{
    let resolver: AppHealthDeleteApplicationLanguageByIdResolver;
    let handler: AppHealthDeleteApplicationLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationLanguageByIdResolver,
                {
                    provide : AppHealthDeleteApplicationLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationLanguageByIdResolver>(AppHealthDeleteApplicationLanguageByIdResolver);
        handler = module.get<AppHealthDeleteApplicationLanguageByIdHandler>(AppHealthDeleteApplicationLanguageByIdHandler);
    });

    test('AppHealthDeleteApplicationLanguageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationLanguage deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await resolver.main(appHealthMockApplicationLanguageData[0].id)).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
