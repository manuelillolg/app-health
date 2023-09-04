/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationAuthenticationByIdHandler, AppHealthDeleteApplicationAuthenticationByIdResolver } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthenticationByIdResolver', () =>
{
    let resolver: AppHealthDeleteApplicationAuthenticationByIdResolver;
    let handler: AppHealthDeleteApplicationAuthenticationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationAuthenticationByIdResolver,
                {
                    provide : AppHealthDeleteApplicationAuthenticationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationAuthenticationByIdResolver>(AppHealthDeleteApplicationAuthenticationByIdResolver);
        handler = module.get<AppHealthDeleteApplicationAuthenticationByIdHandler>(AppHealthDeleteApplicationAuthenticationByIdHandler);
    });

    test('AppHealthDeleteApplicationAuthenticationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthenticationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthentication deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await resolver.main(appHealthMockApplicationAuthenticationData[0].id)).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
