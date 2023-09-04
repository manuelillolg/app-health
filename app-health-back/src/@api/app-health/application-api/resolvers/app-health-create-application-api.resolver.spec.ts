/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationApiHandler, AppHealthCreateApplicationApiResolver } from '@api/app-health/application-api';
import { AppHealthCreateApplicationApiInput } from '@api/graphql';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApiResolver', () =>
{
    let resolver: AppHealthCreateApplicationApiResolver;
    let handler: AppHealthCreateApplicationApiHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationApiResolver,
                {
                    provide : AppHealthCreateApplicationApiHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationApiResolver>(AppHealthCreateApplicationApiResolver);
        handler = module.get<AppHealthCreateApplicationApiHandler>(AppHealthCreateApplicationApiHandler);
    });

    test('AppHealthCreateApplicationApiResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApiResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationApi created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationApiInput>appHealthMockApplicationApiData[0])).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
