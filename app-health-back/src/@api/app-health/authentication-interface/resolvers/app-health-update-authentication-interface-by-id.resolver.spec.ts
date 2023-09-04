/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthenticationInterfaceByIdHandler, AppHealthUpdateAuthenticationInterfaceByIdResolver } from '@api/app-health/authentication-interface';
import { AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthenticationInterfaceByIdResolver', () =>
{
    let resolver: AppHealthUpdateAuthenticationInterfaceByIdResolver;
    let handler: AppHealthUpdateAuthenticationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthenticationInterfaceByIdResolver,
                {
                    provide : AppHealthUpdateAuthenticationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateAuthenticationInterfaceByIdResolver>(AppHealthUpdateAuthenticationInterfaceByIdResolver);
        handler = module.get<AppHealthUpdateAuthenticationInterfaceByIdHandler>(AppHealthUpdateAuthenticationInterfaceByIdHandler);
    });

    test('AppHealthUpdateAuthenticationInterfaceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthenticationInterfaceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authenticationInterface by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await resolver.main(<AppHealthUpdateAuthenticationInterfaceByIdInput>appHealthMockAuthenticationInterfaceData[0])).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
