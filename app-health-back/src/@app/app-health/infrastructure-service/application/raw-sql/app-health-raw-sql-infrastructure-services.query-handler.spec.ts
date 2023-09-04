import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.repository';
import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureServiceMapper } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.mapper';
import { AppHealthRawSQLInfrastructureServicesQueryHandler } from './app-health-raw-sql-infrastructure-services.query-handler';
import { AppHealthRawSQLInfrastructureServicesQuery } from './app-health-raw-sql-infrastructure-services.query';
import { AppHealthRawSQLInfrastructureServicesService } from './app-health-raw-sql-infrastructure-services.service';

describe('RawSQLInfrastructureServicesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLInfrastructureServicesQueryHandler;
    let service: AppHealthRawSQLInfrastructureServicesService;
    let repository: AppHealthMockInfrastructureServiceRepository;
    let mapper: AppHealthInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLInfrastructureServicesQueryHandler,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useClass: AppHealthMockInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthRawSQLInfrastructureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLInfrastructureServicesQueryHandler>(AppHealthRawSQLInfrastructureServicesQueryHandler);
        service = module.get<AppHealthRawSQLInfrastructureServicesService>(AppHealthRawSQLInfrastructureServicesService);
        repository = <AppHealthMockInfrastructureServiceRepository>module.get<AppHealthIInfrastructureServiceRepository>(AppHealthIInfrastructureServiceRepository);
        mapper = new AppHealthInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLInfrastructureServicesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureServices founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLInfrastructureServicesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
