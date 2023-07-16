import { Model, PipelineStage } from "mongoose";

export type PaginationResult<T> = {
  data: T[];
  isLastChunk: boolean;
};

type Pagination = {
  model: Model<any>;
  query: any;
  chunk: any;
  limit: any;
  sort?: any;
  populate?: any;
  select?: any;
};

/**
 * @description populate and select would not work if query is an array
 */
export default <T>({
  model,
  query,
  chunk,
  limit,
  sort,
  populate,
  select,
}: Pagination): Promise<PaginationResult<T>> =>
  new Promise(async (resolve, reject) => {
    try {
      const skip = Number(chunk || 0) * Number(limit);
      const limitRes = Number(limit) + 1;
      if (!Array.isArray(query)) {
        const requiredData: T[] = (await model
          .find(query)
          .sort(sort)
          .skip(Number(chunk || 0) * Number(limit))
          .limit(Number(limit) + 1)
          .populate(populate)
          .select(select)) as T[];
        const totalLength = requiredData.length;
        if (totalLength > Number(limit)) requiredData.pop();
        return resolve({
          data: requiredData,
          isLastChunk: !(totalLength > Number(limit)),
        });
      } else {
        // sorting
        let sortingQuery = Object.keys(sort).length ? [{ $sort: sort }] : [];

        // pagination query
        let paginationQuery: any = [];
        // remove pagination if limit and skip is not provided
        if (skip >= 0 && limit) {
          paginationQuery = [{ $skip: skip }, { $limit: limitRes }];
        }
        const aggregationData: any = await model.aggregate([
          ...query,
          ...sortingQuery,
          ...paginationQuery,
        ]);
        const totalLength = aggregationData.length;
        if (totalLength > Number(limit)) aggregationData.pop();
        return resolve({
          data: aggregationData,
          isLastChunk: !(totalLength > Number(limit)),
        });
      }
    } catch (error) {
      reject(error);
    }
  });
