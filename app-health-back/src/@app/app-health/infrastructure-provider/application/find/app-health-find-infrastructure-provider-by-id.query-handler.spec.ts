import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindInfrastructureProviderByIdQueryHandler } from './app-health-find-infrastructure-provider-by-id.query-handler';
import { AppHealthMockInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.repository';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProviderMapper } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.mapper';
import { AppHealthFindInfrastructureProviderByIdQuery } from './app-health-find-infrastructure-provider-by-id.query';
import { AppHealthFindInfrastructureProviderByIdService } from './app-health-find-infrastructure-provider-by-id.service';

describe('AppHealthFindInfrastructureProviderByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindInfrastructureProviderByIdQueryHandler;
    let service: AppHealthFindInfrastructureProviderByIdService;
    let repository: AppHealthMockInfrastructureProviderRepository;
    let mapper: AppHealthInfrastructureProviderMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindInfrastructureProviderByIdQueryHandler,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useClass: AppHealthMockInfrastructureProviderRepository,
                },
                {
                    provide : AppHealthFindInfrastructureProviderByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindInfrastructureProviderByIdQueryHandler>(AppHealthFindInfrastructureProviderByIdQueryHandler);
        service = module.get<AppHealthFindInfrastructureProviderByIdService>(AppHealthFindInfrastructureProviderByIdService);
        repository = <AppHealthMockInfrastructureProviderRepository>module.get<AppHealthIInfrastructureProviderRepository>(AppHealthIInfrastructureProviderRepository);
        mapper = new AppHealthInfrastructureProviderMapper();
    });

    describe('main', () =>
    {
        test('FindInfrastructureProviderByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an infrastructureProvider founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindInfrastructureProviderByIdQuery(
                    appHealthMockInfrastructureProviderData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
