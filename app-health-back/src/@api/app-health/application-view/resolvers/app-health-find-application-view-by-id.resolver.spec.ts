/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationViewByIdHandler, AppHealthFindApplicationViewByIdResolver } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationViewByIdResolver', () =>
{
    let resolver: AppHealthFindApplicationViewByIdResolver;
    let handler: AppHealthFindApplicationViewByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationViewByIdResolver,
                {
                    provide : AppHealthFindApplicationViewByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationViewByIdResolver>(AppHealthFindApplicationViewByIdResolver);
        handler = module.get<AppHealthFindApplicationViewByIdHandler>(AppHealthFindApplicationViewByIdHandler);
    });

    test('AppHealthFindApplicationViewByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationViewByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationView by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await resolver.main(appHealthMockApplicationViewData[0].id)).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
