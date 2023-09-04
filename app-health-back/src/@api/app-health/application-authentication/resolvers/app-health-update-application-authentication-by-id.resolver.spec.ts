/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationAuthenticationByIdHandler, AppHealthUpdateApplicationAuthenticationByIdResolver } from '@api/app-health/application-authentication';
import { AppHealthUpdateApplicationAuthenticationByIdInput } from '@api/graphql';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthenticationByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationAuthenticationByIdResolver;
    let handler: AppHealthUpdateApplicationAuthenticationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationAuthenticationByIdResolver,
                {
                    provide : AppHealthUpdateApplicationAuthenticationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationAuthenticationByIdResolver>(AppHealthUpdateApplicationAuthenticationByIdResolver);
        handler = module.get<AppHealthUpdateApplicationAuthenticationByIdHandler>(AppHealthUpdateApplicationAuthenticationByIdHandler);
    });

    test('AppHealthUpdateApplicationAuthenticationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthenticationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationAuthentication by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationAuthenticationByIdInput>appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
