import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationIntegrationsQueryHandler } from './app-health-get-application-integrations.query-handler';
import { AppHealthMockApplicationIntegrationRepository } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.repository';
import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration/domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegrationMapper } from '@app/app-health/application-integration/domain/app-health-application-integration.mapper';
import { AppHealthGetApplicationIntegrationsQuery } from './app-health-get-application-integrations.query';
import { AppHealthGetApplicationIntegrationsService } from './app-health-get-application-integrations.service';

describe('GetApplicationIntegrationsQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationIntegrationsQueryHandler;
    let service: AppHealthGetApplicationIntegrationsService;
    let repository: AppHealthMockApplicationIntegrationRepository;
    let mapper: AppHealthApplicationIntegrationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationIntegrationsQueryHandler,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useClass: AppHealthMockApplicationIntegrationRepository,
                },
                {
                    provide : AppHealthGetApplicationIntegrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationIntegrationsQueryHandler>(AppHealthGetApplicationIntegrationsQueryHandler);
        service = module.get<AppHealthGetApplicationIntegrationsService>(AppHealthGetApplicationIntegrationsService);
        repository = <AppHealthMockApplicationIntegrationRepository>module.get<AppHealthIApplicationIntegrationRepository>(AppHealthIApplicationIntegrationRepository);
        mapper = new AppHealthApplicationIntegrationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationIntegrationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationIntegrations founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationIntegrationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});