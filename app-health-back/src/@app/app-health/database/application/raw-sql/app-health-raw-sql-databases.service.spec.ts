import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLDatabasesService } from './app-health-raw-sql-databases.service';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthMockDatabaseRepository } from '../../infrastructure/mock/app-health-mock-database.repository';

describe('AppHealthRawSQLDatabasesService ', () =>
{
    let service: AppHealthRawSQLDatabasesService ;
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
                AppHealthRawSQLDatabasesService ,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLDatabasesService );
        repository      = module.get(AppHealthIDatabaseRepository);
        mockRepository  = module.get(AppHealthMockDatabaseRepository);
    });

    describe('main', () =>
    {
        test('RawSQLDatabasesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get databases', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
