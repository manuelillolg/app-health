/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateAuthorizationInterfacesService } from './app-health-create-authorization-interfaces.service';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthCreateAuthorizationInterfacesService', () =>
{
    let service: AppHealthCreateAuthorizationInterfacesService;
    let mockRepository: AppHealthMockAuthorizationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateAuthorizationInterfacesService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateAuthorizationInterfacesService);
        mockRepository = module.get(AppHealthMockAuthorizationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('CreateAuthorizationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create authorizationInterfaces and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
