import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationIntegrationByIdQueryHandler } from './app-health-find-application-integration-by-id.query-handler';
import { AppHealthMockApplicationIntegrationRepository } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.repository';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration/domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegrationMapper } from '@app/app-health/application-integration/domain/app-health-application-integration.mapper';
import { AppHealthFindApplicationIntegrationByIdQuery } from './app-health-find-application-integration-by-id.query';
import { AppHealthFindApplicationIntegrationByIdService } from './app-health-find-application-integration-by-id.service';

describe('AppHealthFindApplicationIntegrationByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationIntegrationByIdQueryHandler;
    let service: AppHealthFindApplicationIntegrationByIdService;
    let repository: AppHealthMockApplicationIntegrationRepository;
    let mapper: AppHealthApplicationIntegrationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationIntegrationByIdQueryHandler,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useClass: AppHealthMockApplicationIntegrationRepository,
                },
                {
                    provide : AppHealthFindApplicationIntegrationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationIntegrationByIdQueryHandler>(AppHealthFindApplicationIntegrationByIdQueryHandler);
        service = module.get<AppHealthFindApplicationIntegrationByIdService>(AppHealthFindApplicationIntegrationByIdService);
        repository = <AppHealthMockApplicationIntegrationRepository>module.get<AppHealthIApplicationIntegrationRepository>(AppHealthIApplicationIntegrationRepository);
        mapper = new AppHealthApplicationIntegrationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationIntegrationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationIntegration founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationIntegrationByIdQuery(
                    appHealthMockApplicationIntegrationData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
