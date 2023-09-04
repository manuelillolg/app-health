import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetCustomersQueryHandler } from './app-health-get-customers.query-handler';
import { AppHealthMockCustomerRepository } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.repository';
import { AppHealthICustomerRepository } from '@app/app-health/customer/domain/app-health-customer.repository';
import { AppHealthCustomerMapper } from '@app/app-health/customer/domain/app-health-customer.mapper';
import { AppHealthGetCustomersQuery } from './app-health-get-customers.query';
import { AppHealthGetCustomersService } from './app-health-get-customers.service';

describe('GetCustomersQueryHandler', () =>
{
    let queryHandler: AppHealthGetCustomersQueryHandler;
    let service: AppHealthGetCustomersService;
    let repository: AppHealthMockCustomerRepository;
    let mapper: AppHealthCustomerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetCustomersQueryHandler,
                {
                    provide : AppHealthICustomerRepository,
                    useClass: AppHealthMockCustomerRepository,
                },
                {
                    provide : AppHealthGetCustomersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetCustomersQueryHandler>(AppHealthGetCustomersQueryHandler);
        service = module.get<AppHealthGetCustomersService>(AppHealthGetCustomersService);
        repository = <AppHealthMockCustomerRepository>module.get<AppHealthICustomerRepository>(AppHealthICustomerRepository);
        mapper = new AppHealthCustomerMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetCustomersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an customers founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetCustomersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});