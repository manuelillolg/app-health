import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetAuthenticationInterfacesService } from './app-health-get-authentication-interfaces.service';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthGetAuthenticationInterfacesService', () =>
{
    let service: AppHealthGetAuthenticationInterfacesService;
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
                AppHealthGetAuthenticationInterfacesService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetAuthenticationInterfacesService);
        repository = module.get(AppHealthIAuthenticationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthenticationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('GetAuthenticationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get authenticationInterfaces', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
