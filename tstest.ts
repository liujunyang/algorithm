function fun(): void {
    console.log("this is TypeScript");
};
fun();

let fna = <Type>(arr: Type[]): Type => {
    return arr[0];
}
