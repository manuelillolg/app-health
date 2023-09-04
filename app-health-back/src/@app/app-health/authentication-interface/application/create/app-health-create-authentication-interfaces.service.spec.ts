/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateAuthenticationInterfacesService } from './app-health-create-authentication-interfaces.service';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthCreateAuthenticationInterfacesService', () =>
{
    let service: AppHealthCreateAuthenticationInterfacesService;
    let mockRepository: AppHealthMockAuthenticationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateAuthenticationInterfacesService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateAuthenticationInterfacesService);
        mockRepository = module.get(AppHealthMockAuthenticationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('CreateAuthenticationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create authenticationInterfaces and emit event', async () =>
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
