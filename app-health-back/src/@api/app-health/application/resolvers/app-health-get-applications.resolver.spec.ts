/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationsHandler, AppHealthGetApplicationsResolver } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationsResolver', () =>
{
    let resolver: AppHealthGetApplicationsResolver;
    let handler: AppHealthGetApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationsResolver,
                {
                    provide : AppHealthGetApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationsResolver>(AppHealthGetApplicationsResolver);
        handler = module.get<AppHealthGetApplicationsHandler>(AppHealthGetApplicationsHandler);
    });

    test('AppHealthGetApplicationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationData);
        });
    });
});
