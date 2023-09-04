import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationIntegrationsQueryHandler } from './app-health-paginate-application-integrations.query-handler';
import { AppHealthMockApplicationIntegrationRepository } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.repository';
import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration/domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegrationMapper } from '@app/app-health/application-integration/domain/app-health-application-integration.mapper';
import { AppHealthPaginateApplicationIntegrationsQuery } from './app-health-paginate-application-integrations.query';
import { AppHealthPaginateApplicationIntegrationsService } from './app-health-paginate-application-integrations.service';

describe('AppHealthPaginateApplicationIntegrationsQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationIntegrationsQueryHandler;
    let service: AppHealthPaginateApplicationIntegrationsService;
    let repository: AppHealthMockApplicationIntegrationRepository;
    let mapper: AppHealthApplicationIntegrationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationIntegrationsQueryHandler,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useClass: AppHealthMockApplicationIntegrationRepository,
                },
                {
                    provide : AppHealthPaginateApplicationIntegrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationIntegrationsQueryHandler>(AppHealthPaginateApplicationIntegrationsQueryHandler);
        service = module.get<AppHealthPaginateApplicationIntegrationsService>(AppHealthPaginateApplicationIntegrationsService);
        repository = <AppHealthMockApplicationIntegrationRepository>module.get<AppHealthIApplicationIntegrationRepository>(AppHealthIApplicationIntegrationRepository);
        mapper = new AppHealthApplicationIntegrationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationIntegrationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationIntegrations paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationIntegrationsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
