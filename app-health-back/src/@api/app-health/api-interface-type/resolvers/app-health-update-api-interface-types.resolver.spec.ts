/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApiInterfaceTypesHandler, AppHealthUpdateApiInterfaceTypesResolver } from '@api/app-health/api-interface-type';
import { AppHealthUpdateApiInterfaceTypesInput } from '@api/graphql';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApiInterfaceTypesResolver', () =>
{
    let resolver: AppHealthUpdateApiInterfaceTypesResolver;
    let handler: AppHealthUpdateApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApiInterfaceTypesResolver,
                {
                    provide : AppHealthUpdateApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApiInterfaceTypesResolver>(AppHealthUpdateApiInterfaceTypesResolver);
        handler = module.get<AppHealthUpdateApiInterfaceTypesHandler>(AppHealthUpdateApiInterfaceTypesHandler);
    });

    test('AppHealthUpdateApiInterfaceTypesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApiInterfaceTypesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a apiInterfaceTypes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await resolver.main(<AppHealthUpdateApiInterfaceTypesInput>appHealthMockApiInterfaceTypeData[0])).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
