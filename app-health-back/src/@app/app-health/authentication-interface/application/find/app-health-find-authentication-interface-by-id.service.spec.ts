import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthFindAuthenticationInterfaceByIdService } from './app-health-find-authentication-interface-by-id.service';
import { AppHealthAuthenticationInterfaceId } from '../../domain/value-objects';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthFindAuthenticationInterfaceByIdService', () =>
{
    let service: AppHealthFindAuthenticationInterfaceByIdService;
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
                AppHealthFindAuthenticationInterfaceByIdService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindAuthenticationInterfaceByIdService);
        repository = module.get(AppHealthIAuthenticationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthenticationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('FindAuthenticationInterfaceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find authenticationInterface by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthAuthenticationInterfaceId(appHealthMockAuthenticationInterfaceData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
