/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthCreateCustomerService } from './app-health-create-customer.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthCreateCustomerService', () =>

{
    let service: AppHealthCreateCustomerService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateCustomerService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateCustomerService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomerService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a customer and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthCustomerId(appHealthMockCustomerData[0].id),
                        name: new AppHealthCustomerName(appHealthMockCustomerData[0].name),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
