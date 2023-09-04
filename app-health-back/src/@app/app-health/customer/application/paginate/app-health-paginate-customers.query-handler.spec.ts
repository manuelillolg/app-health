import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateCustomersQueryHandler } from './app-health-paginate-customers.query-handler';
import { AppHealthMockCustomerRepository } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.repository';
import { AppHealthICustomerRepository } from '@app/app-health/customer/domain/app-health-customer.repository';
import { AppHealthCustomerMapper } from '@app/app-health/customer/domain/app-health-customer.mapper';
import { AppHealthPaginateCustomersQuery } from './app-health-paginate-customers.query';
import { AppHealthPaginateCustomersService } from './app-health-paginate-customers.service';

describe('AppHealthPaginateCustomersQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateCustomersQueryHandler;
    let service: AppHealthPaginateCustomersService;
    let repository: AppHealthMockCustomerRepository;
    let mapper: AppHealthCustomerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateCustomersQueryHandler,
                {
                    provide : AppHealthICustomerRepository,
                    useClass: AppHealthMockCustomerRepository,
                },
                {
                    provide : AppHealthPaginateCustomersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateCustomersQueryHandler>(AppHealthPaginateCustomersQueryHandler);
        service = module.get<AppHealthPaginateCustomersService>(AppHealthPaginateCustomersService);
        repository = <AppHealthMockCustomerRepository>module.get<AppHealthICustomerRepository>(AppHealthICustomerRepository);
        mapper = new AppHealthCustomerMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateCustomersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an customers paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateCustomersQuery(
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
