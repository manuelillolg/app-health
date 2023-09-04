/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthCreateApiInterfaceTypeService } from './app-health-create-api-interface-type.service';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthMockApiInterfaceTypeRepository } from '../../infrastructure/mock/app-health-mock-api-interface-type.repository';

describe('AppHealthCreateApiInterfaceTypeService', () =>

{
    let service: AppHealthCreateApiInterfaceTypeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApiInterfaceTypeService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApiInterfaceTypeService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApiInterfaceTypeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a apiInterfaceType and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApiInterfaceTypeId(appHealthMockApiInterfaceTypeData[0].id),
                        name: new AppHealthApiInterfaceTypeName(appHealthMockApiInterfaceTypeData[0].name),
                        score: new AppHealthApiInterfaceTypeScore(appHealthMockApiInterfaceTypeData[0].score),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
