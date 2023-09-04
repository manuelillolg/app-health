import { AppHealthApplication, AppHealthCreateApplication, AppHealthTechnicalSolution, AppHealthUpdateApplicationById, AppHealthUpdateApplications } from '../app-health.types';
import { TechnicalSolutionService } from '../technical-solution/technical-solution.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './application.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthApplication> | null> = new BehaviorSubject(null);
    applicationSubject$: BehaviorSubject<AppHealthApplication | null> = new BehaviorSubject(null);
    applicationsSubject$: BehaviorSubject<AppHealthApplication[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly technicalSolutionService: TechnicalSolutionService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthApplication>>
    {
        return this.paginationSubject$.asObservable();
    }

    get application$(): Observable<AppHealthApplication>
    {
        return this.applicationSubject$.asObservable();
    }

    get applications$(): Observable<AppHealthApplication[]>
    {
        return this.applicationsSubject$.asObservable();
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
    ): Observable<GridData<AppHealthApplication>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthApplication>; }>({
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
        object: AppHealthApplication;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplication;
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
                    this.applicationSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryTechnicalSolutions = {},
            constraintTechnicalSolutions = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryTechnicalSolutions?: QueryStatement;
            constraintTechnicalSolutions?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthApplication;
        appHealthGetTechnicalSolutions: AppHealthTechnicalSolution[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplication;
                appHealthGetTechnicalSolutions: AppHealthTechnicalSolution[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryTechnicalSolutions,
                    constraintTechnicalSolutions,
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
                    this.applicationSubject$.next(data.object);
                    this.technicalSolutionService.technicalSolutionsSubject$.next(data.appHealthGetTechnicalSolutions);
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
        object: AppHealthApplication;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplication;
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
                    this.applicationSubject$.next(data.object);
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
        objects: AppHealthApplication[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthApplication[];
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
                    this.applicationsSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryTechnicalSolutions = {},
            constraintTechnicalSolutions = {},
            headers = {},
        }: {
            queryTechnicalSolutions?: QueryStatement;
            constraintTechnicalSolutions?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetTechnicalSolutions: AppHealthTechnicalSolution[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetTechnicalSolutions: AppHealthTechnicalSolution[];
            }>({
                query    : getRelations,
                variables: {
                    queryTechnicalSolutions,
                    constraintTechnicalSolutions,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.technicalSolutionService.technicalSolutionsSubject$.next(data.appHealthGetTechnicalSolutions);
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
            object?: AppHealthCreateApplication;
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
            object?: AppHealthUpdateApplicationById;
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
            object?: AppHealthUpdateApplications;
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