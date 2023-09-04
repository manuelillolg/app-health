/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthDeleteCustomerByIdService } from './app-health-delete-customer-by-id.service';
import { AppHealthCustomerId } from '../../domain/value-objects';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthDeleteCustomerByIdService', () =>
{
    let service: AppHealthDeleteCustomerByIdService;
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
                AppHealthDeleteCustomerByIdService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteCustomerByIdService);
        repository = module.get(AppHealthICustomerRepository);
        mockRepository = module.get(AppHealthMockCustomerRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomerByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete customer and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthCustomerId(appHealthMockCustomerData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
