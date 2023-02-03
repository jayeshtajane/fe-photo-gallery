export class AppResponse<T> {
  statusCode: number = -1;
  message: string = '';
  entity: T | undefined;
}
