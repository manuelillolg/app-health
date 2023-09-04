/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationsHandler, AppHealthUpdateApplicationsResolver } from '@api/app-health/application';
import { AppHealthUpdateApplicationsInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationsResolver', () =>
{
    let resolver: AppHealthUpdateApplicationsResolver;
    let handler: AppHealthUpdateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationsResolver,
                {
                    provide : AppHealthUpdateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationsResolver>(AppHealthUpdateApplicationsResolver);
        handler = module.get<AppHealthUpdateApplicationsHandler>(AppHealthUpdateApplicationsHandler);
    });

    test('AppHealthUpdateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationsInput>appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
