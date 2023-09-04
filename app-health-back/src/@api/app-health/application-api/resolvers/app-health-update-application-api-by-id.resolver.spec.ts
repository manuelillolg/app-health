/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationApiByIdHandler, AppHealthUpdateApplicationApiByIdResolver } from '@api/app-health/application-api';
import { AppHealthUpdateApplicationApiByIdInput } from '@api/graphql';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationApiByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationApiByIdResolver;
    let handler: AppHealthUpdateApplicationApiByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationApiByIdResolver,
                {
                    provide : AppHealthUpdateApplicationApiByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationApiByIdResolver>(AppHealthUpdateApplicationApiByIdResolver);
        handler = module.get<AppHealthUpdateApplicationApiByIdHandler>(AppHealthUpdateApplicationApiByIdHandler);
    });

    test('AppHealthUpdateApplicationApiByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationApiByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationApi by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationApiByIdInput>appHealthMockApplicationApiData[0])).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
