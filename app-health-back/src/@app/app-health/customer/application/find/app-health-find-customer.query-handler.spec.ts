import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindCustomerQueryHandler } from './app-health-find-customer.query-handler';
import { AppHealthMockCustomerRepository } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.repository';
import { AppHealthICustomerRepository } from '@app/app-health/customer/domain/app-health-customer.repository';
import { AppHealthCustomerMapper } from '@app/app-health/customer/domain/app-health-customer.mapper';
import { AppHealthFindCustomerQuery } from './app-health-find-customer.query';
import { AppHealthFindCustomerService } from './app-health-find-customer.service';

describe('AppHealthFindCustomerQueryHandler', () =>
{
    let queryHandler: AppHealthFindCustomerQueryHandler;
    let service: AppHealthFindCustomerService;
    let repository: AppHealthMockCustomerRepository;
    let mapper: AppHealthCustomerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindCustomerQueryHandler,
                {
                    provide : AppHealthICustomerRepository,
                    useClass: AppHealthMockCustomerRepository,
                },
                {
                    provide : AppHealthFindCustomerService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindCustomerQueryHandler>(AppHealthFindCustomerQueryHandler);
        service = module.get<AppHealthFindCustomerService>(AppHealthFindCustomerService);
        repository = <AppHealthMockCustomerRepository>module.get<AppHealthICustomerRepository>(AppHealthICustomerRepository);
        mapper = new AppHealthCustomerMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an customer founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindCustomerQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
