import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApiInterfaceTypeQueryHandler } from './app-health-find-api-interface-type.query-handler';
import { AppHealthMockApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.repository';
import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceTypeMapper } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.mapper';
import { AppHealthFindApiInterfaceTypeQuery } from './app-health-find-api-interface-type.query';
import { AppHealthFindApiInterfaceTypeService } from './app-health-find-api-interface-type.service';

describe('AppHealthFindApiInterfaceTypeQueryHandler', () =>
{
    let queryHandler: AppHealthFindApiInterfaceTypeQueryHandler;
    let service: AppHealthFindApiInterfaceTypeService;
    let repository: AppHealthMockApiInterfaceTypeRepository;
    let mapper: AppHealthApiInterfaceTypeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApiInterfaceTypeQueryHandler,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useClass: AppHealthMockApiInterfaceTypeRepository,
                },
                {
                    provide : AppHealthFindApiInterfaceTypeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApiInterfaceTypeQueryHandler>(AppHealthFindApiInterfaceTypeQueryHandler);
        service = module.get<AppHealthFindApiInterfaceTypeService>(AppHealthFindApiInterfaceTypeService);
        repository = <AppHealthMockApiInterfaceTypeRepository>module.get<AppHealthIApiInterfaceTypeRepository>(AppHealthIApiInterfaceTypeRepository);
        mapper = new AppHealthApiInterfaceTypeMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an apiInterfaceType founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApiInterfaceTypeQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
