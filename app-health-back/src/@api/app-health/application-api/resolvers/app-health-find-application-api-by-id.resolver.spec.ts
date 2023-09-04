/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationApiByIdHandler, AppHealthFindApplicationApiByIdResolver } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationApiByIdResolver', () =>
{
    let resolver: AppHealthFindApplicationApiByIdResolver;
    let handler: AppHealthFindApplicationApiByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationApiByIdResolver,
                {
                    provide : AppHealthFindApplicationApiByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationApiByIdResolver>(AppHealthFindApplicationApiByIdResolver);
        handler = module.get<AppHealthFindApplicationApiByIdHandler>(AppHealthFindApplicationApiByIdHandler);
    });

    test('AppHealthFindApplicationApiByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationApiByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationApi by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await resolver.main(appHealthMockApplicationApiData[0].id)).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
