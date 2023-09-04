import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.repository';
import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProviderMapper } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.mapper';
import { AppHealthRawSQLInfrastructureProvidersQueryHandler } from './app-health-raw-sql-infrastructure-providers.query-handler';
import { AppHealthRawSQLInfrastructureProvidersQuery } from './app-health-raw-sql-infrastructure-providers.query';
import { AppHealthRawSQLInfrastructureProvidersService } from './app-health-raw-sql-infrastructure-providers.service';

describe('RawSQLInfrastructureProvidersQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLInfrastructureProvidersQueryHandler;
    let service: AppHealthRawSQLInfrastructureProvidersService;
    let repository: AppHealthMockInfrastructureProviderRepository;
    let mapper: AppHealthInfrastructureProviderMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLInfrastructureProvidersQueryHandler,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useClass: AppHealthMockInfrastructureProviderRepository,
                },
                {
                    provide : AppHealthRawSQLInfrastructureProvidersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLInfrastructureProvidersQueryHandler>(AppHealthRawSQLInfrastructureProvidersQueryHandler);
        service = module.get<AppHealthRawSQLInfrastructureProvidersService>(AppHealthRawSQLInfrastructureProvidersService);
        repository = <AppHealthMockInfrastructureProviderRepository>module.get<AppHealthIInfrastructureProviderRepository>(AppHealthIInfrastructureProviderRepository);
        mapper = new AppHealthInfrastructureProviderMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLInfrastructureProvidersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureProviders founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLInfrastructureProvidersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
