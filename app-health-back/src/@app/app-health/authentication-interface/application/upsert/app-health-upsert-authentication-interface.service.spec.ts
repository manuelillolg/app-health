/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthUpsertAuthenticationInterfaceService } from './app-health-upsert-authentication-interface.service';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthUpsertAuthenticationInterfaceService', () =>

{
    let service: AppHealthUpsertAuthenticationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpsertAuthenticationInterfaceService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpsertAuthenticationInterfaceService);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertAuthenticationInterfaceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a authenticationInterface and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthAuthenticationInterfaceId(appHealthMockAuthenticationInterfaceData[0].id),
                        name: new AppHealthAuthenticationInterfaceName(appHealthMockAuthenticationInterfaceData[0].name),
                        score: new AppHealthAuthenticationInterfaceScore(appHealthMockAuthenticationInterfaceData[0].score),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
