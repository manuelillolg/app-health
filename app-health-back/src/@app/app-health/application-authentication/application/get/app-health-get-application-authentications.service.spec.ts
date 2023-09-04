import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApplicationAuthenticationsService } from './app-health-get-application-authentications.service';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthMockApplicationAuthenticationRepository } from '../../infrastructure/mock/app-health-mock-application-authentication.repository';

describe('AppHealthGetApplicationAuthenticationsService', () =>
{
    let service: AppHealthGetApplicationAuthenticationsService;
    let repository: AppHealthIApplicationAuthenticationRepository;
    let mockRepository: AppHealthMockApplicationAuthenticationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthGetApplicationAuthenticationsService,
                AppHealthMockApplicationAuthenticationRepository,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApplicationAuthenticationsService);
        repository = module.get(AppHealthIApplicationAuthenticationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthenticationRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationAuthenticationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationAuthentications', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
