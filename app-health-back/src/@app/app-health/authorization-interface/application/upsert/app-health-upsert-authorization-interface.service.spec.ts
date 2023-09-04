/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthUpsertAuthorizationInterfaceService } from './app-health-upsert-authorization-interface.service';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthUpsertAuthorizationInterfaceService', () =>

{
    let service: AppHealthUpsertAuthorizationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpsertAuthorizationInterfaceService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpsertAuthorizationInterfaceService);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertAuthorizationInterfaceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a authorizationInterface and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthAuthorizationInterfaceId(appHealthMockAuthorizationInterfaceData[0].id),
                        name: new AppHealthAuthorizationInterfaceName(appHealthMockAuthorizationInterfaceData[0].name),
                        score: new AppHealthAuthorizationInterfaceScore(appHealthMockAuthorizationInterfaceData[0].score),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
