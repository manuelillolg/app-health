/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationViewsHandler, AppHealthDeleteApplicationViewsResolver } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationViewsResolver', () =>
{
    let resolver: AppHealthDeleteApplicationViewsResolver;
    let handler: AppHealthDeleteApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationViewsResolver,
                {
                    provide : AppHealthDeleteApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationViewsResolver>(AppHealthDeleteApplicationViewsResolver);
        handler = module.get<AppHealthDeleteApplicationViewsHandler>(AppHealthDeleteApplicationViewsHandler);
    });

    test('AppHealthDeleteApplicationViewsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockApplicationViewData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationViewData);
        });
    });
});
