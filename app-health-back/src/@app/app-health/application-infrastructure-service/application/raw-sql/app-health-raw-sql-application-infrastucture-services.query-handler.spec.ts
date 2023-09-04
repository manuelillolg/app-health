import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.repository';
import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.mapper';
import { AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler } from './app-health-raw-sql-application-infrastucture-services.query-handler';
import { AppHealthRawSQLApplicationInfrastuctureServicesQuery } from './app-health-raw-sql-application-infrastucture-services.query';
import { AppHealthRawSQLApplicationInfrastuctureServicesService } from './app-health-raw-sql-application-infrastucture-services.service';

describe('RawSQLApplicationInfrastuctureServicesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler;
    let service: AppHealthRawSQLApplicationInfrastuctureServicesService;
    let repository: AppHealthMockApplicationInfrastructureServiceRepository;
    let mapper: AppHealthApplicationInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useClass: AppHealthMockApplicationInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationInfrastuctureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler>(AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler);
        service = module.get<AppHealthRawSQLApplicationInfrastuctureServicesService>(AppHealthRawSQLApplicationInfrastuctureServicesService);
        repository = <AppHealthMockApplicationInfrastructureServiceRepository>module.get<AppHealthIApplicationInfrastructureServiceRepository>(AppHealthIApplicationInfrastructureServiceRepository);
        mapper = new AppHealthApplicationInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationInfrastuctureServices founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationInfrastuctureServicesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
