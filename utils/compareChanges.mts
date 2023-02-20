export default async function compareChanges(oldValue:string, newValue:string):Promise<string> {
  const value:string = oldValue === newValue ? oldValue : newValue;
  return value;
}
