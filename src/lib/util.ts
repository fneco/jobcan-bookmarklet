type FirstParam<T extends (...args: any) => any> = T extends (
  ...args: [infer First, ...any[]]
) => any
  ? First
  : never;

export function throughNil<Func extends (arg: any) => any>(
  func: Func
): (arg: FirstParam<Func> | null | undefined) => ReturnType<Func> | null {
  return (arg: FirstParam<Func> | null | undefined) => {
    if (arg == null) return null;
    return func(arg) as ReturnType<Func>;
  };
}
