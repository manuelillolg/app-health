import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLApplicationDatabasesService } from './app-health-raw-sql-application-databases.service';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthMockApplicationDatabaseRepository } from '../../infrastructure/mock/app-health-mock-application-database.repository';

describe('AppHealthRawSQLApplicationDatabasesService ', () =>
{
    let service: AppHealthRawSQLApplicationDatabasesService ;
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
                AppHealthRawSQLApplicationDatabasesService ,
                AppHealthMockApplicationDatabaseRepository,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLApplicationDatabasesService );
        repository      = module.get(AppHealthIApplicationDatabaseRepository);
        mockRepository  = module.get(AppHealthMockApplicationDatabaseRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationDatabasesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationDatabases', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
