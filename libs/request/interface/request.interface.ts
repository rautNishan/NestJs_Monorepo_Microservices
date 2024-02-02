import { RequestPaginationSerialization } from './serilizations/request.pagination.serialization';

export interface IRequestApp extends Request {
  __pagination?: RequestPaginationSerialization;
}
