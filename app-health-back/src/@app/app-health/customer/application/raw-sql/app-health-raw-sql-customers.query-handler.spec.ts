import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockCustomerRepository } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.repository';
import { AppHealthICustomerRepository } from '@app/app-health/customer/domain/app-health-customer.repository';
import { AppHealthCustomerMapper } from '@app/app-health/customer/domain/app-health-customer.mapper';
import { AppHealthRawSQLCustomersQueryHandler } from './app-health-raw-sql-customers.query-handler';
import { AppHealthRawSQLCustomersQuery } from './app-health-raw-sql-customers.query';
import { AppHealthRawSQLCustomersService } from './app-health-raw-sql-customers.service';

describe('RawSQLCustomersQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLCustomersQueryHandler;
    let service: AppHealthRawSQLCustomersService;
    let repository: AppHealthMockCustomerRepository;
    let mapper: AppHealthCustomerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLCustomersQueryHandler,
                {
                    provide : AppHealthICustomerRepository,
                    useClass: AppHealthMockCustomerRepository,
                },
                {
                    provide : AppHealthRawSQLCustomersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLCustomersQueryHandler>(AppHealthRawSQLCustomersQueryHandler);
        service = module.get<AppHealthRawSQLCustomersService>(AppHealthRawSQLCustomersService);
        repository = <AppHealthMockCustomerRepository>module.get<AppHealthICustomerRepository>(AppHealthICustomerRepository);
        mapper = new AppHealthCustomerMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLCustomersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an customers founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLCustomersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
