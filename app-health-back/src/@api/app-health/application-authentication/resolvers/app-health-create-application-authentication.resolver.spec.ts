/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationAuthenticationHandler, AppHealthCreateApplicationAuthenticationResolver } from '@api/app-health/application-authentication';
import { AppHealthCreateApplicationAuthenticationInput } from '@api/graphql';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationResolver', () =>
{
    let resolver: AppHealthCreateApplicationAuthenticationResolver;
    let handler: AppHealthCreateApplicationAuthenticationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationAuthenticationResolver,
                {
                    provide : AppHealthCreateApplicationAuthenticationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationAuthenticationResolver>(AppHealthCreateApplicationAuthenticationResolver);
        handler = module.get<AppHealthCreateApplicationAuthenticationHandler>(AppHealthCreateApplicationAuthenticationHandler);
    });

    test('AppHealthCreateApplicationAuthenticationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthentication created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationAuthenticationInput>appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
