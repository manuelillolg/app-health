/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthorizationInterfaceByIdHandler, AppHealthFindAuthorizationInterfaceByIdResolver } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthorizationInterfaceByIdResolver', () =>
{
    let resolver: AppHealthFindAuthorizationInterfaceByIdResolver;
    let handler: AppHealthFindAuthorizationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthorizationInterfaceByIdResolver,
                {
                    provide : AppHealthFindAuthorizationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindAuthorizationInterfaceByIdResolver>(AppHealthFindAuthorizationInterfaceByIdResolver);
        handler = module.get<AppHealthFindAuthorizationInterfaceByIdHandler>(AppHealthFindAuthorizationInterfaceByIdHandler);
    });

    test('AppHealthFindAuthorizationInterfaceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authorizationInterface by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await resolver.main(appHealthMockAuthorizationInterfaceData[0].id)).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
