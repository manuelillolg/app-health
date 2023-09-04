import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApiInterfaceTypesQueryHandler } from './app-health-get-api-interface-types.query-handler';
import { AppHealthMockApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.repository';
import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceTypeMapper } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.mapper';
import { AppHealthGetApiInterfaceTypesQuery } from './app-health-get-api-interface-types.query';
import { AppHealthGetApiInterfaceTypesService } from './app-health-get-api-interface-types.service';

describe('GetApiInterfaceTypesQueryHandler', () =>
{
    let queryHandler: AppHealthGetApiInterfaceTypesQueryHandler;
    let service: AppHealthGetApiInterfaceTypesService;
    let repository: AppHealthMockApiInterfaceTypeRepository;
    let mapper: AppHealthApiInterfaceTypeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApiInterfaceTypesQueryHandler,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useClass: AppHealthMockApiInterfaceTypeRepository,
                },
                {
                    provide : AppHealthGetApiInterfaceTypesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApiInterfaceTypesQueryHandler>(AppHealthGetApiInterfaceTypesQueryHandler);
        service = module.get<AppHealthGetApiInterfaceTypesService>(AppHealthGetApiInterfaceTypesService);
        repository = <AppHealthMockApiInterfaceTypeRepository>module.get<AppHealthIApiInterfaceTypeRepository>(AppHealthIApiInterfaceTypeRepository);
        mapper = new AppHealthApiInterfaceTypeMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApiInterfaceTypesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an apiInterfaceTypes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApiInterfaceTypesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});