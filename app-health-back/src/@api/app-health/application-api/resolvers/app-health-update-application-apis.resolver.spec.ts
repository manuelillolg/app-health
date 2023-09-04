/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationApisHandler, AppHealthUpdateApplicationApisResolver } from '@api/app-health/application-api';
import { AppHealthUpdateApplicationApisInput } from '@api/graphql';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationApisResolver', () =>
{
    let resolver: AppHealthUpdateApplicationApisResolver;
    let handler: AppHealthUpdateApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationApisResolver,
                {
                    provide : AppHealthUpdateApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationApisResolver>(AppHealthUpdateApplicationApisResolver);
        handler = module.get<AppHealthUpdateApplicationApisHandler>(AppHealthUpdateApplicationApisHandler);
    });

    test('AppHealthUpdateApplicationApisResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationApisResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationApis updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationApisInput>appHealthMockApplicationApiData[0])).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
