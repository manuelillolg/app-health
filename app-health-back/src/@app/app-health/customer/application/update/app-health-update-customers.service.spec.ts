/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthUpdateCustomersService } from './app-health-update-customers.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthUpdateCustomersService', () =>
{
    let service: AppHealthUpdateCustomersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateCustomersService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateCustomersService);
    });

    describe('main', () =>
    {
        test('UpdateCustomersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a customers and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthCustomerId(appHealthMockCustomerData[0].id),
                        name: new AppHealthCustomerName(appHealthMockCustomerData[0].name),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
