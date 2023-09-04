import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateInfrastructureServicesQueryHandler } from './app-health-paginate-infrastructure-services.query-handler';
import { AppHealthMockInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.repository';
import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureServiceMapper } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.mapper';
import { AppHealthPaginateInfrastructureServicesQuery } from './app-health-paginate-infrastructure-services.query';
import { AppHealthPaginateInfrastructureServicesService } from './app-health-paginate-infrastructure-services.service';

describe('AppHealthPaginateInfrastructureServicesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateInfrastructureServicesQueryHandler;
    let service: AppHealthPaginateInfrastructureServicesService;
    let repository: AppHealthMockInfrastructureServiceRepository;
    let mapper: AppHealthInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateInfrastructureServicesQueryHandler,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useClass: AppHealthMockInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthPaginateInfrastructureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateInfrastructureServicesQueryHandler>(AppHealthPaginateInfrastructureServicesQueryHandler);
        service = module.get<AppHealthPaginateInfrastructureServicesService>(AppHealthPaginateInfrastructureServicesService);
        repository = <AppHealthMockInfrastructureServiceRepository>module.get<AppHealthIInfrastructureServiceRepository>(AppHealthIInfrastructureServiceRepository);
        mapper = new AppHealthInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureServicesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureServices paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateInfrastructureServicesQuery(
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
