/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationViewHandler, AppHealthCreateApplicationViewResolver } from '@api/app-health/application-view';
import { AppHealthCreateApplicationViewInput } from '@api/graphql';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationViewResolver', () =>
{
    let resolver: AppHealthCreateApplicationViewResolver;
    let handler: AppHealthCreateApplicationViewHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationViewResolver,
                {
                    provide : AppHealthCreateApplicationViewHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationViewResolver>(AppHealthCreateApplicationViewResolver);
        handler = module.get<AppHealthCreateApplicationViewHandler>(AppHealthCreateApplicationViewHandler);
    });

    test('AppHealthCreateApplicationViewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationViewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationView created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationViewInput>appHealthMockApplicationViewData[0])).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
