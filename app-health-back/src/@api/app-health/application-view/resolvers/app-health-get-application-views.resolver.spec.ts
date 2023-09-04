/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationViewsHandler, AppHealthGetApplicationViewsResolver } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationViewsResolver', () =>
{
    let resolver: AppHealthGetApplicationViewsResolver;
    let handler: AppHealthGetApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationViewsResolver,
                {
                    provide : AppHealthGetApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationViewsResolver>(AppHealthGetApplicationViewsResolver);
        handler = module.get<AppHealthGetApplicationViewsHandler>(AppHealthGetApplicationViewsHandler);
    });

    test('AppHealthGetApplicationViewsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationViewsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationViewData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationViewData);
        });
    });
});
