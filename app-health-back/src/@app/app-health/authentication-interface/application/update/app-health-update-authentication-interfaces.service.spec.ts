/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthUpdateAuthenticationInterfacesService } from './app-health-update-authentication-interfaces.service';
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

describe('AppHealthUpdateAuthenticationInterfacesService', () =>
{
    let service: AppHealthUpdateAuthenticationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateAuthenticationInterfacesService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateAuthenticationInterfacesService);
    });

    describe('main', () =>
    {
        test('UpdateAuthenticationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a authenticationInterfaces and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthAuthenticationInterfaceId(appHealthMockAuthenticationInterfaceData[0].id),
                        name: new AppHealthAuthenticationInterfaceName(appHealthMockAuthenticationInterfaceData[0].name),
                        score: new AppHealthAuthenticationInterfaceScore(appHealthMockAuthenticationInterfaceData[0].score),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
