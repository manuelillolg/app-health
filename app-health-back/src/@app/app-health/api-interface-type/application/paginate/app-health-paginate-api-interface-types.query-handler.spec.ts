import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApiInterfaceTypesQueryHandler } from './app-health-paginate-api-interface-types.query-handler';
import { AppHealthMockApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.repository';
import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceTypeMapper } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.mapper';
import { AppHealthPaginateApiInterfaceTypesQuery } from './app-health-paginate-api-interface-types.query';
import { AppHealthPaginateApiInterfaceTypesService } from './app-health-paginate-api-interface-types.service';

describe('AppHealthPaginateApiInterfaceTypesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApiInterfaceTypesQueryHandler;
    let service: AppHealthPaginateApiInterfaceTypesService;
    let repository: AppHealthMockApiInterfaceTypeRepository;
    let mapper: AppHealthApiInterfaceTypeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApiInterfaceTypesQueryHandler,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useClass: AppHealthMockApiInterfaceTypeRepository,
                },
                {
                    provide : AppHealthPaginateApiInterfaceTypesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApiInterfaceTypesQueryHandler>(AppHealthPaginateApiInterfaceTypesQueryHandler);
        service = module.get<AppHealthPaginateApiInterfaceTypesService>(AppHealthPaginateApiInterfaceTypesService);
        repository = <AppHealthMockApiInterfaceTypeRepository>module.get<AppHealthIApiInterfaceTypeRepository>(AppHealthIApiInterfaceTypeRepository);
        mapper = new AppHealthApiInterfaceTypeMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApiInterfaceTypesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an apiInterfaceTypes paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApiInterfaceTypesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
