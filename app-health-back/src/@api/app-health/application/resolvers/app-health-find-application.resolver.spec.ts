/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationHandler, AppHealthFindApplicationResolver } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationResolver', () =>
{
    let resolver: AppHealthFindApplicationResolver;
    let handler: AppHealthFindApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationResolver,
                {
                    provide : AppHealthFindApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationResolver>(AppHealthFindApplicationResolver);
        handler = module.get<AppHealthFindApplicationHandler>(AppHealthFindApplicationHandler);
    });

    test('AppHealthFindApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await resolver.main()).toBe(appHealthMockApplicationData[0]);
        });
    });
});
