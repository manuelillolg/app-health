import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApiInterfaceTypeByIdQueryHandler } from './app-health-find-api-interface-type-by-id.query-handler';
import { AppHealthMockApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.repository';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceTypeMapper } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.mapper';
import { AppHealthFindApiInterfaceTypeByIdQuery } from './app-health-find-api-interface-type-by-id.query';
import { AppHealthFindApiInterfaceTypeByIdService } from './app-health-find-api-interface-type-by-id.service';

describe('AppHealthFindApiInterfaceTypeByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApiInterfaceTypeByIdQueryHandler;
    let service: AppHealthFindApiInterfaceTypeByIdService;
    let repository: AppHealthMockApiInterfaceTypeRepository;
    let mapper: AppHealthApiInterfaceTypeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApiInterfaceTypeByIdQueryHandler,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useClass: AppHealthMockApiInterfaceTypeRepository,
                },
                {
                    provide : AppHealthFindApiInterfaceTypeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApiInterfaceTypeByIdQueryHandler>(AppHealthFindApiInterfaceTypeByIdQueryHandler);
        service = module.get<AppHealthFindApiInterfaceTypeByIdService>(AppHealthFindApiInterfaceTypeByIdService);
        repository = <AppHealthMockApiInterfaceTypeRepository>module.get<AppHealthIApiInterfaceTypeRepository>(AppHealthIApiInterfaceTypeRepository);
        mapper = new AppHealthApiInterfaceTypeMapper();
    });

    describe('main', () =>
    {
        test('FindApiInterfaceTypeByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an apiInterfaceType founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApiInterfaceTypeByIdQuery(
                    appHealthMockApiInterfaceTypeData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
