/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthDeleteAuthorizationInterfaceByIdService } from './app-health-delete-authorization-interface-by-id.service';
import { AppHealthAuthorizationInterfaceId } from '../../domain/value-objects';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthDeleteAuthorizationInterfaceByIdService', () =>
{
    let service: AppHealthDeleteAuthorizationInterfaceByIdService;
    let repository: AppHealthIAuthorizationInterfaceRepository;
    let mockRepository: AppHealthMockAuthorizationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteAuthorizationInterfaceByIdService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteAuthorizationInterfaceByIdService);
        repository = module.get(AppHealthIAuthorizationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthorizationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthorizationInterfaceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete authorizationInterface and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthAuthorizationInterfaceId(appHealthMockAuthorizationInterfaceData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
