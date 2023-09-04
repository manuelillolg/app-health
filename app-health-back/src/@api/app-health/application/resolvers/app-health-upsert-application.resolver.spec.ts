/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationHandler, AppHealthUpsertApplicationResolver } from '@api/app-health/application';
import { AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationResolver', () =>
{
    let resolver: AppHealthUpsertApplicationResolver;
    let handler: AppHealthUpsertApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationResolver,
                {
                    provide : AppHealthUpsertApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationResolver>(AppHealthUpsertApplicationResolver);
        handler = module.get<AppHealthUpsertApplicationHandler>(AppHealthUpsertApplicationHandler);
    });

    test('AppHealthUpsertApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationByIdInput>appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
