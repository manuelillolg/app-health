/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetAuthenticationInterfacesHandler, AppHealthGetAuthenticationInterfacesResolver } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetAuthenticationInterfacesResolver', () =>
{
    let resolver: AppHealthGetAuthenticationInterfacesResolver;
    let handler: AppHealthGetAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetAuthenticationInterfacesResolver,
                {
                    provide : AppHealthGetAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetAuthenticationInterfacesResolver>(AppHealthGetAuthenticationInterfacesResolver);
        handler = module.get<AppHealthGetAuthenticationInterfacesHandler>(AppHealthGetAuthenticationInterfacesHandler);
    });

    test('AppHealthGetAuthenticationInterfacesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetAuthenticationInterfacesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockAuthenticationInterfaceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData)));
            expect(await resolver.main()).toBe(appHealthMockAuthenticationInterfaceData);
        });
    });
});
