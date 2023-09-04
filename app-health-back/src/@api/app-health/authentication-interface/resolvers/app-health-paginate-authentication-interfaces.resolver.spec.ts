/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateAuthenticationInterfacesHandler, AppHealthPaginateAuthenticationInterfacesResolver } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateAuthenticationInterfacesResolver', () =>
{
    let resolver: AppHealthPaginateAuthenticationInterfacesResolver;
    let handler: AppHealthPaginateAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateAuthenticationInterfacesResolver,
                {
                    provide : AppHealthPaginateAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateAuthenticationInterfacesResolver>(AppHealthPaginateAuthenticationInterfacesResolver);
        handler = module.get<AppHealthPaginateAuthenticationInterfacesHandler>(AppHealthPaginateAuthenticationInterfacesHandler);
    });

    test('AppHealthPaginateAuthenticationInterfacesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthenticationInterfacesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockAuthenticationInterfaceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockAuthenticationInterfaceData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockAuthenticationInterfaceData,
            });
        });
    });
});
