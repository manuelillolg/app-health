/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthorizationInterfaceByIdHandler, AppHealthUpdateAuthorizationInterfaceByIdResolver } from '@api/app-health/authorization-interface';
import { AppHealthUpdateAuthorizationInterfaceByIdInput } from '@api/graphql';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthorizationInterfaceByIdResolver', () =>
{
    let resolver: AppHealthUpdateAuthorizationInterfaceByIdResolver;
    let handler: AppHealthUpdateAuthorizationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthorizationInterfaceByIdResolver,
                {
                    provide : AppHealthUpdateAuthorizationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateAuthorizationInterfaceByIdResolver>(AppHealthUpdateAuthorizationInterfaceByIdResolver);
        handler = module.get<AppHealthUpdateAuthorizationInterfaceByIdHandler>(AppHealthUpdateAuthorizationInterfaceByIdHandler);
    });

    test('AppHealthUpdateAuthorizationInterfaceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfaceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authorizationInterface by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await resolver.main(<AppHealthUpdateAuthorizationInterfaceByIdInput>appHealthMockAuthorizationInterfaceData[0])).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
