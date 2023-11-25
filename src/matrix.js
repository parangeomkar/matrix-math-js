const { throwError } = require("./error_handler");

class Matrix {
    constructor(X) {
        let { val, dim } = this.toMatrix(X);

        this.val = val;
        this.dim = dim;
    }

    /**
     * 
     * @param {*} i row number - starts from 0
     * @param {*} j col number - starts from 0
     * @returns matrix element at i'th row and j'th column
     */
    get(i, j) {
        return this.val[i][j];
    }

    /**
     * 
     * @param {*} i row number - starts from 0
     * @param {*} j col number - starts from 0
     * @brief sets matrix element at i'th row and j'th column
     */
    set(i, j, value) {
        this.val[i][j] = value;
    }

    /**
     * 
     * @param {*} dim matrix dimension parameter 0 = # of rows, 1 = # columns 
     * @returns if dim is undefined then returns an array of [rows, columns] 
     *          else either rows or columns depending on value of dim 
     */
    size(dim = undefined) {
        if (dim != undefined) {
            return dim == 0 ? this.dim[0] : this.dim[1];
        } else {
            return this.dim;
        }
    }

    /**
     * transposes the matrix
     * @returns transposed object
     */
    transpose() {
        let _mat = [[]];

        // select rows
        for (let [i, row] of this.val.entries()) {

            // select columns
            for (let [j, col] of row.entries()) {

                // check if column array is empty
                if (!_mat[j]) {
                    _mat[j] = [];
                }

                _mat[j][i] = col;
            }
        }

        this.val = _mat;
        this.dim.reverse();
        return this;
    }

    /**
     * 
     * @param {*} rows number of rows
     * @param {*} cols number of columns
     * @brief sets MAT property as an identity matrix
     */
    identity(rows, cols) {
        this.val = new Array(rows).fill(1).map(() => new Array(cols).fill(1));
        this.dim = [rows, cols];
    }

    /**
     * 
     * @param {*} rows number of rows
     * @param {*} cols number of columns
     * @brief sets MAT property as a zero matrix
     */
    zeros(rows, cols) {
        this.val = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
        this.dim = [rows, cols];
    }

    /**
     * 
     * @param {*} X Array of matrix elements
     * @returns matrix data structure
     */
    toMatrix(X) {
        let _mat = {}

        // following if statement fails if X == 0 which is a valid input
        X = X == 0 ? [X] : X;

        // if X is not defined, create a null matrix
        if (X) {
            // Check if X is a vector or a scalar value
            if (Array.isArray(X)) {

                // check if elements in each row i.e. # of columns match
                if (!this.validateDim(X)) {
                    throwError("Number of columns do not match for all rows!");
                }

                // check if X has more than 1 dimensions
                if (Array.isArray(X[0])) {
                    let rows = X.length;
                    let cols = X[0].length;

                    _mat.val = X;
                    _mat.dim = [rows, cols];
                } else {
                    let cols = X.length;

                    _mat.val = [X];
                    _mat.dim = [1, cols];
                }
            } else {
                // scalar matrix
                _mat.val = [[X]];
                _mat.dim = [1, 1];
            }
        } else {
            // set a null matrix
            _mat.val = [[]];
            _mat.dim = [0, 0];
        }
        return _mat;
    }

    /**
     * 
     * @param {*} X Array of matrix elements
     * @returns true if the number of elements in each row is same
     */
    validateDim(X) {
        let numElem = null;

        // Check if number of elements in all matrix columns is same
        for (let x of X) {
            if (numElem && numElem != x.length) {
                return false;
            } else {
                numElem = x.length;
            }
        }
        return true;
    }



    /**
     * 
     * @param {*} n Size of identity matrix
     * @returns n x n identity matrix
     */
    eye(n) {
        return Array(n).fill(0).map((_, i) => Array(n).fill(0).map((_, j) => i == j ? 1 : 0));
    }


    /**
     * 
     * @param {*} X a square matrix
     * @returns inverse of the matrix calculated using Gauss Elimination method
     */
    inv(M) {
        // check if M is a square matrix
        if (M.dim[0] != M.dim[1]) throwError("The matrix is non-invertible!");;
        
        // create temporary variables
        let X = structuredClone(M),
            I = this.eye(X.length);

        // perform row operations
        for (let i = 0; i < X.length; i++) {
            let x_ii = X[i][i];

            // swap rows if diagonal element is 0
            if (x_ii == 0) {
                for (let j = i + 1; j < X.length; j++) {
                    x_ii = X[j][i];
                    if (x_ii != 0) {
                        let tempA = X[i],
                            tempI = I[i];
                        X[i] = X[j];
                        I[i] = I[j];
                        X[j] = tempA;
                        I[j] = tempI;
                        break;
                    }
                }

                // matrix non-invertible if no other row had non-zero diagonal element
                if (x_ii == 0) throwError("The matrix is non-invertible!");
            }

            // scale diagonal element of i'th row equal to 1
            for (let j = 0; j < X.length; j++) {
                X[i][j] /= x_ii;
                I[i][j] /= x_ii;
            }

            // eliminate off-diagonal elements
            for (let j = 0; j < X.length; j++) {
                if (j == i) continue;

                let x_ji = X[j][i];

                for (let k = 0; k < X.length; k++) {
                    I[j][k] -= I[i][k] * x_ji;
                    X[j][k] -= X[i][k] * x_ji;
                }
            }
        }
        return (I);
    }

}

module.exports = Matrix;