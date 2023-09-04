import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindCustomerByIdQueryHandler } from './app-health-find-customer-by-id.query-handler';
import { AppHealthMockCustomerRepository } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.repository';
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthICustomerRepository } from '@app/app-health/customer/domain/app-health-customer.repository';
import { AppHealthCustomerMapper } from '@app/app-health/customer/domain/app-health-customer.mapper';
import { AppHealthFindCustomerByIdQuery } from './app-health-find-customer-by-id.query';
import { AppHealthFindCustomerByIdService } from './app-health-find-customer-by-id.service';

describe('AppHealthFindCustomerByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindCustomerByIdQueryHandler;
    let service: AppHealthFindCustomerByIdService;
    let repository: AppHealthMockCustomerRepository;
    let mapper: AppHealthCustomerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindCustomerByIdQueryHandler,
                {
                    provide : AppHealthICustomerRepository,
                    useClass: AppHealthMockCustomerRepository,
                },
                {
                    provide : AppHealthFindCustomerByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindCustomerByIdQueryHandler>(AppHealthFindCustomerByIdQueryHandler);
        service = module.get<AppHealthFindCustomerByIdService>(AppHealthFindCustomerByIdService);
        repository = <AppHealthMockCustomerRepository>module.get<AppHealthICustomerRepository>(AppHealthICustomerRepository);
        mapper = new AppHealthCustomerMapper();
    });

    describe('main', () =>
    {
        test('FindCustomerByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an customer founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindCustomerByIdQuery(
                    appHealthMockCustomerData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
