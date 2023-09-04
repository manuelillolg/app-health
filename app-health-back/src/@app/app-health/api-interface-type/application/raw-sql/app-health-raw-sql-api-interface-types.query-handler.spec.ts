import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.repository';
import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceTypeMapper } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.mapper';
import { AppHealthRawSQLApiInterfaceTypesQueryHandler } from './app-health-raw-sql-api-interface-types.query-handler';
import { AppHealthRawSQLApiInterfaceTypesQuery } from './app-health-raw-sql-api-interface-types.query';
import { AppHealthRawSQLApiInterfaceTypesService } from './app-health-raw-sql-api-interface-types.service';

describe('RawSQLApiInterfaceTypesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApiInterfaceTypesQueryHandler;
    let service: AppHealthRawSQLApiInterfaceTypesService;
    let repository: AppHealthMockApiInterfaceTypeRepository;
    let mapper: AppHealthApiInterfaceTypeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApiInterfaceTypesQueryHandler,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useClass: AppHealthMockApiInterfaceTypeRepository,
                },
                {
                    provide : AppHealthRawSQLApiInterfaceTypesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApiInterfaceTypesQueryHandler>(AppHealthRawSQLApiInterfaceTypesQueryHandler);
        service = module.get<AppHealthRawSQLApiInterfaceTypesService>(AppHealthRawSQLApiInterfaceTypesService);
        repository = <AppHealthMockApiInterfaceTypeRepository>module.get<AppHealthIApiInterfaceTypeRepository>(AppHealthIApiInterfaceTypeRepository);
        mapper = new AppHealthApiInterfaceTypeMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApiInterfaceTypesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an apiInterfaceTypes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApiInterfaceTypesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
