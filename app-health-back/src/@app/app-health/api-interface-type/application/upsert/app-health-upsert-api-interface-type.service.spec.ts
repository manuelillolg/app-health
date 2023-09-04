/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthUpsertApiInterfaceTypeService } from './app-health-upsert-api-interface-type.service';
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

describe('AppHealthUpsertApiInterfaceTypeService', () =>

{
    let service: AppHealthUpsertApiInterfaceTypeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpsertApiInterfaceTypeService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpsertApiInterfaceTypeService);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApiInterfaceTypeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a apiInterfaceType and emit event', async () =>
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
