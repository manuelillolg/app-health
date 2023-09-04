/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApiInterfaceTypesHandler, AppHealthGetApiInterfaceTypesResolver } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApiInterfaceTypesResolver', () =>
{
    let resolver: AppHealthGetApiInterfaceTypesResolver;
    let handler: AppHealthGetApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApiInterfaceTypesResolver,
                {
                    provide : AppHealthGetApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApiInterfaceTypesResolver>(AppHealthGetApiInterfaceTypesResolver);
        handler = module.get<AppHealthGetApiInterfaceTypesHandler>(AppHealthGetApiInterfaceTypesHandler);
    });

    test('AppHealthGetApiInterfaceTypesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApiInterfaceTypesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApiInterfaceTypeData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData)));
            expect(await resolver.main()).toBe(appHealthMockApiInterfaceTypeData);
        });
    });
});
