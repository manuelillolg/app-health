/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthorizationInterfacesHandler, AppHealthUpdateAuthorizationInterfacesResolver } from '@api/app-health/authorization-interface';
import { AppHealthUpdateAuthorizationInterfacesInput } from '@api/graphql';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthorizationInterfacesResolver', () =>
{
    let resolver: AppHealthUpdateAuthorizationInterfacesResolver;
    let handler: AppHealthUpdateAuthorizationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthorizationInterfacesResolver,
                {
                    provide : AppHealthUpdateAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateAuthorizationInterfacesResolver>(AppHealthUpdateAuthorizationInterfacesResolver);
        handler = module.get<AppHealthUpdateAuthorizationInterfacesHandler>(AppHealthUpdateAuthorizationInterfacesHandler);
    });

    test('AppHealthUpdateAuthorizationInterfacesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfacesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authorizationInterfaces updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await resolver.main(<AppHealthUpdateAuthorizationInterfacesInput>appHealthMockAuthorizationInterfaceData[0])).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
