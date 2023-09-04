import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationInfrastuctureServicesQueryHandler } from './app-health-get-application-infrastucture-services.query-handler';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.repository';
import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.mapper';
import { AppHealthGetApplicationInfrastuctureServicesQuery } from './app-health-get-application-infrastucture-services.query';
import { AppHealthGetApplicationInfrastuctureServicesService } from './app-health-get-application-infrastucture-services.service';

describe('GetApplicationInfrastuctureServicesQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationInfrastuctureServicesQueryHandler;
    let service: AppHealthGetApplicationInfrastuctureServicesService;
    let repository: AppHealthMockApplicationInfrastructureServiceRepository;
    let mapper: AppHealthApplicationInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationInfrastuctureServicesQueryHandler,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useClass: AppHealthMockApplicationInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthGetApplicationInfrastuctureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationInfrastuctureServicesQueryHandler>(AppHealthGetApplicationInfrastuctureServicesQueryHandler);
        service = module.get<AppHealthGetApplicationInfrastuctureServicesService>(AppHealthGetApplicationInfrastuctureServicesService);
        repository = <AppHealthMockApplicationInfrastructureServiceRepository>module.get<AppHealthIApplicationInfrastructureServiceRepository>(AppHealthIApplicationInfrastructureServiceRepository);
        mapper = new AppHealthApplicationInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationInfrastuctureServicesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationInfrastuctureServices founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationInfrastuctureServicesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});