import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetDatabasesService } from './app-health-get-databases.service';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthMockDatabaseRepository } from '../../infrastructure/mock/app-health-mock-database.repository';

describe('AppHealthGetDatabasesService', () =>
{
    let service: AppHealthGetDatabasesService;
    let repository: AppHealthIDatabaseRepository;
    let mockRepository: AppHealthMockDatabaseRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthGetDatabasesService,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetDatabasesService);
        repository = module.get(AppHealthIDatabaseRepository);
        mockRepository = module.get(AppHealthMockDatabaseRepository);
    });

    describe('main', () =>
    {
        test('GetDatabasesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get databases', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
