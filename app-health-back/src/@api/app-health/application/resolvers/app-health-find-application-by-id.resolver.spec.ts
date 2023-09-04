/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationByIdHandler, AppHealthFindApplicationByIdResolver } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationByIdResolver', () =>
{
    let resolver: AppHealthFindApplicationByIdResolver;
    let handler: AppHealthFindApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationByIdResolver,
                {
                    provide : AppHealthFindApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationByIdResolver>(AppHealthFindApplicationByIdResolver);
        handler = module.get<AppHealthFindApplicationByIdHandler>(AppHealthFindApplicationByIdHandler);
    });

    test('AppHealthFindApplicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await resolver.main(appHealthMockApplicationData[0].id)).toBe(appHealthMockApplicationData[0]);
        });
    });
});
