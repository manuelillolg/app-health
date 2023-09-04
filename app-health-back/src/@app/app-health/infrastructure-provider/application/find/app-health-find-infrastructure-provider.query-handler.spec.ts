import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindInfrastructureProviderQueryHandler } from './app-health-find-infrastructure-provider.query-handler';
import { AppHealthMockInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.repository';
import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProviderMapper } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.mapper';
import { AppHealthFindInfrastructureProviderQuery } from './app-health-find-infrastructure-provider.query';
import { AppHealthFindInfrastructureProviderService } from './app-health-find-infrastructure-provider.service';

describe('AppHealthFindInfrastructureProviderQueryHandler', () =>
{
    let queryHandler: AppHealthFindInfrastructureProviderQueryHandler;
    let service: AppHealthFindInfrastructureProviderService;
    let repository: AppHealthMockInfrastructureProviderRepository;
    let mapper: AppHealthInfrastructureProviderMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindInfrastructureProviderQueryHandler,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useClass: AppHealthMockInfrastructureProviderRepository,
                },
                {
                    provide : AppHealthFindInfrastructureProviderService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindInfrastructureProviderQueryHandler>(AppHealthFindInfrastructureProviderQueryHandler);
        service = module.get<AppHealthFindInfrastructureProviderService>(AppHealthFindInfrastructureProviderService);
        repository = <AppHealthMockInfrastructureProviderRepository>module.get<AppHealthIInfrastructureProviderRepository>(AppHealthIInfrastructureProviderRepository);
        mapper = new AppHealthInfrastructureProviderMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureProvider founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindInfrastructureProviderQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
