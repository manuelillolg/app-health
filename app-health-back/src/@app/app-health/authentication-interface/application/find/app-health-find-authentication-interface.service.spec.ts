import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindAuthenticationInterfaceService } from './app-health-find-authentication-interface.service';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthFindAuthenticationInterfaceService', () =>
{
    let service: AppHealthFindAuthenticationInterfaceService;
    let repository: AppHealthIAuthenticationInterfaceRepository;
    let mockRepository: AppHealthMockAuthenticationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindAuthenticationInterfaceService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindAuthenticationInterfaceService);
        repository = module.get(AppHealthIAuthenticationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthenticationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find authenticationInterface', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
