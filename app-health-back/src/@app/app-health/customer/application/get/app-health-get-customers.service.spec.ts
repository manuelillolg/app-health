import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetCustomersService } from './app-health-get-customers.service';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthGetCustomersService', () =>
{
    let service: AppHealthGetCustomersService;
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
                AppHealthGetCustomersService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetCustomersService);
        repository = module.get(AppHealthICustomerRepository);
        mockRepository = module.get(AppHealthMockCustomerRepository);
    });

    describe('main', () =>
    {
        test('GetCustomersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get customers', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
