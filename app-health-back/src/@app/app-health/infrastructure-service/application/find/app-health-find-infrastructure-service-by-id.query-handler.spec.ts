import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindInfrastructureServiceByIdQueryHandler } from './app-health-find-infrastructure-service-by-id.query-handler';
import { AppHealthMockInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.repository';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureServiceMapper } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.mapper';
import { AppHealthFindInfrastructureServiceByIdQuery } from './app-health-find-infrastructure-service-by-id.query';
import { AppHealthFindInfrastructureServiceByIdService } from './app-health-find-infrastructure-service-by-id.service';

describe('AppHealthFindInfrastructureServiceByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindInfrastructureServiceByIdQueryHandler;
    let service: AppHealthFindInfrastructureServiceByIdService;
    let repository: AppHealthMockInfrastructureServiceRepository;
    let mapper: AppHealthInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindInfrastructureServiceByIdQueryHandler,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useClass: AppHealthMockInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthFindInfrastructureServiceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindInfrastructureServiceByIdQueryHandler>(AppHealthFindInfrastructureServiceByIdQueryHandler);
        service = module.get<AppHealthFindInfrastructureServiceByIdService>(AppHealthFindInfrastructureServiceByIdService);
        repository = <AppHealthMockInfrastructureServiceRepository>module.get<AppHealthIInfrastructureServiceRepository>(AppHealthIInfrastructureServiceRepository);
        mapper = new AppHealthInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('FindInfrastructureServiceByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureService founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindInfrastructureServiceByIdQuery(
                    appHealthMockInfrastructureServiceData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
