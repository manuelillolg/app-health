import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationByIdQueryHandler } from './app-health-find-application-by-id.query-handler';
import { AppHealthMockApplicationRepository } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.repository';
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthIApplicationRepository } from '@app/app-health/application/domain/app-health-application.repository';
import { AppHealthApplicationMapper } from '@app/app-health/application/domain/app-health-application.mapper';
import { AppHealthFindApplicationByIdQuery } from './app-health-find-application-by-id.query';
import { AppHealthFindApplicationByIdService } from './app-health-find-application-by-id.service';

describe('AppHealthFindApplicationByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationByIdQueryHandler;
    let service: AppHealthFindApplicationByIdService;
    let repository: AppHealthMockApplicationRepository;
    let mapper: AppHealthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationByIdQueryHandler,
                {
                    provide : AppHealthIApplicationRepository,
                    useClass: AppHealthMockApplicationRepository,
                },
                {
                    provide : AppHealthFindApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationByIdQueryHandler>(AppHealthFindApplicationByIdQueryHandler);
        service = module.get<AppHealthFindApplicationByIdService>(AppHealthFindApplicationByIdService);
        repository = <AppHealthMockApplicationRepository>module.get<AppHealthIApplicationRepository>(AppHealthIApplicationRepository);
        mapper = new AppHealthApplicationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationByIdQuery(
                    appHealthMockApplicationData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
