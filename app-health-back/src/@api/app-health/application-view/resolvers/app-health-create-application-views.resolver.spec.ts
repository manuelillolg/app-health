import { AppHealthCreateApplicationViewsHandler, AppHealthCreateApplicationViewsResolver } from '@api/app-health/application-view';
import { AppHealthCreateApplicationViewInput } from '@api/graphql';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationViewsResolver', () =>
{
    let resolver: AppHealthCreateApplicationViewsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationViewsResolver,
                {
                    provide : AppHealthCreateApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationViewsResolver>(AppHealthCreateApplicationViewsResolver);
    });

    test('AppHealthCreateApplicationViewsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationViewsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationViews created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationViewInput[]>appHealthMockApplicationViewData)).toBe(undefined);
        });
    });
});
