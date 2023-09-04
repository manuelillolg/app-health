/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteAuthenticationInterfacesHandler, AppHealthDeleteAuthenticationInterfacesResolver } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthenticationInterfacesResolver', () =>
{
    let resolver: AppHealthDeleteAuthenticationInterfacesResolver;
    let handler: AppHealthDeleteAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteAuthenticationInterfacesResolver,
                {
                    provide : AppHealthDeleteAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteAuthenticationInterfacesResolver>(AppHealthDeleteAuthenticationInterfacesResolver);
        handler = module.get<AppHealthDeleteAuthenticationInterfacesHandler>(AppHealthDeleteAuthenticationInterfacesHandler);
    });

    test('AppHealthDeleteAuthenticationInterfacesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfacesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockAuthenticationInterfaceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData)));
            expect(await resolver.main()).toBe(appHealthMockAuthenticationInterfaceData);
        });
    });
});
