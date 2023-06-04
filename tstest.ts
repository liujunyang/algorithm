// function fun(): void {
//     console.log("this is TypeScript");
// };
// fun();
//
// let fna = <Type>(arr: Type[]): Type => {
//     return arr[0];
// }

function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed())
}

export const createCatName = () => "fluffy"; 

liveDangerously(null)
