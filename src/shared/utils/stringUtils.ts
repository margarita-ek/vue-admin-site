export function nameInitialsHelper(name: string){
  return name.split(' ').reduce((acc, curr) => acc + curr[0].toUpperCase(), '');
}