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

        // get rows
        for (let [i, row] of this.val.entries()) {
            // get columns
            for (let [j, col] of row.entries()) {
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
}

module.exports = Matrix;