/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationsHandler, AppHealthDeleteApplicationsResolver } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationsResolver', () =>
{
    let resolver: AppHealthDeleteApplicationsResolver;
    let handler: AppHealthDeleteApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationsResolver,
                {
                    provide : AppHealthDeleteApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationsResolver>(AppHealthDeleteApplicationsResolver);
        handler = module.get<AppHealthDeleteApplicationsHandler>(AppHealthDeleteApplicationsHandler);
    });

    test('AppHealthDeleteApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockApplicationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationData);
        });
    });
});
