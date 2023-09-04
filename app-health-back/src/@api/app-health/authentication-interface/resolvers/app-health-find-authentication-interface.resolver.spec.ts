/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthenticationInterfaceHandler, AppHealthFindAuthenticationInterfaceResolver } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthenticationInterfaceResolver', () =>
{
    let resolver: AppHealthFindAuthenticationInterfaceResolver;
    let handler: AppHealthFindAuthenticationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthenticationInterfaceResolver,
                {
                    provide : AppHealthFindAuthenticationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindAuthenticationInterfaceResolver>(AppHealthFindAuthenticationInterfaceResolver);
        handler = module.get<AppHealthFindAuthenticationInterfaceHandler>(AppHealthFindAuthenticationInterfaceHandler);
    });

    test('AppHealthFindAuthenticationInterfaceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authenticationInterface', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await resolver.main()).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
