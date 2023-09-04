/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApiInterfaceTypeByIdHandler, AppHealthFindApiInterfaceTypeByIdResolver } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApiInterfaceTypeByIdResolver', () =>
{
    let resolver: AppHealthFindApiInterfaceTypeByIdResolver;
    let handler: AppHealthFindApiInterfaceTypeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApiInterfaceTypeByIdResolver,
                {
                    provide : AppHealthFindApiInterfaceTypeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApiInterfaceTypeByIdResolver>(AppHealthFindApiInterfaceTypeByIdResolver);
        handler = module.get<AppHealthFindApiInterfaceTypeByIdHandler>(AppHealthFindApiInterfaceTypeByIdHandler);
    });

    test('AppHealthFindApiInterfaceTypeByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an apiInterfaceType by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await resolver.main(appHealthMockApiInterfaceTypeData[0].id)).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
