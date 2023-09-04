/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateAuthorizationInterfaceHandler, AppHealthCreateAuthorizationInterfaceResolver } from '@api/app-health/authorization-interface';
import { AppHealthCreateAuthorizationInterfaceInput } from '@api/graphql';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthorizationInterfaceResolver', () =>
{
    let resolver: AppHealthCreateAuthorizationInterfaceResolver;
    let handler: AppHealthCreateAuthorizationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateAuthorizationInterfaceResolver,
                {
                    provide : AppHealthCreateAuthorizationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateAuthorizationInterfaceResolver>(AppHealthCreateAuthorizationInterfaceResolver);
        handler = module.get<AppHealthCreateAuthorizationInterfaceHandler>(AppHealthCreateAuthorizationInterfaceHandler);
    });

    test('AppHealthCreateAuthorizationInterfaceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfaceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authorizationInterface created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await resolver.main(<AppHealthCreateAuthorizationInterfaceInput>appHealthMockAuthorizationInterfaceData[0])).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
