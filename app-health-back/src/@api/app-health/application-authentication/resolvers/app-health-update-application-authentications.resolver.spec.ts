/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationAuthenticationsHandler, AppHealthUpdateApplicationAuthenticationsResolver } from '@api/app-health/application-authentication';
import { AppHealthUpdateApplicationAuthenticationsInput } from '@api/graphql';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthenticationsResolver', () =>
{
    let resolver: AppHealthUpdateApplicationAuthenticationsResolver;
    let handler: AppHealthUpdateApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationAuthenticationsResolver,
                {
                    provide : AppHealthUpdateApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationAuthenticationsResolver>(AppHealthUpdateApplicationAuthenticationsResolver);
        handler = module.get<AppHealthUpdateApplicationAuthenticationsHandler>(AppHealthUpdateApplicationAuthenticationsHandler);
    });

    test('AppHealthUpdateApplicationAuthenticationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthenticationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationAuthentications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationAuthenticationsInput>appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
