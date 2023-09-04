/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationViewByIdHandler, AppHealthUpdateApplicationViewByIdResolver } from '@api/app-health/application-view';
import { AppHealthUpdateApplicationViewByIdInput } from '@api/graphql';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationViewByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationViewByIdResolver;
    let handler: AppHealthUpdateApplicationViewByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationViewByIdResolver,
                {
                    provide : AppHealthUpdateApplicationViewByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationViewByIdResolver>(AppHealthUpdateApplicationViewByIdResolver);
        handler = module.get<AppHealthUpdateApplicationViewByIdHandler>(AppHealthUpdateApplicationViewByIdHandler);
    });

    test('AppHealthUpdateApplicationViewByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationViewByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationView by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationViewByIdInput>appHealthMockApplicationViewData[0])).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
