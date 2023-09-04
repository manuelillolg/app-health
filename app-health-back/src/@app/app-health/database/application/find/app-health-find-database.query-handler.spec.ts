import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindDatabaseQueryHandler } from './app-health-find-database.query-handler';
import { AppHealthMockDatabaseRepository } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.repository';
import { AppHealthIDatabaseRepository } from '@app/app-health/database/domain/app-health-database.repository';
import { AppHealthDatabaseMapper } from '@app/app-health/database/domain/app-health-database.mapper';
import { AppHealthFindDatabaseQuery } from './app-health-find-database.query';
import { AppHealthFindDatabaseService } from './app-health-find-database.service';

describe('AppHealthFindDatabaseQueryHandler', () =>
{
    let queryHandler: AppHealthFindDatabaseQueryHandler;
    let service: AppHealthFindDatabaseService;
    let repository: AppHealthMockDatabaseRepository;
    let mapper: AppHealthDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindDatabaseQueryHandler,
                {
                    provide : AppHealthIDatabaseRepository,
                    useClass: AppHealthMockDatabaseRepository,
                },
                {
                    provide : AppHealthFindDatabaseService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindDatabaseQueryHandler>(AppHealthFindDatabaseQueryHandler);
        service = module.get<AppHealthFindDatabaseService>(AppHealthFindDatabaseService);
        repository = <AppHealthMockDatabaseRepository>module.get<AppHealthIDatabaseRepository>(AppHealthIDatabaseRepository);
        mapper = new AppHealthDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an database founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindDatabaseQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
