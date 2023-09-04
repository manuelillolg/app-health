/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertAuthenticationInterfaceHandler, AppHealthUpsertAuthenticationInterfaceResolver } from '@api/app-health/authentication-interface';
import { AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertAuthenticationInterfaceResolver', () =>
{
    let resolver: AppHealthUpsertAuthenticationInterfaceResolver;
    let handler: AppHealthUpsertAuthenticationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertAuthenticationInterfaceResolver,
                {
                    provide : AppHealthUpsertAuthenticationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertAuthenticationInterfaceResolver>(AppHealthUpsertAuthenticationInterfaceResolver);
        handler = module.get<AppHealthUpsertAuthenticationInterfaceHandler>(AppHealthUpsertAuthenticationInterfaceHandler);
    });

    test('AppHealthUpsertAuthenticationInterfaceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertAuthenticationInterfaceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authenticationInterface upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await resolver.main(<AppHealthUpdateAuthenticationInterfaceByIdInput>appHealthMockAuthenticationInterfaceData[0])).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
