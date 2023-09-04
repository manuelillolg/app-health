import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationAuthorizationService } from './app-health-find-application-authorization.service';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthMockApplicationAuthorizationRepository } from '../../infrastructure/mock/app-health-mock-application-authorization.repository';

describe('AppHealthFindApplicationAuthorizationService', () =>
{
    let service: AppHealthFindApplicationAuthorizationService;
    let repository: AppHealthIApplicationAuthorizationRepository;
    let mockRepository: AppHealthMockApplicationAuthorizationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationAuthorizationService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationAuthorizationService);
        repository = module.get(AppHealthIApplicationAuthorizationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthorizationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationAuthorization', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
