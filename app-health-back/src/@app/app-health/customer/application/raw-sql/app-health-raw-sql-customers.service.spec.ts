import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLCustomersService } from './app-health-raw-sql-customers.service';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthRawSQLCustomersService ', () =>
{
    let service: AppHealthRawSQLCustomersService ;
    let repository: AppHealthICustomerRepository;
    let mockRepository: AppHealthMockCustomerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthRawSQLCustomersService ,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLCustomersService );
        repository      = module.get(AppHealthICustomerRepository);
        mockRepository  = module.get(AppHealthMockCustomerRepository);
    });

    describe('main', () =>
    {
        test('RawSQLCustomersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get customers', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
