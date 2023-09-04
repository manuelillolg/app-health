/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteLanguageByIdHandler, AppHealthDeleteLanguageByIdResolver } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteLanguageByIdResolver', () =>
{
    let resolver: AppHealthDeleteLanguageByIdResolver;
    let handler: AppHealthDeleteLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteLanguageByIdResolver,
                {
                    provide : AppHealthDeleteLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteLanguageByIdResolver>(AppHealthDeleteLanguageByIdResolver);
        handler = module.get<AppHealthDeleteLanguageByIdHandler>(AppHealthDeleteLanguageByIdHandler);
    });

    test('AppHealthDeleteLanguageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an language deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await resolver.main(appHealthMockLanguageData[0].id)).toBe(appHealthMockLanguageData[0]);
        });
    });
});
