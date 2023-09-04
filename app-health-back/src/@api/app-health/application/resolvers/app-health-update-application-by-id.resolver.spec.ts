/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationByIdHandler, AppHealthUpdateApplicationByIdResolver } from '@api/app-health/application';
import { AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationByIdResolver;
    let handler: AppHealthUpdateApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationByIdResolver,
                {
                    provide : AppHealthUpdateApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationByIdResolver>(AppHealthUpdateApplicationByIdResolver);
        handler = module.get<AppHealthUpdateApplicationByIdHandler>(AppHealthUpdateApplicationByIdHandler);
    });

    test('AppHealthUpdateApplicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationByIdInput>appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
