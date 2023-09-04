import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApplicationAuthorizationsService } from './app-health-get-application-authorizations.service';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthMockApplicationAuthorizationRepository } from '../../infrastructure/mock/app-health-mock-application-authorization.repository';

describe('AppHealthGetApplicationAuthorizationsService', () =>
{
    let service: AppHealthGetApplicationAuthorizationsService;
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
                AppHealthGetApplicationAuthorizationsService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApplicationAuthorizationsService);
        repository = module.get(AppHealthIApplicationAuthorizationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthorizationRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationAuthorizationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationAuthorizations', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
