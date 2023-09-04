import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetInfrastructureProvidersQueryHandler } from './app-health-get-infrastructure-providers.query-handler';
import { AppHealthMockInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.repository';
import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProviderMapper } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.mapper';
import { AppHealthGetInfrastructureProvidersQuery } from './app-health-get-infrastructure-providers.query';
import { AppHealthGetInfrastructureProvidersService } from './app-health-get-infrastructure-providers.service';

describe('GetInfrastructureProvidersQueryHandler', () =>
{
    let queryHandler: AppHealthGetInfrastructureProvidersQueryHandler;
    let service: AppHealthGetInfrastructureProvidersService;
    let repository: AppHealthMockInfrastructureProviderRepository;
    let mapper: AppHealthInfrastructureProviderMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetInfrastructureProvidersQueryHandler,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useClass: AppHealthMockInfrastructureProviderRepository,
                },
                {
                    provide : AppHealthGetInfrastructureProvidersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetInfrastructureProvidersQueryHandler>(AppHealthGetInfrastructureProvidersQueryHandler);
        service = module.get<AppHealthGetInfrastructureProvidersService>(AppHealthGetInfrastructureProvidersService);
        repository = <AppHealthMockInfrastructureProviderRepository>module.get<AppHealthIInfrastructureProviderRepository>(AppHealthIInfrastructureProviderRepository);
        mapper = new AppHealthInfrastructureProviderMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetInfrastructureProvidersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureProviders founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetInfrastructureProvidersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});