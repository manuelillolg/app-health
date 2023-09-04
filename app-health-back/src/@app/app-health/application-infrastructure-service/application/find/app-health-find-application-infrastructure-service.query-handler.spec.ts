import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationInfrastructureServiceQueryHandler } from './app-health-find-application-infrastructure-service.query-handler';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.repository';
import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.mapper';
import { AppHealthFindApplicationInfrastructureServiceQuery } from './app-health-find-application-infrastructure-service.query';
import { AppHealthFindApplicationInfrastructureServiceService } from './app-health-find-application-infrastructure-service.service';

describe('AppHealthFindApplicationInfrastructureServiceQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationInfrastructureServiceQueryHandler;
    let service: AppHealthFindApplicationInfrastructureServiceService;
    let repository: AppHealthMockApplicationInfrastructureServiceRepository;
    let mapper: AppHealthApplicationInfrastructureServiceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationInfrastructureServiceQueryHandler,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useClass: AppHealthMockApplicationInfrastructureServiceRepository,
                },
                {
                    provide : AppHealthFindApplicationInfrastructureServiceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationInfrastructureServiceQueryHandler>(AppHealthFindApplicationInfrastructureServiceQueryHandler);
        service = module.get<AppHealthFindApplicationInfrastructureServiceService>(AppHealthFindApplicationInfrastructureServiceService);
        repository = <AppHealthMockApplicationInfrastructureServiceRepository>module.get<AppHealthIApplicationInfrastructureServiceRepository>(AppHealthIApplicationInfrastructureServiceRepository);
        mapper = new AppHealthApplicationInfrastructureServiceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationInfrastructureServiceQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationInfrastructureService founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationInfrastructureServiceQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
