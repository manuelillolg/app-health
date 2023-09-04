/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthUpdateAuthorizationInterfaceByIdService } from './app-health-update-authorization-interface-by-id.service';
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

describe('AppHealthUpdateAuthorizationInterfaceByIdService', () =>
{
    let service: AppHealthUpdateAuthorizationInterfaceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateAuthorizationInterfaceByIdService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateAuthorizationInterfaceByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfaceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a authorizationInterface and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthAuthorizationInterfaceId(appHealthMockAuthorizationInterfaceData[0].id),
                        name: new AppHealthAuthorizationInterfaceName(appHealthMockAuthorizationInterfaceData[0].name),
                        score: new AppHealthAuthorizationInterfaceScore(appHealthMockAuthorizationInterfaceData[0].score),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
