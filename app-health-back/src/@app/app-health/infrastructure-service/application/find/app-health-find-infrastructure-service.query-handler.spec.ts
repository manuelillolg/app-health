import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindInfrastructureServiceQueryHandler } from './app-health-find-infrastructure-service.query-handler';
import { AppHealthMockInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.repository';
import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureServiceMapper } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.mapper';
import { AppHealthFindInfrastructureServiceQuery } from './app-health-find-infrastructure-service.query';
import { AppHealthFindInfrastructureServiceService } from './app-health-find-infrastructure-service.service';

describe('AppHealthFindInfrastructureServiceQueryHandler', () =>
{
    let queryHandler: AppHealthFindInfrastructureServiceQueryHandler;
    let service: AppHealthFindInfrastructureServiceService;
    let repository: AppHealthMockInfrastructureServiceRepository;
    let mapper: AppHealthInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindInfrastructureServiceQueryHandler,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useClass: AppHealthMockInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthFindInfrastructureServiceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindInfrastructureServiceQueryHandler>(AppHealthFindInfrastructureServiceQueryHandler);
        service = module.get<AppHealthFindInfrastructureServiceService>(AppHealthFindInfrastructureServiceService);
        repository = <AppHealthMockInfrastructureServiceRepository>module.get<AppHealthIInfrastructureServiceRepository>(AppHealthIInfrastructureServiceRepository);
        mapper = new AppHealthInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureServiceQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureService founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindInfrastructureServiceQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
