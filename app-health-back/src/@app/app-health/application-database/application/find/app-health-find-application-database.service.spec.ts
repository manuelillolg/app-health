import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationDatabaseService } from './app-health-find-application-database.service';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthMockApplicationDatabaseRepository } from '../../infrastructure/mock/app-health-mock-application-database.repository';

describe('AppHealthFindApplicationDatabaseService', () =>
{
    let service: AppHealthFindApplicationDatabaseService;
    let repository: AppHealthIApplicationDatabaseRepository;
    let mockRepository: AppHealthMockApplicationDatabaseRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationDatabaseService,
                AppHealthMockApplicationDatabaseRepository,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationDatabaseService);
        repository = module.get(AppHealthIApplicationDatabaseRepository);
        mockRepository = module.get(AppHealthMockApplicationDatabaseRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationDatabaseService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationDatabase', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
