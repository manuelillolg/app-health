/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationHandler, AppHealthCreateApplicationResolver } from '@api/app-health/application';
import { AppHealthCreateApplicationInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationResolver', () =>
{
    let resolver: AppHealthCreateApplicationResolver;
    let handler: AppHealthCreateApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationResolver,
                {
                    provide : AppHealthCreateApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationResolver>(AppHealthCreateApplicationResolver);
        handler = module.get<AppHealthCreateApplicationHandler>(AppHealthCreateApplicationHandler);
    });

    test('AppHealthCreateApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationInput>appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
