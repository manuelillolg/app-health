import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindDatabaseByIdQueryHandler } from './app-health-find-database-by-id.query-handler';
import { AppHealthMockDatabaseRepository } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.repository';
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthIDatabaseRepository } from '@app/app-health/database/domain/app-health-database.repository';
import { AppHealthDatabaseMapper } from '@app/app-health/database/domain/app-health-database.mapper';
import { AppHealthFindDatabaseByIdQuery } from './app-health-find-database-by-id.query';
import { AppHealthFindDatabaseByIdService } from './app-health-find-database-by-id.service';

describe('AppHealthFindDatabaseByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindDatabaseByIdQueryHandler;
    let service: AppHealthFindDatabaseByIdService;
    let repository: AppHealthMockDatabaseRepository;
    let mapper: AppHealthDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindDatabaseByIdQueryHandler,
                {
                    provide : AppHealthIDatabaseRepository,
                    useClass: AppHealthMockDatabaseRepository,
                },
                {
                    provide : AppHealthFindDatabaseByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindDatabaseByIdQueryHandler>(AppHealthFindDatabaseByIdQueryHandler);
        service = module.get<AppHealthFindDatabaseByIdService>(AppHealthFindDatabaseByIdService);
        repository = <AppHealthMockDatabaseRepository>module.get<AppHealthIDatabaseRepository>(AppHealthIDatabaseRepository);
        mapper = new AppHealthDatabaseMapper();
    });

    describe('main', () =>
    {
        test('FindDatabaseByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an database founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindDatabaseByIdQuery(
                    appHealthMockDatabaseData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
