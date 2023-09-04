import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationIntegrationRepository } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.repository';
import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration/domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegrationMapper } from '@app/app-health/application-integration/domain/app-health-application-integration.mapper';
import { AppHealthRawSQLApplicationIntegrationsQueryHandler } from './app-health-raw-sql-application-integrations.query-handler';
import { AppHealthRawSQLApplicationIntegrationsQuery } from './app-health-raw-sql-application-integrations.query';
import { AppHealthRawSQLApplicationIntegrationsService } from './app-health-raw-sql-application-integrations.service';

describe('RawSQLApplicationIntegrationsQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationIntegrationsQueryHandler;
    let service: AppHealthRawSQLApplicationIntegrationsService;
    let repository: AppHealthMockApplicationIntegrationRepository;
    let mapper: AppHealthApplicationIntegrationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationIntegrationsQueryHandler,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useClass: AppHealthMockApplicationIntegrationRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationIntegrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationIntegrationsQueryHandler>(AppHealthRawSQLApplicationIntegrationsQueryHandler);
        service = module.get<AppHealthRawSQLApplicationIntegrationsService>(AppHealthRawSQLApplicationIntegrationsService);
        repository = <AppHealthMockApplicationIntegrationRepository>module.get<AppHealthIApplicationIntegrationRepository>(AppHealthIApplicationIntegrationRepository);
        mapper = new AppHealthApplicationIntegrationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationIntegrationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationIntegrations founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationIntegrationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
