/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationLanguageByIdHandler, AppHealthUpdateApplicationLanguageByIdResolver } from '@api/app-health/application-language';
import { AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationLanguageByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationLanguageByIdResolver;
    let handler: AppHealthUpdateApplicationLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationLanguageByIdResolver,
                {
                    provide : AppHealthUpdateApplicationLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationLanguageByIdResolver>(AppHealthUpdateApplicationLanguageByIdResolver);
        handler = module.get<AppHealthUpdateApplicationLanguageByIdHandler>(AppHealthUpdateApplicationLanguageByIdHandler);
    });

    test('AppHealthUpdateApplicationLanguageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationLanguageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationLanguage by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationLanguageByIdInput>appHealthMockApplicationLanguageData[0])).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
