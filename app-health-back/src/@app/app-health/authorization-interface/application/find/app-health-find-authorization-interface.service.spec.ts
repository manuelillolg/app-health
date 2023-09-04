import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindAuthorizationInterfaceService } from './app-health-find-authorization-interface.service';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthFindAuthorizationInterfaceService', () =>
{
    let service: AppHealthFindAuthorizationInterfaceService;
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
                AppHealthFindAuthorizationInterfaceService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindAuthorizationInterfaceService);
        repository = module.get(AppHealthIAuthorizationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthorizationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find authorizationInterface', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
