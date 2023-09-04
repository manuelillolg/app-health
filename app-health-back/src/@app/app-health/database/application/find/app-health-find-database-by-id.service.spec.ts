import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthFindDatabaseByIdService } from './app-health-find-database-by-id.service';
import { AppHealthDatabaseId } from '../../domain/value-objects';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthMockDatabaseRepository } from '../../infrastructure/mock/app-health-mock-database.repository';

describe('AppHealthFindDatabaseByIdService', () =>
{
    let service: AppHealthFindDatabaseByIdService;
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
                AppHealthFindDatabaseByIdService,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindDatabaseByIdService);
        repository = module.get(AppHealthIDatabaseRepository);
        mockRepository = module.get(AppHealthMockDatabaseRepository);
    });

    describe('main', () =>
    {
        test('FindDatabaseByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find database by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthDatabaseId(appHealthMockDatabaseData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
