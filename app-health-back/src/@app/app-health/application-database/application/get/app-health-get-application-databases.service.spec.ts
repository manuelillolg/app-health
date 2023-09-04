import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApplicationDatabasesService } from './app-health-get-application-databases.service';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthMockApplicationDatabaseRepository } from '../../infrastructure/mock/app-health-mock-application-database.repository';

describe('AppHealthGetApplicationDatabasesService', () =>
{
    let service: AppHealthGetApplicationDatabasesService;
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
                AppHealthGetApplicationDatabasesService,
                AppHealthMockApplicationDatabaseRepository,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApplicationDatabasesService);
        repository = module.get(AppHealthIApplicationDatabaseRepository);
        mockRepository = module.get(AppHealthMockApplicationDatabaseRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationDatabasesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationDatabases', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
