import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthFindCustomerByIdService } from './app-health-find-customer-by-id.service';
import { AppHealthCustomerId } from '../../domain/value-objects';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthFindCustomerByIdService', () =>
{
    let service: AppHealthFindCustomerByIdService;
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
                AppHealthFindCustomerByIdService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindCustomerByIdService);
        repository = module.get(AppHealthICustomerRepository);
        mockRepository = module.get(AppHealthMockCustomerRepository);
    });

    describe('main', () =>
    {
        test('FindCustomerByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find customer by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthCustomerId(appHealthMockCustomerData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
