/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteAuthenticationInterfaceByIdHandler, AppHealthDeleteAuthenticationInterfaceByIdResolver } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthenticationInterfaceByIdResolver', () =>
{
    let resolver: AppHealthDeleteAuthenticationInterfaceByIdResolver;
    let handler: AppHealthDeleteAuthenticationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteAuthenticationInterfaceByIdResolver,
                {
                    provide : AppHealthDeleteAuthenticationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteAuthenticationInterfaceByIdResolver>(AppHealthDeleteAuthenticationInterfaceByIdResolver);
        handler = module.get<AppHealthDeleteAuthenticationInterfaceByIdHandler>(AppHealthDeleteAuthenticationInterfaceByIdHandler);
    });

    test('AppHealthDeleteAuthenticationInterfaceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfaceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authenticationInterface deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await resolver.main(appHealthMockAuthenticationInterfaceData[0].id)).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
