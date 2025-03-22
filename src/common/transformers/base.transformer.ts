export abstract class BaseTransformer<T> {
  abstract transform(model: T): Record<string, any>;
}
