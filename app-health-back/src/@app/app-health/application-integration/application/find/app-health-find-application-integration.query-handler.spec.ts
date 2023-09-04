import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationIntegrationQueryHandler } from './app-health-find-application-integration.query-handler';
import { AppHealthMockApplicationIntegrationRepository } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.repository';
import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration/domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegrationMapper } from '@app/app-health/application-integration/domain/app-health-application-integration.mapper';
import { AppHealthFindApplicationIntegrationQuery } from './app-health-find-application-integration.query';
import { AppHealthFindApplicationIntegrationService } from './app-health-find-application-integration.service';

describe('AppHealthFindApplicationIntegrationQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationIntegrationQueryHandler;
    let service: AppHealthFindApplicationIntegrationService;
    let repository: AppHealthMockApplicationIntegrationRepository;
    let mapper: AppHealthApplicationIntegrationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationIntegrationQueryHandler,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useClass: AppHealthMockApplicationIntegrationRepository,
                },
                {
                    provide : AppHealthFindApplicationIntegrationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationIntegrationQueryHandler>(AppHealthFindApplicationIntegrationQueryHandler);
        service = module.get<AppHealthFindApplicationIntegrationService>(AppHealthFindApplicationIntegrationService);
        repository = <AppHealthMockApplicationIntegrationRepository>module.get<AppHealthIApplicationIntegrationRepository>(AppHealthIApplicationIntegrationRepository);
        mapper = new AppHealthApplicationIntegrationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationIntegrationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationIntegration founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationIntegrationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
