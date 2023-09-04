/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthDeleteCustomersService } from './app-health-delete-customers.service';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthDeleteCustomersService', () =>
{
    let service: AppHealthDeleteCustomersService;
    let repository: AppHealthICustomerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteCustomersService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteCustomersService);
        repository = module.get(AppHealthICustomerRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete customer and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
