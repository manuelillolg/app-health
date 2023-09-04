import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateInfrastructureProvidersQueryHandler } from './app-health-paginate-infrastructure-providers.query-handler';
import { AppHealthMockInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.repository';
import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProviderMapper } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.mapper';
import { AppHealthPaginateInfrastructureProvidersQuery } from './app-health-paginate-infrastructure-providers.query';
import { AppHealthPaginateInfrastructureProvidersService } from './app-health-paginate-infrastructure-providers.service';

describe('AppHealthPaginateInfrastructureProvidersQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateInfrastructureProvidersQueryHandler;
    let service: AppHealthPaginateInfrastructureProvidersService;
    let repository: AppHealthMockInfrastructureProviderRepository;
    let mapper: AppHealthInfrastructureProviderMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateInfrastructureProvidersQueryHandler,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useClass: AppHealthMockInfrastructureProviderRepository,
                },
                {
                    provide : AppHealthPaginateInfrastructureProvidersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateInfrastructureProvidersQueryHandler>(AppHealthPaginateInfrastructureProvidersQueryHandler);
        service = module.get<AppHealthPaginateInfrastructureProvidersService>(AppHealthPaginateInfrastructureProvidersService);
        repository = <AppHealthMockInfrastructureProviderRepository>module.get<AppHealthIInfrastructureProviderRepository>(AppHealthIInfrastructureProviderRepository);
        mapper = new AppHealthInfrastructureProviderMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureProvidersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureProviders paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateInfrastructureProvidersQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
