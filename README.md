![Matrix-Math](https://user-images.githubusercontent.com/34441691/201380184-7b357976-ce1e-4f40-b4eb-74de69a85610.png)

# Matrix Math JS
This library implements various math functions for matrix manipulation, sum, diff, dot product, element wise power and element wise product functions.

## Run Locally

#### Clone the project
```bash
  git clone https://github.com/parangeomkar/matrix-math-js.git
```

#### Create matrix
```bash
// 1x1 matrix
let MAT11 = new Matrix(1);

// 1x3 matrix
let MAT13 = new Matrix([1,3,4]);

// 2x3 matrix
let MAT23 = new Matrix([1,3,4],[5,6,7]);
```

#### Dot product
```bash
let MAT13 = new Matrix([1,3,4]);
let MAT32 = new Matrix([1,3],[4,5],[6,7]);

let dotMat = dot(MAT13,MAT32);
```


#### Matirx Addition and Subtraction
```bash
let MAT22_A = new Matrix([1,3],[4,5]);
let MAT22_B = new Matrix([7,-2],[0,9]);

let MAT22_SUM = add(MAT22_A,MAT22_B);
let MAT22_DIF = sub(MAT22_A,MAT22_B);
```


#### Scalar Addition and Subtraction
```bash
let MAT22 = new Matrix([1,3],[4,5]);

let MAT22_SCAL_SUM = add(MAT22_A, 2.5);
let MAT22_SCAL_DIF = sub(MAT22_A, 2.5);
```


#### Elementwise matrix multiplication
```bash
let MAT22_A = new Matrix([1,3],[4,5]);
let MAT22_B = new Matrix([7,-2],[0,9]);

let MAT22_PROD = prod(MAT22_A, MAT22_B);
```



#### Elementwise matrix power
```bash
let MAT24 = new Matrix([1,2,3,4],[5,6,7,8]);

let MAT24_POW = pow(MAT24, 3);
```
