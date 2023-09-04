import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLApplicationApisService } from './app-health-raw-sql-application-apis.service';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthRawSQLApplicationApisService ', () =>
{
    let service: AppHealthRawSQLApplicationApisService ;
    let repository: AppHealthIApplicationApiRepository;
    let mockRepository: AppHealthMockApplicationApiRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthRawSQLApplicationApisService ,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLApplicationApisService );
        repository      = module.get(AppHealthIApplicationApiRepository);
        mockRepository  = module.get(AppHealthMockApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationApisService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationApis', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
