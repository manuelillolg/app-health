import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationInfrastuctureServicesQueryHandler } from './app-health-paginate-application-infrastucture-services.query-handler';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.repository';
import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.mapper';
import { AppHealthPaginateApplicationInfrastuctureServicesQuery } from './app-health-paginate-application-infrastucture-services.query';
import { AppHealthPaginateApplicationInfrastuctureServicesService } from './app-health-paginate-application-infrastucture-services.service';

describe('AppHealthPaginateApplicationInfrastuctureServicesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationInfrastuctureServicesQueryHandler;
    let service: AppHealthPaginateApplicationInfrastuctureServicesService;
    let repository: AppHealthMockApplicationInfrastructureServiceRepository;
    let mapper: AppHealthApplicationInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationInfrastuctureServicesQueryHandler,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useClass: AppHealthMockApplicationInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthPaginateApplicationInfrastuctureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationInfrastuctureServicesQueryHandler>(AppHealthPaginateApplicationInfrastuctureServicesQueryHandler);
        service = module.get<AppHealthPaginateApplicationInfrastuctureServicesService>(AppHealthPaginateApplicationInfrastuctureServicesService);
        repository = <AppHealthMockApplicationInfrastructureServiceRepository>module.get<AppHealthIApplicationInfrastructureServiceRepository>(AppHealthIApplicationInfrastructureServiceRepository);
        mapper = new AppHealthApplicationInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationInfrastuctureServicesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationInfrastuctureServices paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationInfrastuctureServicesQuery(
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
