/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateAuthenticationInterfaceHandler, AppHealthCreateAuthenticationInterfaceResolver } from '@api/app-health/authentication-interface';
import { AppHealthCreateAuthenticationInterfaceInput } from '@api/graphql';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfaceResolver', () =>
{
    let resolver: AppHealthCreateAuthenticationInterfaceResolver;
    let handler: AppHealthCreateAuthenticationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateAuthenticationInterfaceResolver,
                {
                    provide : AppHealthCreateAuthenticationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateAuthenticationInterfaceResolver>(AppHealthCreateAuthenticationInterfaceResolver);
        handler = module.get<AppHealthCreateAuthenticationInterfaceHandler>(AppHealthCreateAuthenticationInterfaceHandler);
    });

    test('AppHealthCreateAuthenticationInterfaceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfaceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authenticationInterface created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await resolver.main(<AppHealthCreateAuthenticationInterfaceInput>appHealthMockAuthenticationInterfaceData[0])).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
