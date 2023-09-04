/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthenticationInterfaceByIdHandler, AppHealthFindAuthenticationInterfaceByIdResolver } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthenticationInterfaceByIdResolver', () =>
{
    let resolver: AppHealthFindAuthenticationInterfaceByIdResolver;
    let handler: AppHealthFindAuthenticationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthenticationInterfaceByIdResolver,
                {
                    provide : AppHealthFindAuthenticationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindAuthenticationInterfaceByIdResolver>(AppHealthFindAuthenticationInterfaceByIdResolver);
        handler = module.get<AppHealthFindAuthenticationInterfaceByIdHandler>(AppHealthFindAuthenticationInterfaceByIdHandler);
    });

    test('AppHealthFindAuthenticationInterfaceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authenticationInterface by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await resolver.main(appHealthMockAuthenticationInterfaceData[0].id)).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
