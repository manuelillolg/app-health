import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetInfrastructureServicesQueryHandler } from './app-health-get-infrastructure-services.query-handler';
import { AppHealthMockInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.repository';
import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureServiceMapper } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.mapper';
import { AppHealthGetInfrastructureServicesQuery } from './app-health-get-infrastructure-services.query';
import { AppHealthGetInfrastructureServicesService } from './app-health-get-infrastructure-services.service';

describe('GetInfrastructureServicesQueryHandler', () =>
{
    let queryHandler: AppHealthGetInfrastructureServicesQueryHandler;
    let service: AppHealthGetInfrastructureServicesService;
    let repository: AppHealthMockInfrastructureServiceRepository;
    let mapper: AppHealthInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetInfrastructureServicesQueryHandler,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useClass: AppHealthMockInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthGetInfrastructureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetInfrastructureServicesQueryHandler>(AppHealthGetInfrastructureServicesQueryHandler);
        service = module.get<AppHealthGetInfrastructureServicesService>(AppHealthGetInfrastructureServicesService);
        repository = <AppHealthMockInfrastructureServiceRepository>module.get<AppHealthIInfrastructureServiceRepository>(AppHealthIInfrastructureServiceRepository);
        mapper = new AppHealthInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetInfrastructureServicesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureServices founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetInfrastructureServicesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});