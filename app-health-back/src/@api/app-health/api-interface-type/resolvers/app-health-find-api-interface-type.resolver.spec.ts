/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApiInterfaceTypeHandler, AppHealthFindApiInterfaceTypeResolver } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApiInterfaceTypeResolver', () =>
{
    let resolver: AppHealthFindApiInterfaceTypeResolver;
    let handler: AppHealthFindApiInterfaceTypeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApiInterfaceTypeResolver,
                {
                    provide : AppHealthFindApiInterfaceTypeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApiInterfaceTypeResolver>(AppHealthFindApiInterfaceTypeResolver);
        handler = module.get<AppHealthFindApiInterfaceTypeHandler>(AppHealthFindApiInterfaceTypeHandler);
    });

    test('AppHealthFindApiInterfaceTypeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a apiInterfaceType', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await resolver.main()).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
