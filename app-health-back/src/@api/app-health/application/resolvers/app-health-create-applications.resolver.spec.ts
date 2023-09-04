import { AppHealthCreateApplicationsHandler, AppHealthCreateApplicationsResolver } from '@api/app-health/application';
import { AppHealthCreateApplicationInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationsResolver', () =>
{
    let resolver: AppHealthCreateApplicationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationsResolver,
                {
                    provide : AppHealthCreateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationsResolver>(AppHealthCreateApplicationsResolver);
    });

    test('AppHealthCreateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationInput[]>appHealthMockApplicationData)).toBe(undefined);
        });
    });
});
