/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthCreateAuthorizationInterfaceService } from './app-health-create-authorization-interface.service';
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

describe('AppHealthCreateAuthorizationInterfaceService', () =>

{
    let service: AppHealthCreateAuthorizationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateAuthorizationInterfaceService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateAuthorizationInterfaceService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfaceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a authorizationInterface and emit event', async () =>
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
