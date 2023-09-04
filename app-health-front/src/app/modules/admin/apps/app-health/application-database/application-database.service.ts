import { AppHealthApplication, AppHealthApplicationDatabase, AppHealthApplicationInfrastructureService, AppHealthCreateApplicationDatabase, AppHealthDatabase, AppHealthUpdateApplicationDatabaseById, AppHealthUpdateApplicationDatabases } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { DatabaseService } from '../database/database.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './application-database.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationDatabaseService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthApplicationDatabase> | null> = new BehaviorSubject(null);
    applicationDatabaseSubject$: BehaviorSubject<AppHealthApplicationDatabase | null> = new BehaviorSubject(null);
    applicationDatabasesSubject$: BehaviorSubject<AppHealthApplicationDatabase[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly applicationService: ApplicationService,
        private readonly databaseService: DatabaseService,
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthApplicationDatabase>>
    {
        return this.paginationSubject$.asObservable();
    }

    get applicationDatabase$(): Observable<AppHealthApplicationDatabase>
    {
        return this.applicationDatabaseSubject$.asObservable();
    }

    get applicationDatabases$(): Observable<AppHealthApplicationDatabase[]>
    {
        return this.applicationDatabasesSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<AppHealthApplicationDatabase>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthApplicationDatabase>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationDatabase;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationDatabase;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationDatabaseSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryApplications = {},
            constraintApplications = {},
            queryDatabases = {},
            constraintDatabases = {},
            queryApplicationInfrastuctureServices = {},
            constraintApplicationInfrastuctureServices = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryDatabases?: QueryStatement;
            constraintDatabases?: QueryStatement;
            queryApplicationInfrastuctureServices?: QueryStatement;
            constraintApplicationInfrastuctureServices?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthApplicationDatabase;
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetDatabases: AppHealthDatabase[];
        appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationDatabase;
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetDatabases: AppHealthDatabase[];
                appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryApplications,
                    constraintApplications,
                    queryDatabases,
                    constraintDatabases,
                    queryApplicationInfrastuctureServices,
                    constraintApplicationInfrastuctureServices,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationDatabaseSubject$.next(data.object);
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.databaseService.databasesSubject$.next(data.appHealthGetDatabases);
                    this.applicationInfrastructureServiceService.applicationInfrastuctureServicesSubject$.next(data.appHealthGetApplicationInfrastuctureServices);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationDatabase;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationDatabase;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationDatabaseSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: AppHealthApplicationDatabase[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthApplicationDatabase[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationDatabasesSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryApplications = {},
            constraintApplications = {},
            queryDatabases = {},
            constraintDatabases = {},
            queryApplicationInfrastuctureServices = {},
            constraintApplicationInfrastuctureServices = {},
            headers = {},
        }: {
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryDatabases?: QueryStatement;
            constraintDatabases?: QueryStatement;
            queryApplicationInfrastuctureServices?: QueryStatement;
            constraintApplicationInfrastuctureServices?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetDatabases: AppHealthDatabase[];
        appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetDatabases: AppHealthDatabase[];
                appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
            }>({
                query    : getRelations,
                variables: {
                    queryApplications,
                    constraintApplications,
                    queryDatabases,
                    constraintDatabases,
                    queryApplicationInfrastuctureServices,
                    constraintApplicationInfrastuctureServices,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.databaseService.databasesSubject$.next(data.appHealthGetDatabases);
                    this.applicationInfrastructureServiceService.applicationInfrastuctureServicesSubject$.next(data.appHealthGetApplicationInfrastuctureServices);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthCreateApplicationDatabase;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationDatabaseById;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationDatabases;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}