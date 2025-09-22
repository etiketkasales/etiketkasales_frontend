class ObjectUtils {
  static checkIfSkeleton<T>(obj: T, skeleton: T): boolean {
    return JSON.stringify(obj) === JSON.stringify(skeleton);
  }
}

export default ObjectUtils;
