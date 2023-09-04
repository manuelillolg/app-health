/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthUpdateCustomerByIdService } from './app-health-update-customer-by-id.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthMockCustomerRepository } from '../../infrastructure/mock/app-health-mock-customer.repository';

describe('AppHealthUpdateCustomerByIdService', () =>
{
    let service: AppHealthUpdateCustomerByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateCustomerByIdService,
                AppHealthMockCustomerRepository,
                {
                    provide : AppHealthICustomerRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateCustomerByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateCustomerByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a customer and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthCustomerId(appHealthMockCustomerData[0].id),
                        name: new AppHealthCustomerName(appHealthMockCustomerData[0].name),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
