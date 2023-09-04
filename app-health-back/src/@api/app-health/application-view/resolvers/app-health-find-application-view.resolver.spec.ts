/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationViewHandler, AppHealthFindApplicationViewResolver } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationViewResolver', () =>
{
    let resolver: AppHealthFindApplicationViewResolver;
    let handler: AppHealthFindApplicationViewHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationViewResolver,
                {
                    provide : AppHealthFindApplicationViewHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationViewResolver>(AppHealthFindApplicationViewResolver);
        handler = module.get<AppHealthFindApplicationViewHandler>(AppHealthFindApplicationViewHandler);
    });

    test('AppHealthFindApplicationViewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationViewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationView', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await resolver.main()).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
