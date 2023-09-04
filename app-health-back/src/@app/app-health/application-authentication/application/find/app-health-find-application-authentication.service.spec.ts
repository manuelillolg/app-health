import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationAuthenticationService } from './app-health-find-application-authentication.service';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthMockApplicationAuthenticationRepository } from '../../infrastructure/mock/app-health-mock-application-authentication.repository';

describe('AppHealthFindApplicationAuthenticationService', () =>
{
    let service: AppHealthFindApplicationAuthenticationService;
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
                AppHealthFindApplicationAuthenticationService,
                AppHealthMockApplicationAuthenticationRepository,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationAuthenticationService);
        repository = module.get(AppHealthIApplicationAuthenticationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthenticationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthenticationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationAuthentication', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
