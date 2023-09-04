/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApiInterfaceTypeHandler, AppHealthUpsertApiInterfaceTypeResolver } from '@api/app-health/api-interface-type';
import { AppHealthUpdateApiInterfaceTypeByIdInput } from '@api/graphql';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApiInterfaceTypeResolver', () =>
{
    let resolver: AppHealthUpsertApiInterfaceTypeResolver;
    let handler: AppHealthUpsertApiInterfaceTypeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApiInterfaceTypeResolver,
                {
                    provide : AppHealthUpsertApiInterfaceTypeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApiInterfaceTypeResolver>(AppHealthUpsertApiInterfaceTypeResolver);
        handler = module.get<AppHealthUpsertApiInterfaceTypeHandler>(AppHealthUpsertApiInterfaceTypeHandler);
    });

    test('AppHealthUpsertApiInterfaceTypeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApiInterfaceTypeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an apiInterfaceType upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await resolver.main(<AppHealthUpdateApiInterfaceTypeByIdInput>appHealthMockApiInterfaceTypeData[0])).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
