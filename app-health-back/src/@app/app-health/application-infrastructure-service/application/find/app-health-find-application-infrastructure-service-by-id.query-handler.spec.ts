import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationInfrastructureServiceByIdQueryHandler } from './app-health-find-application-infrastructure-service-by-id.query-handler';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.repository';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.mapper';
import { AppHealthFindApplicationInfrastructureServiceByIdQuery } from './app-health-find-application-infrastructure-service-by-id.query';
import { AppHealthFindApplicationInfrastructureServiceByIdService } from './app-health-find-application-infrastructure-service-by-id.service';

describe('AppHealthFindApplicationInfrastructureServiceByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationInfrastructureServiceByIdQueryHandler;
    let service: AppHealthFindApplicationInfrastructureServiceByIdService;
    let repository: AppHealthMockApplicationInfrastructureServiceRepository;
    let mapper: AppHealthApplicationInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationInfrastructureServiceByIdQueryHandler,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useClass: AppHealthMockApplicationInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthFindApplicationInfrastructureServiceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationInfrastructureServiceByIdQueryHandler>(AppHealthFindApplicationInfrastructureServiceByIdQueryHandler);
        service = module.get<AppHealthFindApplicationInfrastructureServiceByIdService>(AppHealthFindApplicationInfrastructureServiceByIdService);
        repository = <AppHealthMockApplicationInfrastructureServiceRepository>module.get<AppHealthIApplicationInfrastructureServiceRepository>(AppHealthIApplicationInfrastructureServiceRepository);
        mapper = new AppHealthApplicationInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationInfrastructureServiceByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationInfrastructureService founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationInfrastructureServiceByIdQuery(
                    appHealthMockApplicationInfrastructureServiceData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
