/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthorizationInterfaceHandler, AppHealthFindAuthorizationInterfaceResolver } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthorizationInterfaceResolver', () =>
{
    let resolver: AppHealthFindAuthorizationInterfaceResolver;
    let handler: AppHealthFindAuthorizationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthorizationInterfaceResolver,
                {
                    provide : AppHealthFindAuthorizationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindAuthorizationInterfaceResolver>(AppHealthFindAuthorizationInterfaceResolver);
        handler = module.get<AppHealthFindAuthorizationInterfaceHandler>(AppHealthFindAuthorizationInterfaceHandler);
    });

    test('AppHealthFindAuthorizationInterfaceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authorizationInterface', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await resolver.main()).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
