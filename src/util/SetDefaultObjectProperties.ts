export default <ObjectType>(
  obj: object,
  defaultProperties: ObjectType
): ObjectType => {
  Object.keys(defaultProperties as {}).forEach((key) => {
    if (!obj.hasOwnProperty(key)) {
      obj[key as keyof object] = defaultProperties[key as keyof object];
    }
  });

  return obj as unknown as ObjectType;
};
